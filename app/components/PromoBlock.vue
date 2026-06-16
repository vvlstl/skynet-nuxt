<template>
  <section class="promo-block">
    <div class="promo-block__smoke"></div>
    <div class="promo-block__scan-line"></div>

    <div class="promo-block__logo-triangle">
      <h1 class="promo-block__logo">SKYNET VPN</h1>
    </div>

    <div class="promo-block__robot-container">

    </div>

    <div class="promo-block__content">
      <h2 class="promo-block__title">Full Network Control</h2>
      <p class="promo-block__subtitle">Secure connection. High speed. Access to any services.</p>
      <div class="promo-block__buttons">
        <button class="promo-block__btn pulse" @click="scrollToPlan">
          ACTIVATE ACCESS
        </button>
        <button class="promo-block__btn pulse" @click="scrollToTelegram">
          TELEGRAM BOT
        </button>
      </div>
    </div>

    <div class="promo-block__status-bar">
      <div class="promo-block__status-item">
        <span class="promo-block__status-dot"></span>
        STATUS: ONLINE
      </div>
      <div class="promo-block__status-item">
        NODES: 127
      </div>
      <div class="promo-block__status-item">
        LATENCY: 18ms
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const scrollToPlan = () => {
  document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' })
}

const scrollToTelegram = () => {
  document.getElementById('telegram-section')?.scrollIntoView({ behavior: 'smooth' })
}
</script>