<template>
	<PromoBlock/>
	<Features :features="features"/>
	<NetworkSection/>
	<PricingSection
		:plans="pricingPlans"
		@connect="onConnect"
	/>
	<TelegramSection/>
	<Footer/>
</template>

<script setup lang="ts">
	import {ref, onMounted} from 'vue'
	import {gsap} from 'gsap'
	import {ScrollTrigger} from 'gsap/ScrollTrigger'

	gsap.registerPlugin(ScrollTrigger)

	const features = [
		{icon: '📡', title: 'Глобальная сеть', description: '127 серверов по всему миру'},
		{icon: '⚡', title: 'Максимальная скорость', description: 'До 10 Гбит/с без ограничений трафика'},
		{icon: '🔒', title: 'Полная приватность', description: 'Не храним логи, шифрование military-grade'},
		{icon: '🤖', title: 'Telegram управление', description: 'Покупка и продление за 30 секунд'}
	]

	const pricingPlans = [
		{id: '1m', name: 'ACCESS // 1 MONTH', price: '199 ₽', period: 'месяц', cta: 'CONNECT'},
		{id: '3m', name: 'ACCESS // 3 MONTHS', price: '499 ₽', period: 'месяц', cta: 'CONNECT', highlight: true},
		{id: '12m', name: 'ACCESS // 12 MONTHS', price: '1490 ₽', period: 'месяц', cta: 'CONNECT', bestValue: true}
	]

	const onConnect = (plan: any) => {
		console.log('Selected plan:', plan)
		alert(`Selected ${plan.name} for ${plan.price}`)
	}

	onMounted(() => {
		gsap.from('.hero__title', {
			duration: 1,
			y: 50,
			opacity: 0,
			ease: 'power4.out'
		})

		gsap.from('.hero__subtitle', {
			duration: 1,
			y: 30,
			opacity: 0,
			delay: 0.3,
			ease: 'power4.out'
		})

		gsap.from('.hero__buttons', {
			duration: 0.8,
			y: 20,
			opacity: 0,
			delay: 0.6,
			ease: 'power4.out'
		})

		const featureCards = document.querySelectorAll('.features__card')
		featureCards.forEach((card, index) => {
			gsap.from(card, {
				scrollTrigger: {
					trigger: '.features',
					start: 'top 80%'
				},
				duration: 0.8,
				y: 50,
				opacity: 0,
				delay: index * 0.1,
				ease: 'power3.out'
			})
		})

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

		gsap.from('.telegram', {
			scrollTrigger: {
				trigger: '.telegram',
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