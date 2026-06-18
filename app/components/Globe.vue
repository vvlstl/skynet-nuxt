	<template>
		<div
			ref="containerRef"
			class="globe"
			:class="{ 'globe--hidden': !visible }"
		>
			<div
				v-if="!ready"
				class="globe__status"
			>
				{{ statusText }}
			</div>
			<Transition name="globe-fade">
				<div
					v-if="!supported"
					class="globe__fallback"
				>
					<slot name="fallback">
						<span class="globe__fallback-text">3D unavailable</span>
					</slot>
				</div>
			</Transition>
		</div>
	</template>

	<script setup lang="ts">
		import * as THREE from 'three'
		import { useGlobeScene } from '~/composables/useGlobeScene'
		import type { GlobeSceneContext, UseGlobeSceneOptions } from '~/composables/useGlobeScene'

		type TProps = {
			visible?: boolean
			background?: THREE.ColorRepresentation | null
			options?: UseGlobeSceneOptions
		}

		const props = withDefaults(defineProps<TProps>(), {
			visible: true,
			options: () => ({}),
		})

		const LOG_PREFIX = '[DEBUG][Globe]'

		function log(message: string, ...args: unknown[]): void {
			console.log(LOG_PREFIX, message, ...args)
		}

		function logError(message: string, ...args: unknown[]): void {
			console.error(LOG_PREFIX, message, ...args)
		}

		const containerRef = ref<HTMLElement | null>(null)
		const supported = ref(true)
		const ready = ref(false)
		const statusText = ref('ЗАГРУЗКА КАРТЫ...')

		let ctx: GlobeSceneContext | null = null
		let resizeObserver: ResizeObserver | null = null

		function probeWebGL(): boolean {
			try {
				const canvas = document.createElement('canvas')
				return !!(
					window.WebGLRenderingContext
					&& (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
				)
			}
			catch (error) {
				logError('WebGL probe failed', error)
				return false
			}
		}

		onMounted(async () => {
			if (!import.meta.client) {
				log('mount skipped: SSR')
				return
			}

			if (!containerRef.value) {
				logError('mount failed: container missing')
				supported.value = false
				return
			}

			if (!probeWebGL()) {
				log('WebGL not supported: fallback')
				supported.value = false
				return
			}

			ctx = await useGlobeScene(containerRef.value, {
				...props.options,
				background: props.background,
			})

			if (!ctx) {
				supported.value = false
				statusText.value = 'ОШИБКА ИНИЦИАЛИЗАЦИИ'
				return
			}

			ready.value = true
			log('mounted', { cities: props.options?.cities?.length ?? 16 })

			resizeObserver = new ResizeObserver(() => {
				ctx?.resize()
			})
			resizeObserver.observe(containerRef.value)

			ctx.start()
		})

		onBeforeUnmount(() => {
			log('unmount start')
			resizeObserver?.disconnect()
			resizeObserver = null
			ctx?.dispose()
			ctx = null
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
		.globe {
			position: relative;
			width: 100%;
			height: 100%;
			min-height: 320px;
			touch-action: none;

			&--hidden {
				opacity: 0;
				pointer-events: none;
			}

			&__status {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				z-index: 2;
				font-family: monospace;
				color: #ff2200;
				font-size: 13px;
				letter-spacing: 2px;
				opacity: 0.8;
				pointer-events: none;
			}

			&__fallback {
				position: absolute;
				inset: 0;
				z-index: 3;
				display: flex;
				align-items: center;
				justify-content: center;
				background: radial-gradient(circle at center, rgba(255, 34, 0, 0.15), transparent 70%);
			}

			&__fallback-text {
				color: #ff2200;
				font-family: monospace;
				font-size: 0.875rem;
				letter-spacing: 0.05em;
				text-transform: uppercase;
			}
		}

		.globe-fade-enter-active,
		.globe-fade-leave-active {
			transition: opacity 0.4s ease;
		}

		.globe-fade-enter-from,
		.globe-fade-leave-to {
			opacity: 0;
		}
	</style>
