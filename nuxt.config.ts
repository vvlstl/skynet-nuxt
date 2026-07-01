import {fileURLToPath, URL} from 'node:url';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {
        enabled: true,

        timeline: {
            enabled: true
        }
    },

    // Базовый URL для GitHub Pages: https://vvlstl.github.io/skynet-nuxt/
    // Влияет только на production-сборку, dev-сервер запускается как обычно.
    app: {
        baseURL: '/skynet-nuxt/'
    },

    // Статический экспорт для GitHub Pages
    nitro: {
        preset: 'static'
    },

    modules: [
        '@nuxt/eslint',
        '@nuxt/image',
        '@nuxt/icon',
        '@nuxt/hints',
        '@nuxt/scripts',
        '@nuxt/test-utils'
    ],

    hints: {
        features: {
            lazyLoad: false
        }
    },

    postcss: {
        plugins: {
            autoprefixer: {},
        },
    },

    css: [
        '~/assets/css/style.less'
    ],

    alias: {
        '@': fileURLToPath(new URL('./', import.meta.url))
    },

    icon: {
        // localApiEndpoint оставляем дефолтным (true) — иконки идут через
        // собственный server route Nuxt с кэшированием, а не напрямую из браузера
        serverBundle: {
            // зашиваем коллекцию в сборку — нет сетевых запросов вообще,
            // ни в dev, ни в проде
            collections: ['hugeicons', 'proicons']
        }
    },

    vite: {
        css: {
            preprocessorOptions: {
                less: {
                    javascriptEnabled: true,
                    globalVars: {
                        imagePath: '~/assets/images/',
                        fontPath: '~/assets/fonts/'
                    }
                }
            }
        },
        build: {
            rollupOptions: {
                output: {
                    manualChunks: (id: string) => {
                        if (id.includes('gsap')) {
                            return 'vendor-gsap'
                        }

                        if (id.includes('three')) {
                            return 'vendor-three'
                        }

                        if (id.includes('d3') || id.includes('topojson-client') || id.includes('world-atlas')) {
                            return 'vendor-d3'
                        }
                    }
                },
            },
        },
    }
})