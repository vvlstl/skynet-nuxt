<template>
	<section class="network">
		<div class="content-container">
			<div class="network__content">
				<div class="network__info-panel">
					<div class="network__info-panel-header">
						<h2 class="network__title"> {{ t('network.title') }} </h2>
						<div class="network__divider"></div>
						<p class="network__description"> {{ t('network.description') }} </p>
					</div>
					<div class="network__stats">
						<div class="network__stat-row">
							<span>ACTIVE NODES:</span>
							<span class="network__stat-value">127</span>
						</div>
						<div class="network__stat-row">
							<span>ONLINE:</span>
							<span class="network__stat-value">100%</span>
						</div>
					</div>
				</div>

				<div class="network__map-area">
					<ClientOnly>
						<svg
							v-if="svgReady"
							class="network__map-svg"
							:viewBox="`0 0 ${mapWidth} ${mapHeight}`"
							preserveAspectRatio="xMidYMid meet"
							xmlns="http://www.w3.org/2000/svg"
						>
							<defs>
								<pattern
									id="network-dots"
									:width="6"
									:height="6"
									patternUnits="userSpaceOnUse"
								>
									<circle cx="1" cy="1" r="0.6" fill="rgba(120,30,30,0.6)"/>
								</pattern>
								<filter id="node-glow" x="-100%" y="-100%" width="300%" height="300%">
									<feGaussianBlur stdDeviation="3" result="blur"/>
									<feMerge>
										<feMergeNode in="blur"/>
										<feMergeNode in="SourceGraphic"/>
									</feMerge>
								</filter>
							</defs>
							<g id="network-countries" ref="svgCountriesRef"
							   fill="url(#network-dots)"
							   stroke="rgba(150,40,40,0.35)"
							   stroke-width="0.4"></g>
							<g id="network-links" ref="svgLinksRef"
							   fill="none"
							   stroke="rgba(255,34,0,0.55)"
							   stroke-width="1"></g>
							<g id="network-nodes" ref="svgNodesRef"></g>
						</svg>
						<template #fallback>
							<div class="network__loader">
								<GlobeLoader/>
							</div>
						</template>
					</ClientOnly>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	import {ref, onMounted, nextTick, useTemplateRef} from 'vue'
	import * as d3 from 'd3'
	import {feature} from 'topojson-client'
	import world from 'world-atlas/countries-110m.json'
	import GlobeLoader from "~/components/partials/globe/GlobeLoader.vue";

	const {t} = useI18n()

	const mapWidth = 800
	const mapHeight = 420
	const svgReady = ref(false)
	const svgCountriesRef = useTemplateRef<SVGGElement>('svgCountriesRef')
	const svgLinksRef = useTemplateRef<SVGGElement>('svgLinksRef')
	const svgNodesRef = useTemplateRef<SVGGElement>('svgNodesRef')

	type LabelSide = 'right' | 'left'

	interface City {
		name: string
		lon: number
		lat: number
		labelSide?: LabelSide
	}

	const cities: City[] = [
		{name: 'USA', lon: -100, lat: 40, labelSide: 'right'},
		{name: 'Netherlands', lon: 5.3, lat: 52.1, labelSide: 'left'},
		{name: 'Germany', lon: 10.4, lat: 51.2, labelSide: 'right'},
		{name: 'Turkey', lon: 35, lat: 39, labelSide: 'left'},
		{name: 'Japan', lon: 138, lat: 36, labelSide: 'right'},
		{name: 'Singapore', lon: 103.8, lat: 1.35, labelSide: 'left'},
	]

	const links: [string, string][] = [
		['USA', 'Netherlands'],
		['Netherlands', 'Germany'],
		['Germany', 'Turkey'],
		['Turkey', 'Singapore'],
		['Singapore', 'Japan'],
		['Germany', 'Japan'],
	]

	const projection = d3.geoNaturalEarth1()
		.scale(150)
		.translate([mapWidth / 2, mapHeight / 2 + 10])

	const path = d3.geoPath(projection)

	function project(c: City): { x: number; y: number } {
		const p = projection([c.lon, c.lat])!
		return {x: p[0], y: p[1]}
	}

	const SVG_NS = 'http://www.w3.org/2000/svg'

	function drawLinksAndNodes(): void {
		const linksG = svgLinksRef.value
		const nodesG = svgNodesRef.value
		if (!linksG || !nodesG) {
			console.error('[ERROR][NetworkSection] Map SVG elements not found')
			return
		}

		const cityMap = new Map<string, ReturnType<typeof project>>()
		cities.forEach((c) => cityMap.set(c.name, project(c)))

		links.forEach(([a, b]) => {
			const p1 = cityMap.get(a)
			const p2 = cityMap.get(b)
			if (!p1 || !p2) {
				console.warn(`[WARN][NetworkSection] Link endpoint not found: ${a} → ${b}`)
				return
			}
			const mx = (p1.x + p2.x) / 2
			const my = (p1.y + p2.y) / 2 - 30
			const el = document.createElementNS(SVG_NS, 'path')
			el.setAttribute('d', `M${p1.x},${p1.y} Q${mx},${my} ${p2.x},${p2.y}`)
			linksG.appendChild(el)
		})

		cities.forEach((c) => {
			const p = cityMap.get(c.name)
			if (!p) {
				console.warn(`[WARN][NetworkSection] City not projected: ${c.name}`)
				return
			}

			// Анимированное кольцо (бывший ::after)
			const ring = document.createElementNS(SVG_NS, 'circle')
			ring.setAttribute('cx', String(p.x))
			ring.setAttribute('cy', String(p.y))
			ring.setAttribute('r', '10')
			ring.setAttribute('fill', 'none')
			ring.setAttribute('stroke', 'rgba(255,80,0,0.5)')
			ring.setAttribute('stroke-width', '1')
			ring.setAttribute('class', 'network-ring')
			nodesG.appendChild(ring)

			// Центральная точка с glow
			const dot = document.createElementNS(SVG_NS, 'circle')
			dot.setAttribute('cx', String(p.x))
			dot.setAttribute('cy', String(p.y))
			dot.setAttribute('r', '5')
			dot.setAttribute('fill', 'rgba(255,27,27,0.9)')
			dot.setAttribute('class', 'network-dot')
			nodesG.appendChild(dot)

			// Лейбл
			const isLeft = c.labelSide === 'left'
			const labelX = isLeft ? p.x - 14 : p.x + 14
			const text = document.createElementNS(SVG_NS, 'text')
			text.setAttribute('x', String(labelX))
			text.setAttribute('y', String(p.y - 6))
			text.setAttribute('text-anchor', isLeft ? 'end' : 'start')
			text.setAttribute('class', 'network-label')
			text.textContent = c.name
			nodesG.appendChild(text)
		})
	}

	onMounted(async () => {
		svgReady.value = true
		await nextTick()

		const topology = world as {
			type: string;
			objects: Record<string, { type: string; geometries: unknown[] }>;
			arcs: unknown[]
		}
		const countries = feature(topology, topology.objects.countries)
		const g = svgCountriesRef.value
		if (!g) {
			console.error('[ERROR][NetworkSection] Countries SVG group not found')
			return
		}

		;(countries.features as Array<{
			type: string;
			properties: Record<string, unknown>;
			geometry: unknown
		}>).forEach((f) => {
			const d = path(f)
			if (!d) return
			const el = document.createElementNS(SVG_NS, 'path')
			el.setAttribute('d', d)
			g.appendChild(el)
		})

		drawLinksAndNodes()
	})
</script>