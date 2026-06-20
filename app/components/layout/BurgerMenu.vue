<template>
	<div class="burger-menu">
		<nav class="burger-menu__nav">
			<a
				v-for="(item, index) in menu"
				:key="index"
				:href="item.url"
				class="link burger-menu__link"
				@click.prevent="onClick(item.url)"
			>
				{{ item.text }}
			</a>
		</nav>
	</div>
</template>

<script setup lang="ts">

	import type {TLink} from "~/types/TLink";

	type TComponentProps = {
		menu: TLink[];
	};

	defineProps<TComponentProps>();

	const emit = defineEmits<{
		close: [];
	}>();

	function onClick(url: string) {
		emit('close');
		const el = document.querySelector(url);
		if (el) {
			el.scrollIntoView({behavior: 'smooth'});
		}
	}
</script>
