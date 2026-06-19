<template>
	<header class="header">
		<div class="header__inner">
			<!-- Логотип -->
			<Logo/>

			<!-- Навигация -->
			<nav class="nav" :class="{ 'nav--open': isMenuOpen }">
				<a href="#advantages" class="nav__link" @click="closeMenu">Преимущества</a>
				<a href="#servers" class="nav__link" @click="closeMenu">Серверы</a>
				<a href="#pricing" class="nav__link" @click="closeMenu">Тарифы</a>
				<a href="#how-it-works" class="nav__link" @click="closeMenu">Как это работает</a>
				<a href="#faq" class="nav__link" @click="closeMenu">FAQ</a>
			</nav>

			<!-- Кнопка Telegram Bot -->
			<Btn
				text="Telegram Bot"
				:is-bordered="true"
			>
				<template #iconLeft>
								<span class="btn__icon">
									<Icon name="hugeicons:telegram"/>
								</span>
				</template>
			</Btn>

			<!-- Бургер для мобилки -->
			<button class="burger" :class="{ 'burger--active': isMenuOpen }" @click="toggleMenu" aria-label="Меню">
				<span></span>
				<span></span>
				<span></span>
			</button>
		</div>
	</header>
</template>

<script setup lang="ts">
	import {ref} from 'vue'
	import Btn from "~/components/ui/Btn.vue";
	import Logo from "~/components/common/Logo.vue";

	const isMenuOpen = ref(false)

	function toggleMenu() {
		isMenuOpen.value = !isMenuOpen.value
	}

	function closeMenu() {
		isMenuOpen.value = false
	}
</script>
