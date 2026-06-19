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
			<Transition name="fade">
				<div
					v-if="!supported"
					class="globe__fallback"
				>
					<slot name="fallback"></slot>
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

		const containerRef = ref<HTMLElement | null>(null)
		const supported = ref(true)
		const ready = ref(false)
		const statusText = ref('LOADING THE WEB GLOBE...')

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
				return false
			}
		}

		onMounted(async () => {
			if (!import.meta.client) {
				return
			}

			if (!containerRef.value) {
				supported.value = false
				return
			}

			if (!probeWebGL()) {
				supported.value = false
				return
			}

			ctx = await useGlobeScene(containerRef.value, {
				...props.options,
				background: props.background,
			})

			if (!ctx) {
				supported.value = false
				statusText.value = 'INITIALIZATION ERROR'
				return
			}else {
				//сдвигаем глобус в парво
				ctx.root.position.x = 1
			}

			ready.value = true

			resizeObserver = new ResizeObserver(() => {
				ctx?.resize()
			})
			resizeObserver.observe(containerRef.value)

			ctx.start()
		})

		onBeforeUnmount(() => {
			resizeObserver?.disconnect()
			resizeObserver = null
			ctx?.dispose()
			ctx = null
		})
	</script>

	<style lang="less" scoped>
	//TODO унести в less
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

	</style>
