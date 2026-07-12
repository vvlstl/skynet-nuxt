<template>
	<div class="page">
		<Header/>
		<NuxtPage/>
		<Footer/>
	</div>
</template>
<script setup lang="ts">
	import Header from "~/components/layout/Header.vue";
	import Footer from "~/components/layout/Footer.vue";

	const { t, locale, locales } = useI18n()
	const i18nHead = useLocaleHead({ seo: true })

	const htmlLang = computed(() => {
		if (i18nHead.value.htmlAttrs?.lang) return i18nHead.value.htmlAttrs.lang
		const match = locales.value.find(l => l.code === locale.value)
		return match?.language ?? locale.value
	})

	const headData = computed(() => ({
		htmlAttrs: {
			lang: htmlLang.value,
			dir: i18nHead.value.htmlAttrs?.dir
		},
		title: t('meta.title'),
		link: [...(i18nHead.value.link ?? [])],
		meta: [...(i18nHead.value.meta ?? [])]
	}))

	useHead(headData)
</script>