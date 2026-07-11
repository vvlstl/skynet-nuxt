<script setup lang="ts">
	import DeviceCard from "~/components/sections/devices/DeviceCard.vue";
	import type {TDeviceCard} from "~/types/device/TDeviceCard";
	import SectionHead from "~/components/common/SectionHead.vue";

	const items = computed((): TDeviceCard[] => {
		return [
			{
				title: "Windows",
				icon: "hugeicons:windows-old",
			},
			{
				title: "Android",
				icon: "hugeicons:android",
			},
			{
				title: "iOS",
				icon: "hugeicons:apple",
			},
			{
				title: "MacOS",
				icon: "hugeicons:apple-finder",
			},
			{
				title: "Linux",
				icon: "proicons:linux",
			}
		];
	});
</script>

<template>
	<div class="devices">
		<div class="content-container">
			<div class="devices__content">
				<SectionHead title="SUPPORT FOR ALL DEVICES"/>
				<div class="devices__list custom-scrollbar custom-scrollbar--hidden">
					<DeviceCard
						class="devices__item"
						v-for="(item, index) in items"
						:key="index"
						:item="item"
					/>
				</div>
			</div>
		</div>
	</div>
</template>