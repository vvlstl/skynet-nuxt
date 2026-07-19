<template>
	<section class="demo-access">
		<div class="content-container">
			<div class="demo-access__content">
				<SectionHead
					:title="t('demo-access.title')"
					:subtitle="t('demo-access.subtitle')"
				/>

				<div class="demo-access__grid">
					<div class="demo-access__steps">
						<div
							v-for="step in steps"
							:key="step.id"
							class="demo-access__step"
						>
							<div class="demo-access__step-col">
								<div
									class="demo-access__step-num"
									:class="{
										'demo-access__step-num--is-done': step.isDone,
										'demo-access__step-num--is-lit': step.isLit,
									}"
								>
									<Icon v-if="step.isDone" name="proicons:checkmark"/>
									<span v-else v-html="step.num"></span>
								</div>
								<div
									class="demo-access__step-num-line"
									:class="{'demo-access__step-num-line--is-lit': step.isLineLit}"
								/>
							</div>
							<div class="demo-access__step-info">
								<div
									class="demo-access__step-title"
									:class="{'demo-access__step-title--is-lit': step.isTitleLit}"
									v-html="step.title"
								/>
								<div class="demo-access__step-desc" v-html="step.desc"/>
							</div>
						</div>
					</div>

					<div class="demo-access__terminal">
						<div class="demo-access__terminal-head">
							<span class="demo-access__terminal-head-dot is-red"/>
							<span class="demo-access__terminal-head-dot"/>
							<span class="demo-access__terminal-head-dot"/>
							<span class="demo-access__terminal-head-txt" v-html="t('demo-access.terminal.head')"/>
						</div>

						<div class="demo-access__terminal-ticker">
							<span v-html="tickerText"/>
						</div>

						<div class="demo-access__card-top">
							<div
								class="demo-access__ring-wrap"
								@mousedown="startHold"
								@mouseup="cancelHold"
								@mouseleave="cancelHold"
								@touchstart.prevent="startHold"
								@touchend.prevent="cancelHold"
							>
								<div class="demo-access__ring-bg"/>
								<div
									class="demo-access__ring-pulse"
									:class="{'is-pulsing': isHolding}"
								/>
								<svg
									class="demo-access__ring-svg"
									viewBox="0 0 100 100"
								>
									<circle
										cx="50"
										cy="50"
										r="45"
										fill="none"
										stroke-width="1"
									/>
									<circle
										class="demo-access__ring-fill"
										cx="50"
										cy="50"
										r="45"
										fill="none"
										stroke-width="2"
										stroke-linecap="round"
										:stroke-dashoffset="283 * (1 - progress / 100)"
									/>
								</svg>
								<div
									class="demo-access__hbtn"
									:class="{
										'demo-access__hbtn--is-active': isHolding,
										'demo-access__hbtn--is-done': isActivated,
									}"
								>
									<div class="demo-access__shield">
										<Icon :name="icon"/>
									</div>
								</div>
							</div>

							<div class="demo-access__info">
								<div
									class="demo-access__clabel"
									:class="{'is-glow': isActivated}"
									v-html="demoAccessCLabel"
								/>
								<div class="demo-access__cdesc" v-html="demoAccessDesc"/>
							</div>

							<div class="demo-access__pbar-track">
								<div
									class="demo-access__pbar"
									:class="{'is-active': isHolding || isActivated}"
									:style="{width: progress + '%'}"
								/>
							</div>
						</div>

						<div class="demo-access__stats">
							<div
								v-for="stat in stats"
								:key="stat.id"
								class="demo-access__stat"
								:class="{'demo-access__stat--is-lit': stat.isLit}"
							>
								<Icon
									:name="stat.icon"
									class="demo-access__stat-icon"
								/>
								<div
									class="demo-access__stat-v"
									:class="{'demo-access__stat-v--is-lit': stat.isLit}"
									v-html="stat.label"
								/>
							</div>
						</div>

						<div
							v-show="isActivated"
							class="demo-access__key-box"
							:class="{'is-show': isActivated}"
						>
							<div class="demo-access__key-row">
								<div class="demo-access__key-txt" v-html="placeholderKey"/>
								<button
									type="button"
									class="demo-access__copy-btn btn btn--sm"
									:class="{'demo-access__copy-btn--is-copied': isCopied}"
									@click="copyKey"
								>
									<span class="btn__text" v-html="copyBtn"/>
								</button>
							</div>
						</div>

						<div class="demo-access__note" v-html="t('demo-access.note')"/>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	import {computed, ref} from 'vue'
	import SectionHead from '~/components/common/SectionHead.vue'
	import {useHoldActivation} from '~/composables/useHoldActivation'

	const {t} = useI18n()
	const {isHolding, progress, isActivated, startHold, cancelHold} = useHoldActivation(3000)

	// TODO Placeholder-ключ до интеграции с backend
	const placeholderKey = 'vless://8f3a2b1c-demo@node01.skynet.net:443?type=tcp&security=reality&pbk=abc123...'

	const isCopied = ref<boolean>(false)
	let copiedTimer: ReturnType<typeof setTimeout> | null = null

	const tickerText = computed<string>(() =>
		isActivated.value
			? t('demo-access.terminal.ticker-active')
			: t('demo-access.terminal.ticker-idle'),
	)

	const demoAccessCLabel = computed<string>(() => {
		return isActivated.value ? t('demo-access.label.activated') : t('demo-access.label.hold')
	});

	const copyBtn = computed<string>(() => {
		return isCopied.value ? t('demo-access.label.copied') : t('demo-access.label.copy');
	});

	const steps = computed(() => [
		{
			id: 1,
			num: '01',
			title: t('demo-access.step1.title'),
			desc: t('demo-access.step1.desc'),
			isDone: isActivated.value,
			isLit: isActivated.value,
			isLineLit: isActivated.value,
			isTitleLit: isActivated.value,
		},
		{
			id: 2,
			num: '02',
			title: t('demo-access.step2.title'),
			desc: t('demo-access.step2.desc'),
			isDone: isCopied.value,
			isLit: isCopied.value,
			isLineLit: isCopied.value,
			isTitleLit: isCopied.value,
		},
		{
			id: 3,
			num: '03',
			title: t('demo-access.step3.title'),
			desc: t('demo-access.step3.desc'),
			isDone: false,
			isLit: isCopied.value,
			isLineLit: false,
			isTitleLit: isCopied.value,
		},
		{
			id: 4,
			num: '04',
			title: t('demo-access.step4.title'),
			desc: t('demo-access.step4.desc'),
			isDone: false,
			isLit: false,
			isLineLit: false,
			isTitleLit: false,
		},
	])

	const stats = computed(() => [
		{id: 'hours', icon: 'hugeicons:clock-04', label: t('demo-access.stats.hours'), isLit: isActivated.value},
		{id: 'speed', icon: 'hugeicons:zap', label: t('demo-access.stats.speed'), isLit: isActivated.value},
		{
			id: 'protocol',
			icon: 'hugeicons:shield-key',
			label: t('demo-access.stats.protocol'),
			isLit: isActivated.value
		},
	]);

	const icon = computed(() => {
		return !isActivated.value ? 'hugeicons:shield-key' : 'hugeicons:checkmark-circle-02';
	})

	const demoAccessDesc = computed(() => {
		return isActivated.value ? t('demo-access.desc-active') : t('demo-access.desc');
	})

	async function copyKey(e: Event): Promise<void> {
		const target = e.currentTarget as HTMLButtonElement
		try {
			await navigator.clipboard.writeText(placeholderKey)
			isCopied.value = true
			if (copiedTimer) clearTimeout(copiedTimer)
			copiedTimer = setTimeout(() => {
				isCopied.value = false
			}, 2000)
		} catch {
			// navigator.clipboard может отсутствовать в небезопасном контексте — fallback не нужен для placeholder
			void target
		}
	}
</script>
