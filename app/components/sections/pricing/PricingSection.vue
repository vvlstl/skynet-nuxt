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
		return [
			{
				codename: 'TEST DRIVE',
				title: t('pricing.card.week.title'),
				price: t('pricing.card.week.price'),
				list: [
					t('pricing.card.week.list.test'),
					t('pricing.card.week.list.access'),
					t('pricing.card.week.list.instant'),
				],
			},
			{
				codename: 'CYBER CITIZEN',
				title: t('pricing.card.month.title'),
				price: t('pricing.card.month.price'),
				list: [
					t('pricing.card.month.list.priority'),
					t('pricing.card.month.list.encryption'),
					t('pricing.card.month.list.nolog'),
					t('pricing.card.month.list.dpi'),
				],
				isPopular: true,
			},
			{
				codename: 'NET RUNNER',
				title: t('pricing.card.quarter.title'),
				price: t('pricing.card.quarter.price'),
				list: [
					t('pricing.card.quarter.list.max'),
					t('pricing.card.quarter.list.autonomy'),
					t('pricing.card.quarter.list.savings'),
					t('pricing.card.quarter.list.support'),
				],
			}
		];
	});
</script>
