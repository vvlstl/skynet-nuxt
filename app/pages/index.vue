<template>
	<PromoBlock/>
	<Devices class="page__section"/>
	<NetworkSection class="page__section"/>
	<DemoAccess
		id="demo-access"
		class="page__section"
	/>
	<PricingSection
		id="pricing"
		class="page__section"
	/>
	<HowItWorks
		id="how-it-works"
		class="page__section"
	/>
	<GlobalManifest
		id="manifest"
		class="page__section"
	/>
</template>

<script setup lang="ts">
	import {onMounted, defineAsyncComponent} from 'vue'
	import PromoBlock from "~/components/sections/promo-block/PromoBlock.vue";

	/** LCP-критичная секция (PromoBlock) импортируется статически.
	 * Остальные секции оборачиваются в defineAsyncComponent —
	 * они уходят в отдельные чанки и не блокируют initial render.
	 */
	const Devices = defineAsyncComponent(() => import('~/components/sections/devices/Devices.vue'))
	const NetworkSection = defineAsyncComponent(() => import('~/components/sections/NetworkSection.vue'))
	const GlobalManifest = defineAsyncComponent(() => import('~/components/sections/global-manifest/GlobalManifest.vue'))
	const DemoAccess = defineAsyncComponent(() => import('~/components/sections/demo-access/DemoAccess.vue'))
	const PricingSection = defineAsyncComponent(() => import('~/components/sections/pricing/PricingSection.vue'))
	const HowItWorks = defineAsyncComponent(() => import('~/components/sections/how-it-works/HowItWorks.vue'))

	onMounted(async () => {
		const {gsap} = await import("gsap")
		const {ScrollTrigger} = await import("gsap/ScrollTrigger")
		gsap.registerPlugin(ScrollTrigger)

		gsap.from(".network", {
			scrollTrigger: {
				trigger: ".network",
				start: "top 80%"
			},
			duration: 1,
			scale: 0.8,
			opacity: 0,
			ease: "power3.out"
		})

		gsap.from(".global-manifest", {
			scrollTrigger: {
				trigger: ".global-manifest",
				start: "top 80%"
			},
			duration: 1,
			y: 30,
			opacity: 0,
			ease: "power3.out"
		})

		gsap.from(".demo-access", {
			scrollTrigger: {
				trigger: ".demo-access",
				start: "top 80%"
			},
			duration: 1,
			y: 50,
			opacity: 0,
			ease: "power3.out"
		})

		gsap.from(".pricing", {
			scrollTrigger: {
				trigger: ".pricing",
				start: "top 80%"
			},
			duration: 1,
			y: 50,
			opacity: 0,
			ease: "power3.out"
		})

		gsap.from(".how-it-works", {
			scrollTrigger: {
				trigger: ".how-it-works",
				start: "top 80%"
			},
			duration: 1,
			y: 50,
			opacity: 0,
			ease: "power3.out"
		})

		/**
		 * Prefetch ниже-fold секций в idle: подгружаем чанки PricingSection
		 * и HowItWorks после того как GSAP анимации зарегистрированы, чтобы
		 * не задерживать TTI. Компромисс: небольшой лишний трафик взамен
		 * на мгновенный рендер при скролле.
		 */
		if (typeof window.requestIdleCallback === "function") {
			window.requestIdleCallback(() => {
				void import("~/components/sections/pricing/PricingSection.vue")
				void import("~/components/sections/how-it-works/HowItWorks.vue")
				void import("~/components/sections/demo-access/DemoAccess.vue")
			}, {timeout: 5000})
		} else {
			window.setTimeout(() => {
				void import("~/components/sections/pricing/PricingSection.vue")
				void import("~/components/sections/how-it-works/HowItWorks.vue")
				void import("~/components/sections/demo-access/DemoAccess.vue")
			}, 1000)
		}
	})
</script>