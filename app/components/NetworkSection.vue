<template>
  <section class="network">
    <h2 class="network__title">GLOBAL NETWORK</h2>
    <p class="network__subtitle">Distributed network nodes operating 24/7.</p>
    <div class="network__map">
      <div class="network__node" style="left: 52%; top: 30%;">
        <span class="network__node-dot"></span>
        <span class="network__node-label">USA</span>
      </div>
      <div class="network__node" style="left: 51%; top: 33%;">
        <span class="network__node-dot"></span>
        <span class="network__node-label">Germany</span>
      </div>
      <div class="network__node" style="left: 50%; top: 34%;">
        <span class="network__node-dot"></span>
        <span class="network__node-label">Netherlands</span>
      </div>
      <div class="network__node" style="left: 55%; top: 38%;">
        <span class="network__node-dot"></span>
        <span class="network__node-label">Turkey</span>
      </div>
      <div class="network__node" style="left: 75%; top: 40%;">
        <span class="network__node-dot"></span>
        <span class="network__node-label">Japan</span>
      </div>
      <div class="network__node" style="left: 72%; top: 55%;">
        <span class="network__node-dot"></span>
        <span class="network__node-label">Сингапур</span>
      </div>

      <svg class="network__connections" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line x1="52" y1="30" x2="51" y2="33" class="network__connection-line" />
        <line x1="51" y1="33" x2="50" y2="34" class="network__connection-line" />
        <line x1="50" y1="34" x2="55" y2="38" class="network__connection-line" />
        <line x1="52" y1="30" x2="75" y2="40" class="network__connection-line" />
        <line x1="75" y1="40" x2="72" y2="55" class="network__connection-line" />
        <line x1="51" y1="33" x2="72" y2="55" class="network__connection-line" />
        <line x1="55" y1="38" x2="75" y2="40" class="network__connection-line" />
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>