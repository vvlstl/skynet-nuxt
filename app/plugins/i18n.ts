export default defineNuxtPlugin(() => {
  if (process.client) {
    const savedLang = localStorage.getItem('i18n-language') as 'en' | 'ru' | null
    document.documentElement.lang = (savedLang && (savedLang === 'en' || savedLang === 'ru')) ? savedLang : 'en'
  }
})
