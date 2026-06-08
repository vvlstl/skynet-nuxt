import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'
import { readFileSync } from 'node:fs'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/icon',
    // '@nuxt/fonts', // disabled: fontsource.org timeout in RU network
    '@nuxt/hints',
    '@nuxt/scripts',
    '@nuxt/test-utils'
  ],

  css: [
    '~/assets/css/style.less'
  ],

  alias: {
    '@': fileURLToPath(new URL('./', import.meta.url))
  },

  vite: {
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          globalVars: {
            imagePath: '"../../public/images/"',
            fontPath: '"../../public/fonts/"'
          }
        }
      }
    }
  }
})