<template>
	<div
		class="pricing-card"
		:class="{'pricing-card--popular': item.isPopular}"
	>
		<Label
			v-if="item.isPopular"
			class="pricing-card__label"
			:value="t('pricing.label.popular')"
			icon="hugeicons:star"
		/>

		<div class="pricing-card__wrap">
			<div
				v-if="item.codename"
				class="pricing-card__codename"
				v-html="item.codename"
			/>
			<div class="pricing-card__title" v-html="item.title"/>
			<Price :value="item.price" class="pricing-card__price"/>
			<div class="pricing-card__info">
				<ul>
					<li
						v-for="(infoItem, index) in item.list"
						:key="index"
						v-html="infoItem"
					/>
				</ul>
			</div>
			<Btn
				class="pricing-card__btn"
				:text="t('pricing.btn.connect')"
				:theme="!item.isPopular ? 'white' : undefined"
				:isBordered="true"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">

	import Btn from "~/components/ui/Btn.vue";
	import type {TPricingCard} from "~/types/pricing/TPricingCard";
	import Label from "~/components/ui/Label.vue";
	import Price from "~/components/common/Price.vue";

	const {t} = useI18n()

	type TComponentProps = {
		item: TPricingCard;
	};

	defineProps<TComponentProps>();
</script>