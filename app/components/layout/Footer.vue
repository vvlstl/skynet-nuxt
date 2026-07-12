<template>
	<footer class="footer">
		<div class="content-container">
			<div class="footer__content">
				<div class="footer__right">
					{{ t('footer.rights', {year: currentYear}) }}
				</div>
				<div class="footer__left">
					<CyberLink
						class="footer__link"
						:label="t('footer.link.privacy')"
						theme="grey"
					/>
					<CyberLink
						class="footer__link"
						:label="t('footer.link.agreement')"
						theme="grey"
					/>
				</div>
			</div>
		</div>
	</footer>
</template>

<script setup lang="ts">
	import CyberLink from "~/components/ui/CyberLink.vue";

	const {t} = useI18n()

	const currentYear: number = new Date().getFullYear();
</script>
