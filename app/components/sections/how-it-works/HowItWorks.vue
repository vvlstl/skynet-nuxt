<template>
	<section class="how-it-works">
		<div class="content-container">
			<div class="how-it-works__content">
				<SectionHead :title="t('how-it-works.title')"/>

				<div class="how-it-works__grid">
					<div class="how-it-works__terminal">
						<GlobeSvg class="how-it-works__globe"/>
						<div class="how-it-works__log">
							<div class="how-it-works__log-item">
								<span class="how-it-works__log-arrow">
									<Icon name="hugeicons:arrow-right-01"/>
								</span>
								<div class="how-it-works__log-info">
									<span class="how-it-works__log-label" v-html="t('how-it-works.log.authorization')"/>
									<span class="how-it-works__log-status" v-html="t('how-it-works.log.status')"/>
								</div>
							</div>
							<div class="how-it-works__log-item">
								<span class="how-it-works__log-arrow">
									<Icon name="hugeicons:arrow-right-01"/>
								</span>
								<div class="how-it-works__log-info">
									<span class="how-it-works__log-label" v-html="t('how-it-works.log.plan')"/>
									<span class="how-it-works__log-status" v-html="t('how-it-works.log.status')"/>
								</div>
							</div>
							<div class="how-it-works__log-item">
								<span class="how-it-works__log-arrow">
									<Icon name="hugeicons:arrow-right-01"/>
								</span>
								<div class="how-it-works__log-info">
									<span class="how-it-works__log-label" v-html="t('how-it-works.log.payment')"/>
									<span class="how-it-works__log-status" v-html="t('how-it-works.log.status')"/>
								</div>
							</div>
							<div class="how-it-works__log-item">
								<span class="how-it-works__log-arrow">
									<Icon name="hugeicons:arrow-right-01"/>
								</span>
								<div class="how-it-works__log-info">
									<span class="how-it-works__log-label" v-html="t('how-it-works.log.config')"/>
									<span class="how-it-works__log-status" v-html="t('how-it-works.log.status')"/>
								</div>
							</div>
						</div>

						<div class="how-it-works__result">
							<div class="how-it-works__result-line-icon">
								<Icon name="hugeicons:arrow-right-01"/>
							</div>
							<span class="how-it-works__result-line" v-html="t('how-it-works.log.result')"/>
						</div>
					</div>

					<div class="how-it-works__steps">
						<div class="how-it-works__step">
							<div class="how-it-works__step-icon">
								<Icon name="hugeicons:authorized"/>
							</div>
							<div class="how-it-works__step-info">
								<p class="how-it-works__step-title" v-html="t('how-it-works.steps.start.title')"/>
								<p class="how-it-works__step-desc" v-html="t('how-it-works.steps.start.desc')"/>
							</div>
						</div>

						<div class="how-it-works__step">
							<div class="how-it-works__step-icon">
								<Icon name="hugeicons:sticky-note-01"/>
							</div>
							<div class="how-it-works__step-info">
								<p class="how-it-works__step-title" v-html="t('how-it-works.steps.tariff.title')"/>
								<p class="how-it-works__step-desc" v-html="t('how-it-works.steps.tariff.desc')"/>
							</div>
						</div>

						<div class="how-it-works__step">
							<div class="how-it-works__step-icon">
								<Icon name="hugeicons:cloud-download"/>
							</div>
							<div class="how-it-works__step-info">
								<p class="how-it-works__step-title" v-html="t('how-it-works.steps.access.title')"/>
								<p class="how-it-works__step-desc" v-html="t('how-it-works.steps.access.desc')"/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	import SectionHead from "~/components/common/SectionHead.vue";
	import GlobeSvg from "~/components/partials/globe/GlobeSvg.vue";

	const {t} = useI18n()
</script>
