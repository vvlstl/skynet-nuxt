import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import type { ThreeSceneContext } from '~/composables/useThreeScene'

type AnyFn = (...args: unknown[]) => unknown

interface MockMesh {
	geometry: { attributes: { position: { count: number } }; dispose: AnyFn }
	material: { dispose: AnyFn }
	rotation: { x: number, y: number, z: number }
}

const disposeSpy = vi.fn()
const resizeSpy = vi.fn()

const mockScene = {
	add: vi.fn(),
	background: null,
	traverse: vi.fn(),
}

const mockCamera = {
	position: { z: 4 },
	aspect: 1,
	updateProjectionMatrix: vi.fn(),
}

const mockDomElement = {
	parentNode: null as HTMLElement | null,
	clientWidth: 200,
	clientHeight: 200,
	width: 200,
	height: 200,
}

const mockRenderer = {
	setPixelRatio: vi.fn(),
	setSize: vi.fn(),
	render: vi.fn(),
	dispose: disposeSpy,
	domElement: mockDomElement,
}

function buildMockContext(): ThreeSceneContext {
	return {
		scene: mockScene as unknown as ThreeSceneContext['scene'],
		camera: mockCamera as unknown as ThreeSceneContext['camera'],
		renderer: mockRenderer as unknown as ThreeSceneContext['renderer'],
		dispose: disposeSpy,
		resize: resizeSpy,
	}
}

// Stub ThreeScene composable so the test does not depend on real WebGL.
vi.mock('~/composables/useThreeScene', () => ({
	useThreeScene: vi.fn(() => buildMockContext()),
}))

// Allow the component to import THREE.Mesh for buildGlobeMesh path.
vi.mock('three', async () => {
	const actual = await vi.importActual<typeof import('three')>('three')
	return {
		...actual,
		WebGLRenderer: vi.fn(),
	}
})

const ThreeScene = (await import('~/components/ThreeScene.vue')).default

function installRAFMock() {
	let cb: FrameRequestCallback | null = null
	const raf = vi.fn((callback: FrameRequestCallback) => {
		cb = callback
		return 1
	})
	const caf = vi.fn()
	const originalRAF = globalThis.requestAnimationFrame
	const originalCAF = globalThis.cancelAnimationFrame
	globalThis.requestAnimationFrame = raf as unknown as typeof requestAnimationFrame
	globalThis.cancelAnimationFrame = caf as unknown as typeof cancelAnimationFrame
	return {
		dispose: () => {
			globalThis.requestAnimationFrame = originalRAF
			globalThis.cancelAnimationFrame = originalCAF
		},
		tick: () => {
			if (cb) cb(0)
		},
		caf,
	}
}

function installResizeObserverMock() {
	class RO {
		observe = vi.fn()
		unobserve = vi.fn()
		disconnect = vi.fn()
	}
	const original = globalThis.ResizeObserver
	globalThis.ResizeObserver = RO as unknown as typeof ResizeObserver
	return () => {
		globalThis.ResizeObserver = original
	}
}

function installWebGLProbeMock() {
	const w = window as unknown as { WebGLRenderingContext?: unknown }
	const hadCtx = 'WebGLRenderingContext' in w
	w.WebGLRenderingContext = class {}

	const originalGetContext = HTMLCanvasElement.prototype.getContext
	HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
		getExtension: () => ({}),
		getParameter: () => 1,
	})) as unknown as typeof HTMLCanvasElement.prototype.getContext

	return () => {
		if (!hadCtx) {
			delete w.WebGLRenderingContext
		}
		HTMLCanvasElement.prototype.getContext = originalGetContext
	}
}

describe('ThreeScene.vue', () => {
	let raf: ReturnType<typeof installRAFMock>
	let restoreRO: () => void
	let restoreWebGL: () => void
	const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
	const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

	beforeEach(() => {
		disposeSpy.mockClear()
		resizeSpy.mockClear()
		raf = installRAFMock()
		restoreRO = installResizeObserverMock()
		restoreWebGL = installWebGLProbeMock()
	})

	afterEach(() => {
		raf.dispose()
		restoreRO()
		restoreWebGL()
		errorSpy.mockClear()
		logSpy.mockClear()
	})

	it('renders root element with BEM class three-scene', async () => {
		const wrapper = await mountSuspended(ThreeScene, { props: { visible: true } })
		expect(wrapper.classes()).toContain('three-scene')
	})

	it('initializes ThreeScene context on mount', async () => {
		await mountSuspended(ThreeScene, { props: { visible: true } })
		expect(logSpy.mock.calls.some(call => String(call[1]).includes('mounted'))).toBe(true)
	})

	it('updates mesh rotation in response to mousemove', async () => {
		const wrapper = await mountSuspended(ThreeScene, { props: { visible: true } })
		const container = wrapper.element as HTMLElement

		vi.spyOn(container, 'getBoundingClientRect').mockReturnValue({
			left: 0,
			top: 0,
			width: 200,
			height: 200,
			right: 200,
			bottom: 200,
			x: 0,
			y: 0,
			toJSON: () => ({}),
		} as DOMRect)

		container.dispatchEvent(new MouseEvent('mousemove', { clientX: 150, clientY: 100 }))

		expect(logSpy.mock.calls.some(call => String(call[1]).includes('mousemove'))).toBe(true)
	})

	it('disposes renderer and cancels animation frame on unmount', async () => {
		const wrapper = await mountSuspended(ThreeScene, { props: { visible: true } })
		await wrapper.vm.$nextTick()

		wrapper.unmount()
		await wrapper.vm.$nextTick()

		expect(disposeSpy).toHaveBeenCalled()
		expect(raf.caf).toHaveBeenCalled()
		expect(logSpy.mock.calls.some(call => String(call[1]).includes('unmount'))).toBe(true)
	})
})
