<template>
	<div class="node-info">
		<div class="node-info__row">
			<div class="node-info__icon">
				<Icon name="hugeicons:arrow-right-01"/>
			</div>
			<div class="node-info__value">
				STATUS: ONLINE
			</div>
		</div>
		<div class="node-info__row">
			<div class="node-info__icon">
				<Icon name="hugeicons:arrow-right-01"/>
			</div>
			<div class="node-info__value">
				PROTOCOL: VLESS
			</div>
		</div>
		<div class="node-info__row">
			<div class="node-info__icon">
				<Icon name="hugeicons:arrow-right-01"/>
			</div>
			<div class="node-info__value">
				LATENCY: 157ms
			</div>
		</div>
		<div class="node-info__row">
			<div class="node-info__icon">
				<Icon name="hugeicons:arrow-right-01"/>
			</div>
			<div class="node-info__value">
				CHEBURNET_IMMUNITY: 100%
			</div>
		</div>
		<div class="node-info__logs">
			<div class="node-info__logs-header">
				SYSTEM_LOGS:
			</div>
			<ul class="node-info__logs-list">
				<li class="node-info__logs-item node-info__logs-item--ok">
					[OK] BYPASSING REGULATORY DPI...
				</li>
				<li class="node-info__logs-item node-info__logs-item--ok">
					[OK] ESTABLISHED SECURE TUNNEL TO GLOBAL_NET...
				</li>
				<li class="node-info__logs-item node-info__logs-item--alert">
					[ALERT] CHEBURNET_ATTACK: BLOCKED.
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">

</script>
