<template>
	<svg class="globe-svg" viewBox="0 0 200 200">
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
			<circle cx="100" cy="100" r="90" fill="none" stroke="#ff1b1b" stroke-width="0.6"
			        opacity="0.6"/>

			<ellipse cx="100" cy="100" rx="90" ry="23.3" fill="none" stroke="#ff1b1b"
			         stroke-width="0.4" opacity="0.36"/>
			<ellipse cx="100" cy="100" rx="90" ry="45.0" fill="none" stroke="#ff1b1b"
			         stroke-width="0.4" opacity="0.42"/>
			<ellipse cx="100" cy="100" rx="90" ry="63.6" fill="none" stroke="#ff1b1b"
			         stroke-width="0.4" opacity="0.48"/>
			<ellipse cx="100" cy="100" rx="90" ry="77.9" fill="none" stroke="#ff1b1b"
			         stroke-width="0.4" opacity="0.52"/>
			<ellipse cx="100" cy="100" rx="90" ry="86.9" fill="none" stroke="#ff1b1b"
			         stroke-width="0.4" opacity="0.54"/>

			<ellipse cx="100" cy="100" rx="23.3" ry="90" data-meridian style="animation-delay:0s"
			         fill="none" stroke="#ff1b1b" stroke-width="0.4" opacity="0.36"/>
			<ellipse cx="100" cy="100" rx="45.0" ry="90" data-meridian style="animation-delay:-1.2s"
			         fill="none" stroke="#ff1b1b" stroke-width="0.4" opacity="0.42"/>
			<ellipse cx="100" cy="100" rx="63.6" ry="90" data-meridian style="animation-delay:-2.4s"
			         fill="none" stroke="#ff1b1b" stroke-width="0.4" opacity="0.48"/>
			<ellipse cx="100" cy="100" rx="77.9" ry="90" data-meridian style="animation-delay:-3.6s"
			         fill="none" stroke="#ff1b1b" stroke-width="0.4" opacity="0.52"/>
			<ellipse cx="100" cy="100" rx="86.9" ry="90" data-meridian style="animation-delay:-4.8s"
			         fill="none" stroke="#ff1b1b" stroke-width="0.4" opacity="0.54"/>
		</g>
	</svg>
</template>

<script setup lang="ts">

</script>
