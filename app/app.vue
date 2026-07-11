<template>
	<div class="page">
		<Header/>
		<NuxtPage/>
		<Footer/>
		<DevLanguageSwitcher/>
	</div>
</template>
<script setup lang="ts">
	import Footer from "~/components/layout/Footer.vue";
	import Header from "~/components/layout/Header.vue";
	import DevLanguageSwitcher from "~/components/dev/LanguageSwitcher.vue";
</script>