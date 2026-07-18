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
			<div class="content-container">
				<div class="header__content">
					<Logo/>

					<nav class="header__nav">
						<ClientOnly>
							<AnchorsLink
								:key="locale"
								:items="navLinks"
							/>
							<template #fallback>
								<CyberLink
									v-for="(fallbackLink, index) in navLinks"
									:key="index"
									:label="fallbackLink.text"
									theme="grey"
								/>
							</template>
						</ClientOnly>
						<CyberLink
							:label="t('header.support')"
							theme="grey"
						/>
					</nav>

					<div class="header__actions">
						<CommonLanguageSwitcher/>

						<Btn
							class="header__btn-bot"
							:text="t('header.login')"
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
			</div>
		</div>
	</header>
</template>

<script setup lang="ts">
	import {ref, onMounted, onBeforeUnmount, computed} from 'vue'
	import Btn from "~/components/ui/Btn.vue";
	import Logo from "~/components/common/Logo.vue";
	import MenuIcon from "~/components/ui/MenuIcon.vue";
	import BurgerMenu from "~/components/layout/BurgerMenu.vue";
	import AnchorsLink from "~/components/common/AnchorsLink.vue";
	import type {TLink} from "~/types/TLink";
	import {usePageScroll} from "~/composables/usePageScroll";
	import CyberLink from "~/components/ui/CyberLink.vue";

	const {t, locale} = useI18n()

	const navLinks = computed((): TLink[] => [
		{text: t('header.test-drive'), url: '#demo-access'},
		{text: t('header.pricing'), url: '#pricing'},
		{text: t('header.howItWorks'), url: '#how-it-works'},
	]);

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