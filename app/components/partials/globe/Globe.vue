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
	import {useGlobeScene} from '~/composables/useGlobeScene'
	import {useResizeObserver} from '~/composables/useResizeObserver' // путь поправьте под свой проект
	import type {GlobeSceneContext, UseGlobeSceneOptions} from '~/composables/useGlobeScene'

	type TComponentProps = {
		visible?: boolean
		background?: THREE.ColorRepresentation | null
		options?: UseGlobeSceneOptions
	}

	const props = withDefaults(defineProps<TComponentProps>(), {
		visible: true,
		options: () => ({}),
	})

	const containerRef = useTemplateRef<HTMLElement>('containerRef')
	const supported = ref(true)
	const ready = ref(false)
	const statusText = ref('LOADING THE WEB GLOBE...')
	const {isMobile} = useLayoutSize();
	const ctxRootPositionX = computed(() => isMobile.value ? 1 : 1.5)

	let ctx: GlobeSceneContext | null = null
	let resizeObserver: ResizeObserver | undefined

	function probeWebGL(): boolean {
		try {
			const canvas = document.createElement('canvas')
			return !!(
				window.WebGLRenderingContext
				&& (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
			)
		} catch (error) {
			return false
		}
	}

	function onResize(): void {
		if (ctx) {
			ctx.root.position.x = ctxRootPositionX.value
		}
		ctx?.resize();
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
		} else {
			ctx.root.position.x = ctxRootPositionX.value
		}

		ready.value = true

		resizeObserver = useResizeObserver(
			onResize,
			100,
			false, // callOnInit — на старте ресайз не нужен, ctx только что создан с актуальными размерами
			false, // setUpOnMounted — мы уже внутри onMounted, поэтому false, иначе оно повесится на onMounted ещё раз
		)

		ctx.start()
	})

	onBeforeUnmount(() => {
		resizeObserver?.disconnect()
		resizeObserver = undefined
		ctx?.dispose()
		ctx = null
	})
</script>

