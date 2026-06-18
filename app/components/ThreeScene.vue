<template>
	<div
		ref="containerRef"
		class="three-scene"
		:class="{ 'three-scene--hidden': !visible }"
		@mousemove="onMouseMove"
		@mouseleave="onMouseLeave"
	>
		<Transition name="three-scene-fade">
			<div
				v-if="!supported"
				class="three-scene__fallback"
			>
				<slot name="fallback">
					<span class="three-scene__fallback-text">3D unavailable</span>
				</slot>
			</div>
		</Transition>
	</div>
</template>

<script setup lang="ts">
	import * as THREE from 'three'
	import { useThreeScene } from '~/composables/useThreeScene'
	import type { ThreeSceneContext } from '~/composables/useThreeScene'

	type TProps = {
		visible?: boolean
		autoRotate?: boolean
		background?: THREE.ColorRepresentation | null
	}

	const props = withDefaults(defineProps<TProps>(), {
		visible: true,
		autoRotate: true,
		background: null,
	})

	const LOG_PREFIX = '[DEBUG][ThreeScene]'

	function log(message: string, ...args: unknown[]): void {
		console.log(LOG_PREFIX, message, ...args)
	}

	function logError(message: string, ...args: unknown[]): void {
		console.error(LOG_PREFIX, message, ...args)
	}

	const containerRef = ref<HTMLElement | null>(null)
	const supported = ref(true)

	let ctx: ThreeSceneContext | null = null
	let mesh: THREE.Mesh | null = null
	let frameId = 0
	let resizeObserver: ResizeObserver | null = null

	const targetRotation = { x: 0, y: 0 }
	const currentRotation = { x: 0, y: 0 }

	function onMouseMove(event: MouseEvent): void {
		if (!containerRef.value) {
			return
		}
		const rect = containerRef.value.getBoundingClientRect()
		const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1
		const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1
		targetRotation.y = nx * 0.6
		targetRotation.x = ny * 0.4
		log('mousemove', { nx, ny })
	}

	function onMouseLeave(): void {
		targetRotation.x = 0
		targetRotation.y = 0
		log('mouseleave: rotation reset')
	}

	function buildGlobeMesh(): THREE.Mesh {
		const geometry = new THREE.SphereGeometry(1.4, 48, 32)
		const material = new THREE.MeshBasicMaterial({
			color: 0x4aa3ff,
			wireframe: true,
			transparent: true,
			opacity: 0.7,
		})
		return new THREE.Mesh(geometry, material)
	}

	function animate(): void {
		frameId = requestAnimationFrame(animate)
		if (!ctx || !mesh) {
			return
		}

		currentRotation.x += (targetRotation.x - currentRotation.x) * 0.08
		currentRotation.y += (targetRotation.y - currentRotation.y) * 0.08

		mesh.rotation.x = currentRotation.x
		mesh.rotation.y = currentRotation.y + (props.autoRotate ? performance.now() * 0.0002 : 0)

		ctx.renderer.render(ctx.scene, ctx.camera)
	}

	onMounted(() => {
		if (!import.meta.client) {
			log('mount skipped: SSR')
			return
		}

		if (!containerRef.value) {
			logError('mount failed: container missing')
			supported.value = false
			return
		}

		const supportsWebGL = (() => {
			try {
				const canvas = document.createElement('canvas')
				return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')))
			}
			catch (error) {
				logError('WebGL probe failed', error)
				return false
			}
		})()

		if (!supportsWebGL) {
			log('WebGL not supported: fallback')
			supported.value = false
			return
		}

		ctx = useThreeScene(containerRef.value, {
			background: props.background,
			cameraZ: 4,
		})

		if (!ctx) {
			supported.value = false
			return
		}

		mesh = buildGlobeMesh()
		ctx.scene.add(mesh)
		log('mesh added', { vertices: (mesh.geometry as THREE.BufferGeometry).attributes.position.count })

		resizeObserver = new ResizeObserver(() => {
			ctx?.resize()
		})
		resizeObserver.observe(containerRef.value)

		animate()
		log('mounted: animation started')
	})

	onBeforeUnmount(() => {
		log('unmount start')
		if (frameId) {
			cancelAnimationFrame(frameId)
			frameId = 0
		}
		resizeObserver?.disconnect()
		resizeObserver = null
		ctx?.dispose()
		ctx = null
		mesh = null
		log('unmount done')
	})

	watch(
		() => props.visible,
		(value) => {
			log('visible changed', { value })
		},
	)
</script>

<style lang="less" scoped>
//TODO разнести по less
	.three-scene {
		position: relative;
		width: 100%;
		height: 100%;
		min-height: 320px;
		overflow: hidden;

		&--hidden {
			opacity: 0;
			pointer-events: none;
		}

		&__fallback {
			position: absolute;
			inset: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			background: radial-gradient(circle at center, rgba(74, 163, 255, 0.15), transparent 70%);
		}

		&__fallback-text {
			color: #4aa3ff;
			font-family: monospace;
			font-size: 0.875rem;
			letter-spacing: 0.05em;
			text-transform: uppercase;
		}
	}

	.three-scene-fade-enter-active,
	.three-scene-fade-leave-active {
		transition: opacity 0.4s ease;
	}

	.three-scene-fade-enter-from,
	.three-scene-fade-leave-to {
		opacity: 0;
	}
</style>
