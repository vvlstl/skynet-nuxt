<script setup lang="ts">
	import {useI18n} from "~/composables/useI18n";
	import CyberLink from "~/components/ui/CyberLink.vue";
	import Btn from "~/components/ui/Btn.vue";

	const {t} = useI18n()

	const currentYear: number = new Date().getFullYear();
</script>

<template>
	<footer class="footer">
		<div class="content-container">
			<div class="footer__content">
				<div class="footer__right">
					{{ t('footer.copyright', {year: currentYear}) }}
				</div>
				<div class="footer__left">
					<CyberLink
						class="footer__link"
						:label="t('footer.privacy_policy')"
						theme="grey"
					/>
					<CyberLink
						class="footer__link"
						:label="t('footer.user_agreements')"
						theme="grey"
					/>
				</div>
			</div>
		</div>
	</footer>
</template>