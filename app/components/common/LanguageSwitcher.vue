<template>
	<Btn
		type="button"
		@click="toggleLanguage"
		:aria-label="`Switch to ${isRU ? 'English' : 'Russian'}`"
		size="md"
		theme="grey"
		:is-bordered="true"
		:text="isRU ? 'EN' : 'RU'"/>
</template>

<script setup lang="ts">
	import {useStorage} from '@vueuse/core'
	import Btn from "~/components/ui/Btn.vue";

	type AppLocale = 'en' | 'ru'

	const {locale, setLocale} = useI18n()
	const preferredLanguage = useStorage<AppLocale>('preferred-language', locale.value as AppLocale)

	const isRU = computed(() => locale.value === 'ru')

	function toggleLanguage() {
		const next = isRU.value ? 'en' : 'ru'
		preferredLanguage.value = next
		setLocale(next)
	}

	// Восстанавливаем при монтировании
	if (import.meta.client) {
		const saved = preferredLanguage.value
		if (saved && saved !== locale.value) {
			setLocale(saved)
		}
	}
</script>
