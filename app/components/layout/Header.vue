<template>
	<header class="header">
		<div class="header__inner">
			<Logo/>

			<nav class="header__nav">
				<AnchorsLink :items="navLinks"/>
			</nav>

			<div class="header__actions">
				<Btn
					class="header__btn-bot"
					text="LogIn"
					theme="white"
					:is-bordered="true"
				>
					<template #iconLeft>
						<span class="btn__icon">
							<Icon name="hugeicons:user-account"/>
						</span>
					</template>
				</Btn>

				<button
					class="btn btn--square header__menu-btn"
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
	import {ref} from 'vue'
	import Btn from "~/components/ui/Btn.vue";
	import Logo from "~/components/Logo.vue";
	import MenuIcon from "~/components/common/MenuIcon.vue";
	import BurgerMenu from "~/components/layout/BurgerMenu.vue";
	import AnchorsLink from "~/components/common/AnchorsLink.vue";
	import type {TLink} from "~/types/TLink";

	const navLinks: TLink[] = [
		{text: 'Advantages', url: '#advantages'},
		{text: 'Pricing', url: '#pricing'},
		{text: 'How it works', url: '#how-it-works'},
		{text: 'FAQ', url: '#faq'},
	];

	const isMenuOpen = ref<boolean>(false)

	function toggleMenu() {
		isMenuOpen.value = !isMenuOpen.value
	}

	function closeMenu() {
		isMenuOpen.value = false
	}
</script>
