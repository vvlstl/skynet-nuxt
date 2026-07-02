<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useFontLoader } from '~/composables/useFontLoader'

const { loadGoogleFont } = useFontLoader()

interface FontOption {
  label: string
  value: string
  weights: number[]
}

const headingFonts: FontOption[] = [
  { label: 'Orbitron', value: 'Orbitron', weights: [700, 900] },
  { label: 'Jura', value: 'Jura', weights: [400, 700] },
  { label: 'Exo 2', value: 'Exo 2', weights: [400, 700] },
  { label: 'Tektur', value: 'Tektur', weights: [400, 700] },
  { label: 'Unbounded', value: 'Unbounded', weights: [400, 700] },
  { label: 'Zector', value: 'Zector', weights: [400, 700] },
]

const bodyFonts: FontOption[] = [
  { label: 'Rajdhani', value: 'Rajdhani', weights: [400] },
  { label: 'Bender', value: 'Bender', weights: [400] },
  { label: 'Oswald', value: 'Oswald', weights: [400] },
  { label: 'New Computer Modern', value: 'New Computer Modern', weights: [400] },
]

const isOpen = ref(false)
const selectedHeading = ref('Orbitron')
const selectedBody = ref('Rajdhani')
const defaultHeading = ref('Orbitron')
const defaultBody = ref('Rajdhani')

const storageKey = 'font-switcher-selection'

onMounted(() => {
  console.log('[FontSwitcher] Mounted')

  // Загрузить из localStorage
  const stored = localStorage.getItem(storageKey)
  if (stored) {
    try {
      const { heading, body } = JSON.parse(stored)
      selectedHeading.value = heading
      selectedBody.value = body
      applyFonts(heading, body)
      console.log('[FontSwitcher] Restored from localStorage:', { heading, body })
    } catch (e) {
      console.error('[FontSwitcher] Error parsing localStorage:', e)
    }
  }
})

function applyFonts(heading: string, body: string) {
  const root = document.documentElement
  root.style.setProperty('--font-heading', `'${heading}', sans-serif`)
  root.style.setProperty('--font-body', `'${body}', Arial, sans-serif, -apple-system`)

  // Загрузить шрифты из Google Fonts
  const headingFont = headingFonts.find(f => f.value === heading)
  const bodyFont = bodyFonts.find(f => f.value === body)

  if (headingFont) {
    loadGoogleFont(headingFont.value, headingFont.weights)
  }
  if (bodyFont) {
    loadGoogleFont(bodyFont.value, bodyFont.weights)
  }

  // Сохранить в localStorage
  localStorage.setItem(storageKey, JSON.stringify({ heading, body }))
  console.log('[FontSwitcher] Applied fonts:', { heading, body })
}

function onHeadingChange(value: string) {
  selectedHeading.value = value
  applyFonts(value, selectedBody.value)
  console.log('[FontSwitcher] Changing heading font to:', value)
}

function onBodyChange(value: string) {
  selectedBody.value = value
  applyFonts(selectedHeading.value, value)
  console.log('[FontSwitcher] Changing body font to:', value)
}

function resetFonts() {
  selectedHeading.value = defaultHeading.value
  selectedBody.value = defaultBody.value
  applyFonts(defaultHeading.value, defaultBody.value)
  console.log('[FontSwitcher] Reset to default fonts')
}
</script>

<template>
  <div class="font-switcher">
    <button
      class="font-switcher__toggle"
      @click="isOpen = !isOpen"
      :title="isOpen ? 'Close font switcher' : 'Open font switcher'"
    >
      🅐
    </button>

    <Transition name="font-switcher-panel">
      <div v-if="isOpen" class="font-switcher__panel">
        <div class="font-switcher__header">
          <h3 class="font-switcher__title">Font Switcher</h3>
          <button
            class="font-switcher__close"
            @click="isOpen = false"
          >
            ✕
          </button>
        </div>

        <div class="font-switcher__content">
          <div class="font-switcher__group">
            <label class="font-switcher__label">Heading Font</label>
            <select
              class="font-switcher__select"
              :value="selectedHeading"
              @change="onHeadingChange(($event.target as HTMLSelectElement).value)"
            >
              <option v-for="font in headingFonts" :key="font.value" :value="font.value">
                {{ font.label }}
              </option>
            </select>
          </div>

          <div class="font-switcher__group">
            <label class="font-switcher__label">Body Font</label>
            <select
              class="font-switcher__select"
              :value="selectedBody"
              @change="onBodyChange(($event.target as HTMLSelectElement).value)"
            >
              <option v-for="font in bodyFonts" :key="font.value" :value="font.value">
                {{ font.label }}
              </option>
            </select>
          </div>

          <button
            class="font-switcher__reset"
            @click="resetFonts"
          >
            Reset
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="less">
@import '~/assets/css/_var';

.font-switcher {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
  font-family: @font;

  @media @mediaMobile {
    bottom: 1rem;
    right: 1rem;
  }
}

.font-switcher__toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: @cWhite;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
}

.font-switcher__panel {
  position: absolute;
  bottom: calc(100% + 1rem);
  right: 0;
  width: 280px;
  background: rgba(5, 5, 5, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 0.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  padding: 1.5rem;
  color: @cWhite;
}

.font-switcher__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.font-switcher__title {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: @cWhite;
}

.font-switcher__close {
  background: none;
  border: none;
  color: @cGray500;
  cursor: pointer;
  font-size: 1rem;
  transition: color 0.2s ease;

  &:hover {
    color: @cWhite;
  }
}

.font-switcher__content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.font-switcher__group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.font-switcher__label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: @cGray500;
  font-weight: 500;
}

.font-switcher__select {
  padding: 0.5rem 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.25rem;
  color: @cWhite;
  font-size: 0.875rem;
  font-family: @font;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
  }

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
  }

  option {
    background: @cBlack900;
    color: @cWhite;
  }
}

.font-switcher__reset {
  padding: 0.75rem 1rem;
  margin-top: 0.5rem;
  background: rgba(255, 27, 27, 0.1);
  border: 1px solid @cRed500;
  border-radius: 0.25rem;
  color: @cRed500;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 27, 27, 0.2);
    color: @cRedOrange;
    border-color: @cRedOrange;
  }

  &:active {
    opacity: 0.8;
  }
}

.font-switcher-panel-enter-active,
.font-switcher-panel-leave-active {
  transition: all 0.2s ease;
}

.font-switcher-panel-enter-from,
.font-switcher-panel-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
