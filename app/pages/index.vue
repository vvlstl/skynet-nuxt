<template>
	<PromoBlock/>
	<Devices class="page__section"/>
	<NetworkSection/>
	<PricingSection
		id="pricing"
		class="page__section"
	/>
	<HowItWorks
		id="how-it-works"
		class="page__section"
	/>
</template>

<script setup lang="ts">
	import {onMounted, defineAsyncComponent} from 'vue'
	import PromoBlock from "~/components/sections/promo-block/PromoBlock.vue";
	import PricingSection from "~/components/sections/pricing/PricingSection.vue";
	import Devices from "~/components/sections/devices/Devices.vue";
	import HowItWorks from "~/components/sections/how-it-works/HowItWorks.vue";

	const NetworkSection = defineAsyncComponent(() => import('~/components/sections/NetworkSection.vue'))

	onMounted(async () => {
		const {gsap} = await import('gsap')
		const {ScrollTrigger} = await import('gsap/ScrollTrigger')
		gsap.registerPlugin(ScrollTrigger)

		gsap.from('.network', {
			scrollTrigger: {
				trigger: '.network',
				start: 'top 80%'
			},
			duration: 1,
			scale: 0.8,
			opacity: 0,
			ease: 'power3.out'
		})

		gsap.from('.pricing', {
			scrollTrigger: {
				trigger: '.pricing',
				start: 'top 80%'
			},
			duration: 1,
			y: 50,
			opacity: 0,
			ease: 'power3.out'
		})

		gsap.from('.how-it-works', {
			scrollTrigger: {
				trigger: '.how-it-works',
				start: 'top 80%'
			},
			duration: 1,
			y: 50,
			opacity: 0,
			ease: 'power3.out'
		})
	})
</script>