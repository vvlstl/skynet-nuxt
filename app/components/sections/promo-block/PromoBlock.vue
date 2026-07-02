<script setup lang="ts">
	import {defineAsyncComponent} from 'vue'
	import {useI18n} from '~/composables/useI18n'
	import Btn from "~/components/ui/Btn.vue";
	import GlobeLoader from "~/components/partials/globe/GlobeLoader.vue";
	import NodeInfo from "~/components/sections/promo-block/NodeInfo.vue";

	const {t} = useI18n()
	const Globe = defineAsyncComponent(() => import('~/components/partials/globe/Globe.vue'))
</script>

<template>
	<section class="promo-block">
		<div class="promo-block__content">
			<div class="promo-block__info">
				<div class="promo-block__title">
					{{ t('promo.title') }}
				</div>
				<div class="promo-block__description">
					{{ t('promo.description') }}
				</div>
				<div class="promo-block__group-btns">
					<Btn :text="t('promo.activate')">
						<template #iconRight>
								<span class="btn__icon">
									<Icon name="hugeicons:arrow-down-right-01"/>
								</span>
						</template>
					</Btn>
					<Btn
						:text="t('promo.telegram_bot')"
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
				<NodeInfo class="promo-block__node-info"/>
			</div>
			<div class="promo-block__globus">
				<ClientOnly>
					<Globe/>
					<template #fallback>
						<div class="promo-block__globus-fallback">
							<GlobeLoader/>
						</div>
					</template>
				</ClientOnly>
			</div>
		</div>
	</section>
</template>
