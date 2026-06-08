<template>
  <section class="features">
    <div class="features__grid">
      <div
        v-for="feature in features"
        :key="feature.title"
        class="features__card"
      >
        <div class="features__icon">{{ feature.icon }}</div>
        <h3 class="features__title">{{ feature.title }}</h3>
        <p class="features__description">{{ feature.description }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Feature {
  icon: string
  title: string
  description: string
}

defineProps<{
  features: Feature[]
}>()
</script>