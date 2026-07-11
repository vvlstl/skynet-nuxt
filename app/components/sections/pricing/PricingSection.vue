<script setup lang="ts">
	import {computed} from 'vue'
	import type {TPricingCard} from "~/types/pricing/TPricingCard";
	import PricingCard from "~/components/sections/pricing/PricingCard.vue";
	import SectionHead from "~/components/common/SectionHead.vue";

	const items = computed((): TPricingCard[] => {
		return [
			{
				title: 'ACCESS // 1 WEEK',
				price: 100,
				list: [
					'High speed',
					'127+ servers',
					'No restrictions',
					'24/7 support',
				],
			},
			{
				title: 'ACCESS // 1 MONTH',
				price: 300,
				list: [
					'High speed',
					'127+ servers',
					'No restrictions',
					'24/7 support',
				],
				isPopular: true,
			},
			{
				title: 'ACCESS // 3 MONTH',
				price: 800,
				list: [
					'High speed',
					'127+ servers',
					'No restrictions',
					'24/7 support',
				],
			}
		];
	});
</script>

<template>
	<section class="pricing">
		<div class="content-container">
			<div class="pricing__content">
				<SectionHead title="PRICING"/>
				<div class="pricing__list custom-scrollbar custom-scrollbar--hidden">
					<PricingCard
						class="pricing__item"
						v-for="(item, index) in items"
						:key="index"
						:item="item"
					/>
				</div>
			</div>
		</div>
	</section>
</template>