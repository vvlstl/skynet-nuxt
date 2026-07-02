<template>
	<div class="page">
		<Header/>
		<NuxtPage/>
		<Footer/>
		<DevFontSwitcher/>
		<DevLanguageSwitcher/>
	</div>
</template>
<script setup lang="ts">
	import Footer from "~/components/layout/Footer.vue";
	import Header from "~/components/layout/Header.vue";
	import DevFontSwitcher from "~/components/dev/FontSwitcher.vue";
	import DevLanguageSwitcher from "~/components/dev/LanguageSwitcher.vue";
</script>