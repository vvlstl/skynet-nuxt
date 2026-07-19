<template>
	<div class="section-head">
		<span class="section-head__line"></span>
		<div class="section-head__container">
			<h2
				class="section-head__title glitch"
				v-html="title"
				:data-text="title"
			/>
			<sub v-if="subtitle" class="section-head__title-sub">
				<span class="section-head__sub-box">■</span>
				<span v-html="subtitle"/>
				<span class="section-head__sub-box">■</span>
			</sub>
		</div>
		<span class="section-head__line section-head__line--is-right"></span>
	</div>
</template>

<script setup lang="ts">
	type TComponentProps = {
		title?: string;
		subtitle?: string;
	};

	defineProps<TComponentProps>();
</script>