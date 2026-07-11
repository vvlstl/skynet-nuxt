<template>
	<footer class="footer">
		<div class="content-container">
			<div class="footer__content">
				<div class="footer__right">
					© {{ currentYear }} SKYNET VPN. ALL RIGHTS RESERVED
				</div>
				<div class="footer__left">
					<CyberLink
						class="footer__link"
						label="PRIVACY POLICY"
						theme="grey"
					/>
					<CyberLink
						class="footer__link"
						label="USER AGREEMENTS"
						theme="grey"
					/>
				</div>
			</div>
		</div>
	</footer>
</template>

<script setup lang="ts">
	import CyberLink from "~/components/ui/CyberLink.vue";

	const currentYear: number = new Date().getFullYear();
</script>
