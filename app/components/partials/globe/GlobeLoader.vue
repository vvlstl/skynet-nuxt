<template>
	<div
		ref="rootRef"
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
			<div ref="tele1Ref">SYS::INIT</div>
			<div ref="tele2Ref">NODE_SCAN: 000/127</div>
			<div ref="tele3Ref">UPLINK: <span ref="tele3SpanRef">ESTABLISHING</span></div>
		</div>

		<div class="globe-loader__id">
			<div>VPN.CORE//v4.6.2</div>
			<div ref="clockRef">00:00:00</div>
		</div>

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
					ref="ringOuterRef" cx="110" cy="110" r="100"
					fill="none" stroke="#ff2200" stroke-width="1.5"
					stroke-dasharray="4 10" opacity="0.5" filter="url(#glow)"
				/>
				<circle
					ref="ringMidRef" cx="110" cy="110" r="80"
					fill="none" stroke="#ff2200" stroke-width="1"
					stroke-dasharray="2 6" opacity="0.35"
				/>
				<circle
					ref="arcLoaderRef" cx="110" cy="110" r="92"
					fill="none" stroke="#ff5533" stroke-width="3" stroke-linecap="round"
					stroke-dasharray="120 600" filter="url(#glow)"
				/>
				<polygon
					ref="hexRef"
					points="110,40 169,75 169,145 110,180 51,145 51,75"
					fill="none" stroke="#ff2200" stroke-width="1.5" opacity="0.7"
					filter="url(#glow)"
				/>
				<polygon
					ref="hexFillRef"
					points="110,55 156,82 156,138 110,165 64,138 64,82"
					fill="#ff2200" opacity="0.06"
				/>
				<line x1="110" y1="95" x2="110" y2="125" stroke="#ff6644" stroke-width="1" opacity="0.5"/>
				<line x1="95" y1="110" x2="125" y2="110" stroke="#ff6644" stroke-width="1" opacity="0.5"/>
			</svg>

			<div class="globe-loader__pct-wrap">
				<div ref="pctRef" class="globe-loader__pct">0%</div>
				<div class="globe-loader__label">RENDERING</div>
			</div>
		</div>

		<div class="globe-loader__status-line">
			<div ref="statusTextRef" class="globe-loader__status-text">
				INITIALIZING THE NETWORK GLOBE
			</div>
		</div>

		<div class="globe-loader__progress-track">
			<div ref="progBarRef" class="globe-loader__progress-fill"/>
		</div>

		<div ref="hexdumpRef" class="globe-loader__hexdump"/>
		<div ref="glitchRef" class="globe-loader__glitch"/>
	</div>
</template>

<script setup lang="ts">
	type TGlobeLoaderProps = {
		visible?: boolean
	}

	const props = withDefaults(defineProps<TGlobeLoaderProps>(), {
		visible: true,
	})

	const rootRef = useTemplateRef<HTMLElement>('rootRef')
	const ringOuterRef = useTemplateRef<SVGCircleElement>('ringOuterRef')
	const ringMidRef = useTemplateRef<SVGCircleElement>('ringMidRef')
	const arcLoaderRef = useTemplateRef<SVGCircleElement>('arcLoaderRef')
	const hexRef = useTemplateRef<SVGPolygonElement>('hexRef')
	const hexFillRef = useTemplateRef<SVGPolygonElement>('hexFillRef')
	const pctRef = useTemplateRef<HTMLElement>('pctRef')
	const progBarRef = useTemplateRef<HTMLElement>('progBarRef')
	const statusTextRef = useTemplateRef<HTMLElement>('statusTextRef')
	const tele2Ref = useTemplateRef<HTMLElement>('tele2Ref')
	const tele3Ref = useTemplateRef<HTMLElement>('tele3Ref')
	const tele3SpanRef = useTemplateRef<HTMLElement>('tele3SpanRef')
	const clockRef = useTemplateRef<HTMLElement>('clockRef')
	const hexdumpRef = useTemplateRef<HTMLElement>('hexdumpRef')
	const glitchRef = useTemplateRef<HTMLElement>('glitchRef')

	const statuses = [
		'ИНИЦИАЛИЗАЦИЯ ГЛОБУСА СЕТИ',
		'ЗАГРУЗКА ГЕОДАННЫХ',
		'УСТАНОВКА УЗЛОВ СЕРВЕРОВ',
		'ШИФРОВАНИЕ КАНАЛА',
		'ПОСТРОЕНИЕ МАРШРУТОВ',
		'СИНХРОНИЗАЦИЯ С СЕТЬЮ',
	]

	let statusIdx = 0
	let angle = 0
	let progress = 0
	let nodeCount = 0
	let rafId = 0

	function hexChar(): string {
		return Math.floor(Math.random() * 16).toString(16).toUpperCase()
	}

	function randHex(len: number): string {
		let s = ''
		for (let i = 0; i < len; i++) {
			s += hexChar()
		}
		return s
	}

	function tick(): void {
		angle += 2.4

		ringOuterRef.value?.setAttribute('transform', `rotate(${angle} 110 110)`)
		ringMidRef.value?.setAttribute('transform', `rotate(${-angle * 1.6} 110 110)`)
		arcLoaderRef.value?.setAttribute('transform', `rotate(${angle * 2.2} 110 110)`)
		hexRef.value?.setAttribute('transform', `rotate(${angle * 0.4} 110 110)`)

		const pulse = 0.04 + Math.abs(Math.sin(angle * 0.05)) * 0.08
		hexFillRef.value?.setAttribute('opacity', pulse.toFixed(3))

		progress += (100 - progress) * 0.012 + Math.random() * 0.15
		if (progress > 99.4) {
			progress = 99.4 + Math.sin(angle * 0.1) * 0.3
		}

		if (pctRef.value) {
			pctRef.value.textContent = `${Math.floor(progress)}%`
		}
		if (progBarRef.value) {
			progBarRef.value.style.width = `${progress}%`
		}

		nodeCount = Math.min(127, Math.floor(progress * 1.27))
		if (tele2Ref.value) {
			tele2Ref.value.textContent = `NODE_SCAN: ${String(nodeCount).padStart(3, '0')}/127`
		}
		if (tele3SpanRef.value) {
			tele3SpanRef.value.textContent = progress > 60 ? 'STABLE' : 'ESTABLISHING'
			tele3SpanRef.value.style.color = progress > 60 ? '#66ff44' : '#ff6644'
		}

		const newIdx = Math.min(statuses.length - 1, Math.floor(progress / (100 / statuses.length)))
		if (newIdx !== statusIdx && statusTextRef.value) {
			statusIdx = newIdx
			statusTextRef.value.style.opacity = '0'
			setTimeout(() => {
				if (statusTextRef.value) {
					statusTextRef.value.textContent = statuses[statusIdx]
					statusTextRef.value.style.opacity = '0.85'
				}
			}, 120)
		}

		if (clockRef.value) {
			clockRef.value.textContent = new Date().toTimeString().slice(0, 8)
		}

		if (hexdumpRef.value && Math.random() < 0.3) {
			hexdumpRef.value.textContent = Array.from({length: 8}, () => randHex(4)).join(' ')
		}

		if (rootRef.value && glitchRef.value && Math.random() < 0.02) {
			glitchRef.value.style.opacity = '0.04'
			rootRef.value.style.transform = `translate(${(Math.random() - 0.5) * 3}px, ${(Math.random() - 0.5) * 2}px)`
			setTimeout(() => {
				if (glitchRef.value) {
					glitchRef.value.style.opacity = '0'
				}
				if (rootRef.value) {
					rootRef.value.style.transform = 'none'
				}
			}, 60)
		}

		rafId = requestAnimationFrame(tick)
	}

	onMounted(() => {
		if (!import.meta.client) {
			return
		}

		if (statusTextRef.value) {
			statusTextRef.value.style.transition = 'opacity 0.15s'
		}

		tick()
	})

	onBeforeUnmount(() => {
		cancelAnimationFrame(rafId)
	})
</script>
