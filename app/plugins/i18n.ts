export default defineNuxtPlugin(() => {
  if (process.client) {
    const savedLang = localStorage.getItem('i18n-language') as 'en' | 'ru' | null
    const lang = (savedLang && (savedLang === 'en' || savedLang === 'ru')) ? savedLang : 'en'

    document.documentElement.lang = lang
    console.log(`[i18n:plugin] Initialized language: ${lang}`)
  }
})
