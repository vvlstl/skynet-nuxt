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
	import {useGlobeScene} from '~/composables/useGlobeScene'
	import {useResizeObserver} from '~/composables/useResizeObserver'
	import type {GlobeSceneContext, UseGlobeSceneOptions} from '~/composables/useGlobeScene'
	import type {ColorRepresentation} from 'three'

	type TComponentProps = {
		visible?: boolean
		lazy?: boolean
		background?: ColorRepresentation | null
		options?: UseGlobeSceneOptions
	}

	const props = withDefaults(defineProps<TComponentProps>(), {
		visible: true,
		lazy: true,
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
	let viewportObserver: IntersectionObserver | undefined

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

	async function initGlobe(): Promise<void> {
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
			false,
			false,
		)

		ctx.start()
	}

	// Откладываем тяжёлую инициализацию Three.js сцены до простоя главного
	// потока — снимает блокировку TBT при попадании Globe в viewport.
	// Fallback на setTimeout для браузеров без requestIdleCallback.
	function scheduleGlobeInit(): void {
		if (typeof window.requestIdleCallback === 'function') {
			window.requestIdleCallback(() => {
				void initGlobe()
			}, {timeout: 2000})
			return
		}

		window.setTimeout(() => {
			void initGlobe()
		}, 0)
	}

	onMounted(() => {
		if (!import.meta.client) {
			return
		}

		if (!props.lazy) {
			initGlobe()
			return
		}

		// Ленивая инициализация: Three.js сцена создаётся только когда элемент
		// попадает в viewport. rootMargin=0px — не предзагружаем Globe заранее,
		// чтобы не блокировать главный поток на above-fold рендере.
		viewportObserver = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting) {
					viewportObserver?.disconnect()
					viewportObserver = undefined
					scheduleGlobeInit()
				}
			},
			{rootMargin: '0px'},
		)

		if (containerRef.value) {
			viewportObserver.observe(containerRef.value)
		}
	})

	onBeforeUnmount(() => {
		viewportObserver?.disconnect()
		viewportObserver = undefined
		resizeObserver?.disconnect()
		resizeObserver = undefined
		ctx?.dispose()
		ctx = null
	})
</script>
