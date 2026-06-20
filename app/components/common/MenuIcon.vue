<template>
	<span
		class="menu-icon"
		:class="{ 'menu-icon--cross': isCross }"
	>
		<i></i><i></i><i></i>
	</span>
</template>

<script setup lang="ts">
type TComponentProps = {
	isCross?: boolean,
};

defineProps<TComponentProps>();
</script>
