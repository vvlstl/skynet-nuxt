<template>
	<section class="global-manifest">
		<div class="content-container">
			<div class="global-manifest__content">
				<h2 class="global-manifest__title">
					{{ t('manifest.title') }}
				</h2>
				<p class="global-manifest__text">
					{{ t('manifest.text') }}
				</p>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	const {t} = useI18n()
</script>
