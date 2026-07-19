<template>
	<component
		:is="isLink ? 'a' : 'button' "
		class="btn btn--outline"
		:class="{
			[`btn--${theme}`]: theme,
			[`btn--${size}`]: size,
		}"
		@mouseenter="handleMouseEnter"
		@mouseleave="handleMouseLeave"
	>
		<slot name="iconLeft"></slot>
		<span class="btn__text" :data-label="label" v-html="text"/>
		<slot name="iconRight"></slot>
		<span class="btn__corner"></span>
	</component>
</template>

<script setup lang="ts">
	const {toRef} = useNuxtApp().vue || {toRef: (props: any, key: string) => computed(() => props[key])};
	const props = defineProps<{
		label: string;
		isLink?: boolean;
		theme?: string;
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	}>();

	const {text, handleMouseEnter, handleMouseLeave} = useScrambleText(toRef(props, 'label'));
</script>
