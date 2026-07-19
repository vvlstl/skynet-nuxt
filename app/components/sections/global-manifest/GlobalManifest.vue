<template>
	<section class="global-manifest">
		<div class="content-container">
			<div class="global-manifest__content">
				<h2 class="global-manifest__title" v-html="t('manifest.title')"/>
				<p class="global-manifest__text" v-html="t('manifest.text')"/>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	const {t} = useI18n()
</script>
