<template>
	<a
		class="link"
		:class="{
			[`link--${theme}`]: theme,
		}"
		@mouseenter="handleMouseEnter"
		@mouseleave="handleMouseLeave"
	>
		<span class="link__text" :data-label="label">
			{{ text }}
		</span>
	</a>
</template>

<script setup lang="ts">
	const chars = 'X#%&01░▒';

	const props = defineProps<{
		label: string;
		theme?: string;
	}>();

	const text = ref(props.label);
	const isHovered = ref(false);
	let timer: ReturnType<typeof setInterval> | null = null;

	onMounted(() => {
		text.value = props.label;
	});

	const scrambleText = (value: string) => {
		if (timer) clearInterval(timer);

		let count = 0;
		timer = setInterval(() => {
			count++;
			if (count > 4) {
				text.value = value;
				clearInterval(timer!);
				return;
			}

			const arr = value.split('');
			const idx = Math.floor(Math.random() * arr.length);
			arr[idx] = chars[Math.floor(Math.random() * chars.length)];
			text.value = arr.join('');
		}, 60);
	};

	const handleMouseEnter = () => {
		scrambleText(props.label);
		isHovered.value = true;
	};

	const handleMouseLeave = () => {
		if (timer) clearInterval(timer);
		text.value = props.label;
		isHovered.value = false;
	};
</script>