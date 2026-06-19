<template>
	<div
		class="globe-loader"
		:class="{ 'globe-loader--hidden': !visible }"
	>
		<div class="globe-loader__scanlines"/>
		<div class="globe-loader__vignette"/>

		<svg
			class="globe-loader__corners"
			viewBox="0 0 600 480"
			preserveAspectRatio="none"
		>
			<g stroke="#ff2200" stroke-width="2" fill="none" opacity="0.6">
				<path d="M20,20 L20,55 M20,20 L55,20"/>
				<path d="M580,20 L580,55 M580,20 L545,20"/>
				<path d="M20,460 L20,425 M20,460 L55,460"/>
				<path d="M580,460 L580,425 M580,460 L545,460"/>
			</g>
		</svg>

		<div class="globe-loader__telemetry">
			<div>SYS::INIT</div>
			<div class="globe-loader__nodescan">
				<span class="globe-loader__nodescan-num">NODE_SCAN: 000/127</span>
				<span class="globe-loader__nodescan-num globe-loader__nodescan-num--2">
					NODE_SCAN: 064/127
				</span>
				<span class="globe-loader__nodescan-num globe-loader__nodescan-num--3">
					NODE_SCAN: 127/127
				</span>
			</div>
			<div>UPLINK: <span class="globe-loader__uplink">ESTABLISHING</span></div>
		</div>

		<div class="globe-loader__id">
			<div>VPN.CORE//v4.6.2</div>
			<div class="globe-loader__clock"/>
		</div>

		<div class="globe-loader__main">
			<div class="globe-loader__center">
				<svg width="220" height="220" viewBox="0 0 220 220">
					<defs>
						<filter id="glow">
							<feGaussianBlur stdDeviation="2.2" result="b"/>
							<feMerge>
								<feMergeNode in="b"/>
								<feMergeNode in="SourceGraphic"/>
							</feMerge>
						</filter>
					</defs>
					<circle
						class="globe-loader__ring-outer" cx="110" cy="110" r="100"
						fill="none" stroke="#ff2200" stroke-width="1.5"
						stroke-dasharray="4 10" opacity="0.5" filter="url(#glow)"
					/>
					<circle
						class="globe-loader__ring-mid" cx="110" cy="110" r="80"
						fill="none" stroke="#ff2200" stroke-width="1"
						stroke-dasharray="2 6" opacity="0.35"
					/>
					<circle
						class="globe-loader__arc" cx="110" cy="110" r="92"
						fill="none" stroke="#ff5533" stroke-width="3" stroke-linecap="round"
						stroke-dasharray="120 600" filter="url(#glow)"
					/>
					<polygon
						class="globe-loader__hex"
						points="110,40 169,75 169,145 110,180 51,145 51,75"
						fill="none" stroke="#ff2200" stroke-width="1.5" opacity="0.7"
						filter="url(#glow)"
					/>
					<polygon
						class="globe-loader__hex-fill"
						points="110,55 156,82 156,138 110,165 64,138 64,82"
						fill="#ff2200" opacity="0.06"
					/>
				</svg>

				<div class="globe-loader__pct-wrap">
					<div class="globe-loader__pct">
						<span v-for="n in 100" :key="n">{{ n - 1 }}%</span>
					</div>
					<div class="globe-loader__label">RENDERING</div>
				</div>
			</div>

			<div class="globe-loader__status-line-info">
				<div class="globe-loader__status-line">
					<div class="globe-loader__status-text">
						<span>INITIALIZING THE NETWORK GLOBE</span>
						<span>UPLOADING GEODATA</span>
						<span>INSTALLING SERVER NODES</span>
						<span>CHANNEL ENCRYPTION</span>
						<span>BUILDING ROUTES</span>
						<span>SYNCING WITH THE NETWORK</span>
					</div>
				</div>

				<div class="globe-loader__progress-track">
					<div class="globe-loader__progress-fill"/>
				</div>
			</div>
		</div>

		<div class="globe-loader__hexdump">
			<span class="globe-loader__hexdump-value">3F2A 9B11 0C4E 7710 AA02 5D8F 1E66 C390</span>
			<span class="globe-loader__hexdump-value">91FF 0A23 BC44 7711 2E9D 0058 D1AB 663C</span>
			<span class="globe-loader__hexdump-value">0021 88FE AC10 3399 7B0D F420 1166 9E80</span>
		</div>

		<div class="globe-loader__glitch"/>
	</div>
</template>

<script setup lang="ts">
	type TGlobeLoaderProps = {
		visible?: boolean
	}

	const props = withDefaults(defineProps<TGlobeLoaderProps>(), {
		visible: true,
	})
</script>
