<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from '~/composables/useI18n'

const { currentLang, switchLang } = useI18n()

const isOpen = ref(false)

const languages = [
  { code: 'en' as const, label: 'English' },
  { code: 'ru' as const, label: 'Русский' },
]

onMounted(() => {
  console.log('[LanguageSwitcher] Mounted')
})

function handleLanguageChange(lang: 'en' | 'ru') {
  switchLang(lang)
  console.log(`[LanguageSwitcher] Changed language to: ${lang}`)
}
</script>

<template>
  <div class="language-switcher">
    <button
      class="language-switcher__toggle"
      @click="isOpen = !isOpen"
      :title="isOpen ? 'Close language switcher' : 'Open language switcher'"
    >
      🌐
    </button>

    <Transition name="language-switcher-panel">
      <div v-if="isOpen" class="language-switcher__panel">
        <div class="language-switcher__header">
          <h3 class="language-switcher__title">Language</h3>
          <button
            class="language-switcher__close"
            @click="isOpen = false"
          >
            ✕
          </button>
        </div>

        <div class="language-switcher__content">
          <div
            v-for="lang in languages"
            :key="lang.code"
            class="language-switcher__option"
          >
            <input
              type="radio"
              :id="`lang-${lang.code}`"
              :value="lang.code"
              :checked="currentLang === lang.code"
              @change="handleLanguageChange(lang.code)"
              class="language-switcher__radio"
            />
            <label
              :for="`lang-${lang.code}`"
              class="language-switcher__label"
            >
              {{ lang.label }}
            </label>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="less">
@import '~/assets/css/_var';

.language-switcher {
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  z-index: 1000;
  font-family: @font;

  @media @mediaMobile {
    bottom: 1rem;
    left: 1rem;
  }
}

.language-switcher__toggle {
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

.language-switcher__panel {
  position: absolute;
  bottom: calc(100% + 1rem);
  left: 0;
  width: 240px;
  background: rgba(5, 5, 5, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 0.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  padding: 1.5rem;
  color: @cWhite;
}

.language-switcher__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.language-switcher__title {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: @cWhite;
}

.language-switcher__close {
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

.language-switcher__content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.language-switcher__option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
}

.language-switcher__radio {
  appearance: none;
  -webkit-appearance: none;
  width: 1.25rem;
  height: 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.5);
  }

  &:checked {
    background: @cRedOrange;
    border-color: @cRedOrange;
    box-shadow: inset 0 0 0 3px rgba(5, 5, 5, 0.95);
  }
}

.language-switcher__label {
  font-size: 0.875rem;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: @cRedOrange;
  }
}

.language-switcher-panel-enter-active,
.language-switcher-panel-leave-active {
  transition: all 0.2s ease;
}

.language-switcher-panel-enter-from,
.language-switcher-panel-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
