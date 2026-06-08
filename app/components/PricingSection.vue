<template>
  <section class="pricing-section" id="pricing-section">
    <h2 class="pricing-title">ТАРИФЫ</h2>
    <div class="pricing-grid">
      <div
        v-for="plan in plans"
        :key="plan.id"
        :class="[
          'pricing-card',
          { 'highlight': plan.highlight },
          { 'best-value': plan.bestValue }
        ]"
      >
        <h3 class="plan-name">{{ plan.name }}</h3>
        <div class="plan-price">{{ plan.price }}</div>
        <div class="plan-period">{{ plan.period }}</div>
        <button class="plan-btn" @click="onConnect(plan)">
          {{ plan.cta }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface PricingPlan {
  id: string
  name: string
  price: string
  period: string
  cta: string
  highlight?: boolean
  bestValue?: boolean
}

defineProps<{
  plans: PricingPlan[]
}>()

const emit = defineEmits<{
  connect: [plan: PricingPlan]
}>()

const onConnect = (plan: PricingPlan) => {
  emit('connect', plan)
}
</script>