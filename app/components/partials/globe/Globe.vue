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
					class="globe__status"
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

