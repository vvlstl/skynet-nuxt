<template>
	<div
		class="price"
		:class="{'price--old': isOld}"
		v-html="formatted"
	></div>
</template>

<script setup lang="ts">
	import { computed } from 'vue';

	const props = defineProps<{
		value: number;
		isOld?: boolean;
	}>();

	const { locale } = useI18n()

	const currencyMap: Record<string, { currency: string; locale: string }> = {
		ru: { currency: 'RUB', locale: 'ru-RU' },
		en: { currency: 'USD', locale: 'en-US' },
	}

	const formatted = computed<string>(() => formatPrice(props.value));

	function formatPrice(value: any): string {
		if (value == null) return '';

		const { currency, locale: intlLocale } = currencyMap[locale.value] ?? currencyMap.ru
		const digits = value % 1 === 0 ? 0 : 2;

		return new Intl.NumberFormat(intlLocale, {
			style: 'currency',
			currency,
			minimumFractionDigits: digits,
			maximumFractionDigits: digits,
		}).format(value);
	}
</script>
