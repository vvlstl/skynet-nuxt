<template>
	<div class="burger-menu">
		<nav class="burger-menu__nav">
			<CyberBtn
				class="burger-menu__btn"
				v-for="(item, index) in menu"
				:isLink="true"
				:href="item.url"
				:key="index"
				:label="item.text"
				theme="grey"
				@click.prevent="onClick(item.url)"
			>
			</CyberBtn>
			<CyberBtn
				class="burger-menu__btn"
				theme="grey"
				label="LogIn"
			>
			</CyberBtn>
		</nav>
	</div>
</template>

<script setup lang="ts">

	import type {TLink} from "~/types/TLink";
	import CyberBtn from "~/components/ui/CyberBtn.vue";

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
