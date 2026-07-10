import { ref, watch, computed } from 'vue'
import { locales, type LocaleKey, type LocaleData } from '~/locales'

const currentLang = ref<LocaleKey>('en')
const localeData = ref<LocaleData>(locales.en)

const STORAGE_KEY = 'i18n-language'

function getNestedValue(obj: any, path: string): string {
  const keys = path.split('.')
  let value = obj
  for (const key of keys) {
    value = value?.[key]
    if (!value) return path
  }
  return value || path
}

export function useI18n() {
  function switchLang(lang: LocaleKey): void {
    if (lang !== currentLang.value) {
      currentLang.value = lang
      localeData.value = locales[lang]
      if (process.client) {
        localStorage.setItem(STORAGE_KEY, lang)
      }
    }
  }

  function t(key: string, params?: Record<string, any>): string {
    let text = getNestedValue(localeData.value, key)

    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        text = text.replace(`{${paramKey}}`, String(paramValue))
      })
    }

    return text
  }

  // На монтировании: загрузить язык из localStorage
  if (process.client && !currentLang.value) {
    const savedLang = localStorage.getItem(STORAGE_KEY) as LocaleKey | null
    if (savedLang && (savedLang === 'en' || savedLang === 'ru')) {
      switchLang(savedLang)
    }
  }

  return {
    currentLang: computed(() => currentLang.value),
    switchLang,
    t,
  }
}
