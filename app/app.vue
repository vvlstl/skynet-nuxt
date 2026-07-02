<template>
	<div class="page">
		<Header/>
		<NuxtPage/>
		<Footer/>
		<DevFontSwitcher/>
	</div>
</template>
<script setup lang="ts">
	import Footer from "~/components/layout/Footer.vue";
	import Header from "~/components/layout/Header.vue";
	import DevFontSwitcher from "~/components/dev/FontSwitcher.vue";
</script>