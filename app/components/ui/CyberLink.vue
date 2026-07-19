<template>
	<a
		class="link"
		:class="{
			[`link--${theme}`]: theme,
		}"
		@mouseenter="handleMouseEnter"
		@mouseleave="handleMouseLeave"
	>
		<span class="link__text" :data-label="label" v-html="text"/>
	</a>
</template>

<script setup lang="ts">
	const {toRef} = useNuxtApp().vue || {toRef: (props: any, key: string) => computed(() => props[key])};
	const props = defineProps<{
		label: string;
		theme?: string;
	}>();

	const {text, handleMouseEnter, handleMouseLeave} = useScrambleText(toRef(props, 'label'));
</script>
