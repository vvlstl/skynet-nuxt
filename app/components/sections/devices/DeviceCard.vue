<template>
	<div class="device-card">
		<div class="device-card__icon">
			<Icon :name="item.icon"/>
		</div>
		<div class="device-card__title" v-html="item.title"/>
	</div>
</template>

<script setup lang="ts">
	import type {TDeviceCard} from "~/types/device/TDeviceCard";

	type TComponentProps = {
		item: TDeviceCard;
	}
	defineProps<TComponentProps>()
</script>