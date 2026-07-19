<template>
	<div class="label">
		<div v-if="icon" class="label__icon">
			<Icon :name="icon"/>
		</div>
		<div class="label__value" v-html="value"/>
	</div>
</template>

<script setup lang="ts">
	type TComponentProps = {
		icon?: string;
		value: string;
	};

	defineProps<TComponentProps>();
</script>