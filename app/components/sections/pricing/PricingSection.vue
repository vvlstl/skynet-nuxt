<template>
	<section class="pricing">
		<div class="content-container">
			<div class="pricing__content">
				<SectionHead :title="t('pricing.title')"/>
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

<script setup lang="ts">
	import {computed} from 'vue'
	import type {TPricingCard} from "~/types/pricing/TPricingCard";
	import PricingCard from "~/components/sections/pricing/PricingCard.vue";
	import SectionHead from "~/components/common/SectionHead.vue";

	const {t} = useI18n()
	const items = computed((): TPricingCard[] => {
		const list = [
			t('pricing.list.speed'),
			t('pricing.list.servers'),
			t('pricing.list.restrictions'),
			t('pricing.list.support'),
		]
		return [
			{
				title: t('pricing.card.week.title'),
				price: 100,
				list,
			},
			{
				title: t('pricing.card.month.title'),
				price: 300,
				list,
				isPopular: true,
			},
			{
				title: t('pricing.card.quarter.title'),
				price: 800,
				list,
			}
		];
	});
</script>