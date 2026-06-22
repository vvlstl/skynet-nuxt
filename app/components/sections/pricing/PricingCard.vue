<template>
	<div class="pricing-card">
		<div class="pricing-card__title">{{ item.title }}</div>
		<div class="pricing-card__price">{{ item.price }}</div>
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
			theme="white"
			:isBordered="true"
		/>
	</div>
</template>

<script setup lang="ts">

	import Btn from "~/components/ui/Btn.vue";
	import type {TPricingCard} from "~/types/pricing/TPricingCard";

	type TComponentProps = {
		item: TPricingCard;
	};

	defineProps<TComponentProps>();
</script>