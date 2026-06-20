<template>
	<div
		class="anchors-link"
		:class="`anchors-link--${stateContainer}`"
		ref="scrollContainer"
	>
<!--		<a-->
<!--			v-for="(item, index) in anchors"-->
<!--			:key="index"-->
<!--			class="anchors-link__item link"-->
<!--			:class="{-->
<!--                'link&#45;&#45;current': currentIndex === index,-->
<!--                [`link&#45;&#45;${themeLink}`]: themeLink,-->
<!--                [`${blockName}__anchors-link-item`]: blockName-->
<!--            }"-->
<!--			:href="item.hash"-->
<!--			v-html="item.name"-->
<!--			@click.prevent.stop="handleClick(item)"-->
<!--			ref="menuItems"-->
<!--		/>-->
		<a
			v-for="(item, index) in items"
			:key="index"
			class="anchors-link__item link"
			v-html="item.text"
			ref="menuItems"
		/>
	</div>
</template>

<script setup lang="ts">
	import {computed, onBeforeUnmount, onMounted, ref} from 'vue';
	import type {TLink} from "~/types/TLink";

	type TAnchor = {
		hash: string;
		name: string;
		el: HTMLElement;
		isCurrent: boolean;
	};

	type TComponentProps = {
		items: TLink[];
		themeLink?: string;
		blockName?: string;
		stateContainer?: 'row' | 'col';
	};

	const props = withDefaults(defineProps<TComponentProps>(), {
		stateContainer: () => 'row',
	});

	const anchors = ref<TAnchor[]>([]);
	const currentIndex = computed(() => anchors.value.findIndex((a: TAnchor) => a.isCurrent));

	function onScroll() {
		if (!anchors.value.length) return;

		const halfScreen = window.innerHeight / 2;

		anchors.value.forEach((a: TAnchor) => {
			const rect = a.el.getBoundingClientRect();
			a.isCurrent = rect.top <= halfScreen && rect.bottom >= halfScreen;
		});
	}

	async function handleClick(item: TAnchor) {
		const hash = item.hash;
		if (!hash.startsWith('#')) return;

		const el = anchors.value.find(a => a.hash === hash)?.el;
		if (!el) return;

		el.scrollIntoView({behavior: 'smooth'});
		history.pushState({}, '', hash);
	}

	onMounted(() => {
		const list: TAnchor[] = [];

		props.items.forEach((item) => {
			if (!item.url.startsWith('#')) return;
			const el = document.querySelector(item.url) as HTMLElement | null;
			if (!el) return;
			list.push({
				hash: item.url,
				name: item.text,
				el,
				isCurrent: false,
			});
		});

		anchors.value = list;
		onScroll();

		window.addEventListener('scroll', onScroll, {passive: true});
	});

	onBeforeUnmount(() => {
		window.removeEventListener('scroll', onScroll);
	});
</script>
