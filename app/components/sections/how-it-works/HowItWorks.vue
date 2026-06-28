<template>
	<section class="how-it-works">
		<div class="content-container">
			<div class="how-it-works__content">
				<SectionHead title="HOW IT WORKS"/>

				<div class="how-it-works__grid">
					<div class="how-it-works__terminal">
						<svg class="how-it-works__globe" viewBox="0 0 200 200">
							<defs>
								<filter id="globeGlow" x="-50%" y="-50%" width="200%" height="200%">
									<feGaussianBlur stdDeviation="1" result="blur"/>
									<feMerge>
										<feMergeNode in="blur"/>
										<feMergeNode in="SourceGraphic"/>
									</feMerge>
								</filter>
							</defs>

							<g filter="url(#globeGlow)">
								<circle cx="100" cy="100" r="90" fill="none" stroke="#ff1b1b" stroke-width="0.6" opacity="0.6"/>

								<ellipse cx="100" cy="100" rx="90" ry="23.3" fill="none" stroke="#ff1b1b" stroke-width="0.4" opacity="0.36"/>
								<ellipse cx="100" cy="100" rx="90" ry="45.0" fill="none" stroke="#ff1b1b" stroke-width="0.4" opacity="0.42"/>
								<ellipse cx="100" cy="100" rx="90" ry="63.6" fill="none" stroke="#ff1b1b" stroke-width="0.4" opacity="0.48"/>
								<ellipse cx="100" cy="100" rx="90" ry="77.9" fill="none" stroke="#ff1b1b" stroke-width="0.4" opacity="0.52"/>
								<ellipse cx="100" cy="100" rx="90" ry="86.9" fill="none" stroke="#ff1b1b" stroke-width="0.4" opacity="0.54"/>

								<ellipse cx="100" cy="100" rx="23.3" ry="90" data-meridian style="animation-delay:0s" fill="none" stroke="#ff1b1b" stroke-width="0.4" opacity="0.36"/>
								<ellipse cx="100" cy="100" rx="45.0" ry="90" data-meridian style="animation-delay:-1.2s" fill="none" stroke="#ff1b1b" stroke-width="0.4" opacity="0.42"/>
								<ellipse cx="100" cy="100" rx="63.6" ry="90" data-meridian style="animation-delay:-2.4s" fill="none" stroke="#ff1b1b" stroke-width="0.4" opacity="0.48"/>
								<ellipse cx="100" cy="100" rx="77.9" ry="90" data-meridian style="animation-delay:-3.6s" fill="none" stroke="#ff1b1b" stroke-width="0.4" opacity="0.52"/>
								<ellipse cx="100" cy="100" rx="86.9" ry="90" data-meridian style="animation-delay:-4.8s" fill="none" stroke="#ff1b1b" stroke-width="0.4" opacity="0.54"/>
							</g>
						</svg>

						<div class="how-it-works__log">
							<div class="how-it-works__log-item">
								<span class="how-it-works__log-arrow">
									<Icon name="hugeicons:arrow-right-01"/>
								</span>
								<div class="how-it-works__log-info">
									<span class="how-it-works__log-label">AUTHORIZATION</span>
									<span class="how-it-works__log-status">SUCCESS</span>
								</div>
							</div>
							<div class="how-it-works__log-item">
								<span class="how-it-works__log-arrow">
									<Icon name="hugeicons:arrow-right-01"/>
								</span>
								<div class="how-it-works__log-info">
									<span class="how-it-works__log-label">PLAN SELECTED</span>
									<span class="how-it-works__log-status">SUCCESS</span>
								</div>
							</div>
							<div class="how-it-works__log-item">
								<span class="how-it-works__log-arrow">
									<Icon name="hugeicons:arrow-right-01"/>
								</span>
								<div class="how-it-works__log-info">
									<span class="how-it-works__log-label">PAYMENT CONFIRMED</span>
									<span class="how-it-works__log-status">SUCCESS</span>
								</div>
							</div>
							<div class="how-it-works__log-item">
								<span class="how-it-works__log-arrow">
									<Icon name="hugeicons:arrow-right-01"/>
								</span>
								<div class="how-it-works__log-info">
									<span class="how-it-works__log-label">VPN CONFIG GENERATED</span>
									<span class="how-it-works__log-status">SUCCESS</span>
								</div>
							</div>
						</div>

						<div class="how-it-works__result">
							<div class="how-it-works__result-line-icon">
								<Icon name="hugeicons:arrow-right-01"/>
							</div>
							<span class="how-it-works__result-line">
								CONNECTION ESTABLISHED WELCOME TO NETWORK
							</span>
						</div>
					</div>

					<div class="how-it-works__steps">
						<div class="how-it-works__step">
							<div class="how-it-works__step-icon">
								<Icon name="hugeicons:authorized"/>
							</div>
							<div class="how-it-works__step-info">
								<p class="how-it-works__step-title">
									Start
								</p>
								<p class="how-it-works__step-desc">
									Find our bot in Telegram and click "/start" or log in here
								</p>
							</div>
						</div>

						<div class="how-it-works__step">
							<div class="how-it-works__step-icon">
								<Icon name="hugeicons:sticky-note-01"/>
							</div>
							<div class="how-it-works__step-info">
								<p class="how-it-works__step-title">Choose a tariff and pay</p>
								<p class="how-it-works__step-desc">
									Select the appropriate tariff and make the payment.
								</p>
							</div>
						</div>

						<div class="how-it-works__step">
							<div class="how-it-works__step-icon">
								<Icon name="hugeicons:cloud-download"/>
							</div>
							<div class="how-it-works__step-info">
								<p class="how-it-works__step-title">Get access</p>
								<p class="how-it-works__step-desc">
									Instantly get the VPN configuration and it's ready to use.
								</p>
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
</script>
