<template>
  <section class="pricing" id="pricing-section">
    <h2 class="pricing__title">ТАРИФЫ</h2>
    <div class="pricing__grid">
      <div
        v-for="plan in plans"
        :key="plan.id"
        :class="[
          'pricing__card',
          { 'pricing__card--highlight': plan.highlight },
          { 'pricing__card--best-value': plan.bestValue }
        ]"
      >
        <h3 class="pricing__plan-name">{{ plan.name }}</h3>
        <div class="pricing__plan-price">{{ plan.price }}</div>
        <div class="pricing__plan-period">{{ plan.period }}</div>
        <button class="pricing__plan-btn" @click="onConnect(plan)">
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