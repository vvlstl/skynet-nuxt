<template>
  <section class="network-section">
    <h2 class="network-title">GLOBAL NETWORK</h2>
    <p class="network-subtitle">Сеть распределённых узлов работает 24/7.</p>
    <div class="world-map">
      <div class="node" style="left: 52%; top: 30%;">
        <span class="node-dot"></span>
        <span class="node-label">США</span>
      </div>
      <div class="node" style="left: 51%; top: 33%;">
        <span class="node-dot"></span>
        <span class="node-label">Германия</span>
      </div>
      <div class="node" style="left: 50%; top: 34%;">
        <span class="node-dot"></span>
        <span class="node-label">Нидерланды</span>
      </div>
      <div class="node" style="left: 55%; top: 38%;">
        <span class="node-dot"></span>
        <span class="node-label">Турция</span>
      </div>
      <div class="node" style="left: 75%; top: 40%;">
        <span class="node-dot"></span>
        <span class="node-label">Япония</span>
      </div>
      <div class="node" style="left: 72%; top: 55%;">
        <span class="node-dot"></span>
        <span class="node-label">Сингапур</span>
      </div>

      <svg class="connections" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line x1="52" y1="30" x2="51" y2="33" class="connection-line" />
        <line x1="51" y1="33" x2="50" y2="34" class="connection-line" />
        <line x1="50" y1="34" x2="55" y2="38" class="connection-line" />
        <line x1="52" y1="30" x2="75" y2="40" class="connection-line" />
        <line x1="75" y1="40" x2="72" y2="55" class="connection-line" />
        <line x1="51" y1="33" x2="72" y2="55" class="connection-line" />
        <line x1="55" y1="38" x2="75" y2="40" class="connection-line" />
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>