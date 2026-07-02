import en from './en.yml?raw'
import ru from './ru.yml?raw'
import YAML from 'yaml'

const locales = {
  en: YAML.parse(en),
  ru: YAML.parse(ru),
} as const

export type LocaleKey = keyof typeof locales
export type LocaleData = typeof locales.en

export { locales }
export default locales
