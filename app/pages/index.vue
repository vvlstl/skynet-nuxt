<template>
	<PromoBlock/>
	<Devices class="page__section"/>
	<NetworkSection/>
	<PricingSection
		id="pricing"
		:plans="pricingPlans"
		class="page__section"
	/>
	<HowItWorks
		id="how-it-works"
		class="page__section"
	/>
</template>

<script setup lang="ts">
	import {onMounted} from 'vue'
	import {gsap} from 'gsap'
	import {ScrollTrigger} from 'gsap/ScrollTrigger'
	import PromoBlock from "~/components/sections/promo-block/PromoBlock.vue";
	import NetworkSection from "~/components/sections/NetworkSection.vue";
	import PricingSection from "~/components/sections/pricing/PricingSection.vue";
	import Devices from "~/components/sections/devices/Devices.vue";
	import HowItWorks from "~/components/sections/how-it-works/HowItWorks.vue";

	gsap.registerPlugin(ScrollTrigger)

	const pricingPlans = [
		{id: '1m', name: 'ACCESS // 1 MONTH', price: '199 ₽', period: 'месяц', cta: 'CONNECT'},
		{id: '3m', name: 'ACCESS // 3 MONTHS', price: '499 ₽', period: 'месяц', cta: 'CONNECT', highlight: true},
		{id: '12m', name: 'ACCESS // 12 MONTHS', price: '1490 ₽', period: 'месяц', cta: 'CONNECT', bestValue: true}
	]

	onMounted(() => {
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

		gsap.from('.footer-logo', {
			scrollTrigger: {
				trigger: '.footer',
				start: 'top 80%'
			},
			duration: 1,
			y: 30,
			opacity: 0,
			ease: 'power3.out'
		})
	})
</script>