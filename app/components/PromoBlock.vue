<template>
	<section class="promo-block">
		<div class="content-container">
			<div class="promo-block__content">
				<div class="promo-block__info">
					<div class="promo-block__title">
						КОНТРОЛЬ<br>
						НАД СЕТЬЮ<br>
						БЕЗ ОГРАНИЧЕНИЙ
					</div>
					<div class="promo-block__description">
						ЗАЩИЩЁННОЕ ПОДКЛЮЧЕНИЕ.<br>
						ВЫСОКАЯ СКОРОСТЬ.<br>
						ДОСТУП К ЛЮБЫМ СЕРВИСАМ.
					</div>
					<div class="promo-block__group-btns">
						<Btn text="АКТИВИРОВАТЬ"/>
						<Btn
							text="Telegram Bot"
							theme="white"
							:is-bordered="true"
						>
							<template #iconLeft>
								<span class="btn__icon">
									<Icon name="hugeicons:telegram" />
								</span>
							</template>
						</Btn>
					</div>
				</div>
				<div class="promo-block__globus"></div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">

	import Btn from "~/components/ui/Btn.vue";
</script>