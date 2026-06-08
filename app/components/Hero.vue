<template>
  <section class="hero">
    <div class="smoke"></div>
    <div class="scan-line"></div>

    <div class="logo-triangle">
      <h1 class="skynet-logo">SKYNET VPN</h1>
    </div>

    <div class="robot-container">
      <div class="robot">
        <div class="robot-face">
          <div class="robot-eyes">
            <div class="robot-eye"></div>
            <div class="robot-eye"></div>
          </div>
        </div>
        <div class="robot-body"></div>
      </div>
    </div>

    <div class="hero-content">
      <h2 class="hero-title">Полный контроль над сетью</h2>
      <p class="hero-subtitle">Защищённое подключение. Высокая скорость. Доступ к любым сервисам.</p>
      <div class="hero-buttons">
        <button class="hero-btn pulse" @click="scrollToPlan">
          АКТИВИРОВАТЬ ДОСТУП
        </button>
        <button class="hero-btn pulse" @click="scrollToTelegram">
          TELEGRAM BOT
        </button>
      </div>
    </div>

    <div class="status-bar">
      <div class="status-item">
        <span class="status-dot"></span>
        STATUS: ONLINE
      </div>
      <div class="status-item">
        NODES: 127
      </div>
      <div class="status-item">
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

<style scoped>
.hero {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--bg) 0%, #111 100%);
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 20% 50%, rgba(255, 27, 27, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(255, 27, 27, 0.05) 0%, transparent 50%);
  z-index: 1;
}

.scan-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--red-glow), transparent);
  animation: scan 3s linear infinite;
  z-index: 2;
}

@keyframes scan {
  0% { top: 0; }
  100% { top: 100%; }
}

.smoke {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="%23050505" fill-opacity="0.1" d="M0,192L48,186.7C96,181,192,171,288,165.3C384,160,480,160,576,170.7C672,181,768,203,864,213.3C960,224,1056,224,1152,208C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>');
  background-size: cover;
  opacity: 0.3;
  z-index: 1;
}

.logo-triangle {
  position: absolute;
  left: 10%;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;
}

.skynet-logo {
  font-family: 'Orbitron', sans-serif;
  font-size: 3rem;
  font-weight: 900;
  color: var(--red);
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 20px var(--red-glow);
  animation: glitch 3s infinite;
}

@keyframes glitch {
  0%, 100% { text-shadow: 0 0 20px var(--red-glow); }
  50% { text-shadow: -2px 0 var(--red-glow), 2px 0 var(--red-glow); }
}

.robot-container {
  position: absolute;
  right: 10%;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;
}

.robot {
  width: 300px;
  height: 400px;
  position: relative;
}

.robot-face {
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #333 0%, #555 100%);
  border-radius: 50%;
  border: 3px solid #666;
  box-shadow: 0 0 20px rgba(255, 27, 27, 0.3);
}

.robot-eyes {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  gap: 20px;
}

.robot-eye {
  width: 20px;
  height: 20px;
  background: var(--red);
  border-radius: 50%;
  box-shadow: 0 0 15px var(--red-glow);
  animation: blink 4s infinite;
}

@keyframes blink {
  0%, 90%, 100% { opacity: 1; }
  95% { opacity: 0.3; }
}

.robot-body {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 180px;
  height: 200px;
  background: linear-gradient(180deg, #444 0%, #222 100%);
  border-radius: 10px;
  border: 2px solid #666;
}

.hero-content {
  position: relative;
  z-index: 4;
  text-align: center;
  max-width: 800px;
}

.hero-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 4rem;
  font-weight: 900;
  margin-bottom: 1rem;
  color: var(--text);
  text-transform: uppercase;
  letter-spacing: 3px;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: var(--muted);
  margin-bottom: 2rem;
  letter-spacing: 1px;
}

.hero-buttons {
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-top: 3rem;
}

.hero-btn {
  padding: 1rem 2rem;
  font-family: 'Orbitron', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: 2px solid var(--red);
  background: transparent;
  color: var(--red);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.hero-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: var(--red);
  transition: left 0.3s ease;
  z-index: -1;
}

.hero-btn:hover {
  color: var(--bg);
}

.hero-btn:hover::before {
  left: 0;
}

.status-bar {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 2rem;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.9rem;
  color: var(--red);
  z-index: 4;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-dot {
  width: 10px;
  height: 10px;
  background: var(--red);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .skynet-logo {
    font-size: 2rem;
  }

  .robot {
    width: 200px;
    height: 300px;
  }

  .hero-buttons {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>