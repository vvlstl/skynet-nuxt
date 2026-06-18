<template>
	<section class="promo-block">
		<div class="promo-block__content">
			<div class="promo-block__info">
				<div class="promo-block__title">
					CONTROL ABOVE&nbsp;THE&nbsp;NETWORK WITHOUT&nbsp;RESTRICTIONS
				</div>
				<div class="promo-block__description">
					SECURE CONNECTION.<br>
					HIGH SPEED.<br>
					ACCESS TO ANY SERVICES.
				</div>
				<div class="promo-block__group-btns">
					<Btn text="ACTIVATE ACCESS">
						<template #iconRight>
								<span class="btn__icon">
									<Icon name="hugeicons:arrow-down-right-01"/>
								</span>
						</template>
					</Btn>
					<Btn
						text="Telegram Bot"
						theme="white"
						:is-bordered="true"
					>
						<template #iconLeft>
								<span class="btn__icon">
									<Icon name="hugeicons:telegram"/>
								</span>
						</template>
					</Btn>
				</div>
				<div class="promo-block__node-info">
					<div class="promo-block__node-info-row">
						<div class="promo-block__node-info-icon">
							<Icon name="hugeicons:arrow-right-01"/>
						</div>
						<div class="promo-block__node-info-value">
							STATUS: ONLINE
						</div>
					</div>
					<div class="promo-block__node-info-row">
						<div class="promo-block__node-info-icon">
							<Icon name="hugeicons:arrow-right-01"/>
						</div>
						<div class="promo-block__node-info-value">
							NODES: 2
						</div>
					</div>
					<div class="promo-block__node-info-row">
						<div class="promo-block__node-info-icon">
							<Icon name="hugeicons:arrow-right-01"/>
						</div>
						<div class="promo-block__node-info-value">
							LATENCY: 157
						</div>
					</div>
					<div class="promo-block__node-info-row">
						<div class="promo-block__node-info-icon">
							<Icon name="hugeicons:arrow-right-01"/>
						</div>
						<div class="promo-block__node-info-value">
							PROTOCOL: VLESS
						</div>
					</div>
				</div>
			</div>
			<div class="promo-block__globus">
				<ClientOnly>
					<Globe/>
					<template #fallback>
						<div class="promo-block__globus-fallback">
							LOADING THE WEB GLOBE...
						</div>
					</template>
				</ClientOnly>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">

	import Btn from "~/components/ui/Btn.vue";
</script>