<template>
	<div
		class="pricing-card"
		:class="{'pricing-card--popular': item.isPopular}"
	>
		<Label
			v-if="item.isPopular"
			class="pricing-card__label"
			value="POPULAR"
			icon="hugeicons:star"
		/>

		<div class="pricing-card__wrap">
			<div class="pricing-card__title">{{ item.title }}</div>
			<div class="pricing-card__price">{{ item.price }}$</div>
			<div class="pricing-card__info">
				<ul>
					<li
						v-for="(infoItem, index) in item.list"
						:key="index"
					>
						{{ infoItem }}
					</li>
				</ul>
			</div>
			<Btn
				class="pricing-card__btn"
				text="CONNECT"
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

	type TComponentProps = {
		item: TPricingCard;
	};

	defineProps<TComponentProps>();
</script>