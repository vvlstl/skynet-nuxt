<template>
  <section class="features-section">
    <div class="features-grid">
      <div
        v-for="feature in features"
        :key="feature.title"
        class="feature-card"
      >
        <div class="feature-icon">{{ feature.icon }}</div>
        <h3 class="feature-title">{{ feature.title }}</h3>
        <p class="feature-description">{{ feature.description }}</p>
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