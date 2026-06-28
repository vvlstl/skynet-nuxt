<template>
	<div class="section-head">
		<span class="section-head__line"></span>
		<h2 class="section-head__title">
			<slot>{{ title }}</slot>
		</h2>
		<span class="section-head__line section-head__line--is-right"></span>
	</div>
</template>

<script setup lang="ts">
	type TComponentProps = {
		title?: string;
	};

	defineProps<TComponentProps>();
</script>