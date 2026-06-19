	import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
	import { mountSuspended } from '@nuxt/test-utils/runtime'
	import type { GlobeSceneContext } from '~/composables/useGlobeScene'

	type AnyFn = (...args: unknown[]) => unknown

	const disposeSpy = vi.fn()
	const resizeSpy = vi.fn()
	const startSpy = vi.fn()
	const stopSpy = vi.fn()

	const mockScene = {
		add: vi.fn(),
		background: null,
		traverse: vi.fn(),
	}

	const mockCamera = {
		position: { z: 3.2 },
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
		dispose: vi.fn(),
		domElement: mockDomElement,
	}

	const mockTexture = { dispose: vi.fn(), needsUpdate: false }
	const mockRoot = { rotation: { x: 0, y: 0, z: 0 } }

	function buildMockContext(): GlobeSceneContext {
		return {
			scene: mockScene as unknown as GlobeSceneContext['scene'],
			camera: mockCamera as unknown as GlobeSceneContext['camera'],
			renderer: mockRenderer as unknown as GlobeSceneContext['renderer'],
			root: mockRoot as unknown as GlobeSceneContext['root'],
			texture: mockTexture as unknown as GlobeSceneContext['texture'],
			dispose: disposeSpy,
			resize: resizeSpy,
			start: startSpy,
			stop: stopSpy,
		}
	}

	vi.mock('~/composables/useGlobeScene', () => ({
		useGlobeScene: vi.fn(async () => buildMockContext()),
	}))

	vi.mock('three', async () => {
		const actual = await vi.importActual<typeof import('three')>('three')
		return {
			...actual,
			WebGLRenderer: vi.fn(),
		}
	})

	const Globe = (await import('~/components/partials/globe/Globe.vue')).default

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

	describe('Globe.vue', () => {
		let restoreRO: () => void
		let restoreWebGL: () => void
		const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
		const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

		beforeEach(() => {
			disposeSpy.mockClear()
			resizeSpy.mockClear()
			startSpy.mockClear()
			stopSpy.mockClear()
			installRAFMock()
			restoreRO = installResizeObserverMock()
			restoreWebGL = installWebGLProbeMock()
		})

		afterEach(() => {
			restoreRO()
			restoreWebGL()
			errorSpy.mockClear()
			logSpy.mockClear()
		})

		it('renders root element with BEM class globe', async () => {
			const wrapper = await mountSuspended(Globe, { props: { visible: true } })
			expect(wrapper.classes()).toContain('globe')
		})

		it('renders title overlay slot default', async () => {
			const wrapper = await mountSuspended(Globe, { props: { visible: true } })
			expect(wrapper.text()).toContain('ГЛОБУС СЕТИ')
		})

		it('renders legend items by default', async () => {
			const wrapper = await mountSuspended(Globe, { props: { visible: true } })
			const html = wrapper.html()
			expect(html).toContain('ONLINE')
			expect(html).toContain('NODES')
			expect(html).toContain('PROTOCOL')
		})

		it('initializes globe context and starts animation on mount', async () => {
			await mountSuspended(Globe, { props: { visible: true } })
			await new Promise(resolve => setTimeout(resolve, 0))

			expect(logSpy.mock.calls.some(call => String(call[1]).includes('mounted'))).toBe(true)
			expect(startSpy).toHaveBeenCalled()
		})

		it('disposes context and stops animation on unmount', async () => {
			const wrapper = await mountSuspended(Globe, { props: { visible: true } })
			await new Promise(resolve => setTimeout(resolve, 0))
			await wrapper.vm.$nextTick()

			wrapper.unmount()
			await wrapper.vm.$nextTick()

			expect(disposeSpy).toHaveBeenCalled()
			expect(logSpy.mock.calls.some(call => String(call[1]).includes('unmount'))).toBe(true)
		})
	})
