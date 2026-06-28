<template>
	<header
		class="header"
		:class="{
			'header--fixed': isFixed,
			'header--hidden': isHidden,
			'header--open-menu': isMenuOpen,
		}"
		ref="root"
	>
		<div class="header__inner">
			<Logo/>

			<nav class="header__nav">
				<AnchorsLink :items="navLinks"/>
			</nav>

			<div class="header__actions">
				<Btn
					class="header__btn-bot"
					text="LogIn"
					size="md"
					theme="grey"
					:is-bordered="true"
				>
					<template #iconLeft>
						<span class="btn__icon">
							<Icon name="hugeicons:user-account"/>
						</span>
					</template>
				</Btn>

				<button
					class="btn btn--square btn--transparent btn--md header__menu-btn"
					@click.prevent="toggleMenu()"
				>
					<span class="btn__icon">
						<MenuIcon :is-cross="isMenuOpen"/>
					</span>
				</button>
			</div>

		</div>
		<transition name="slide">
			<BurgerMenu
				v-if="isMenuOpen"
				:menu="navLinks"
				@close="closeMenu"
				class="header__menu-burger"
			/>
		</transition>
	</header>
</template>

<script setup lang="ts">
	import {ref, onMounted, onBeforeUnmount} from 'vue'
	import Btn from "~/components/ui/Btn.vue";
	import Logo from "~/components/common/Logo.vue";
	import MenuIcon from "~/components/ui/MenuIcon.vue";
	import BurgerMenu from "~/components/layout/BurgerMenu.vue";
	import AnchorsLink from "~/components/common/AnchorsLink.vue";
	import type {TLink} from "~/types/TLink";
	import {usePageScroll} from "~/composables/usePageScroll";

	const navLinks: TLink[] = [
		{text: 'Advantages', url: '#advantages'},
		{text: 'Pricing', url: '#pricing'},
		{text: 'How it works', url: '#how-it-works'},
		{text: 'FAQ', url: '#faq'},
	];

	const root = useTemplateRef<HTMLElement>('root');
	const isMenuOpen = ref<boolean>(false);
	const isFixed = ref<boolean>(false);
	const isHidden = ref<boolean>(false);
	const isFirstScroll = ref<boolean>(true);
	const scrollTop = ref<number>(0);

	const {scrollY} = usePageScroll();

	function onScroll() {
		if (isFirstScroll.value) {
			isFirstScroll.value = false;
			isFixed.value = scrollY.value > 0;
			scrollTop.value = scrollY.value;
			return;
		}

		isFixed.value = scrollY.value > 0;
		isHidden.value = isFixed.value && scrollTop.value < scrollY.value;
		scrollTop.value = scrollY.value;
	}

	function onResize() {
		if (document.body.classList.contains('lock-scroll')) return;

		onScroll();
	}

	function toggleMenu() {
		isMenuOpen.value = !isMenuOpen.value
	}

	function closeMenu() {
		isMenuOpen.value = false
	}

	useResizeObserver(onResize, 100, true, true);

	onMounted(() => {
		window?.addEventListener('scroll', onScroll, {passive: true});
	});

	onBeforeUnmount(() => {
		window?.removeEventListener('scroll', onScroll);
	});

	watch(isMenuOpen, () => {
		lockScroll(isMenuOpen.value, root.value);
	});
</script>