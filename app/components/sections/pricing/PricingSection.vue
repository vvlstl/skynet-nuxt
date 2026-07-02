<script setup lang="ts">
	import {computed} from 'vue'
	import {useI18n} from '~/composables/useI18n'
	import type {TPricingCard} from "~/types/pricing/TPricingCard";
	import PricingCard from "~/components/sections/pricing/PricingCard.vue";
	import SectionHead from "~/components/common/SectionHead.vue";

	const {t} = useI18n()

	const items = computed((): TPricingCard[] => {
		return [
			{
				title: t('pricing.week.title'),
				price: t('pricing.week.price'),
				list: t('pricing.week.features'),
			},
			{
				title: t('pricing.month.title'),
				price: t('pricing.month.price'),
				list: t('pricing.month.features'),
				isPopular: true,
			},
			{
				title: t('pricing.three_months.title'),
				price: t('pricing.three_months.price'),
				list: t('pricing.three_months.features'),
			}
		];
	});
</script>

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