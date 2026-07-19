<template>
	<component
		:is="isLink ? 'a' : 'button' "
		class="btn"
		:class="{
			[`btn--${theme}`]: theme,
			[`btn--${size}`]: size,
			'btn--bordered': isBordered,
		}"
	>
		<slot name="iconLeft"></slot>
		<span class="btn__line">
			<span></span>
		</span>
		<span
			class="btn__line-2"
			v-if="!isBordered"
		>
			<span></span>
		</span>
		<span class="btn__text" v-html="text"/>
		<slot name="iconRight"></slot>
	</component>
</template>
<script setup lang="ts">

	type TComponentProps = {
		text: string;
		isLink?: boolean;
		theme?: string;
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		isBordered?: boolean;
	};

	defineProps<TComponentProps>();
</script>