import {fileURLToPath, URL} from 'node:url';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    sourcemap: {
        server: false,
        client: false
    },
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

    // Статический экспорт для GitHub Pages.
    // compressPublicAssets пред-сжимает статику gzip+brotli на этапе
    // `nuxt generate`. GitHub Pages отдаёт brotli только если файл
    // `.br` существует рядом с оригиналом и Accept-Encoding позволяет.
    // routeRules с Cache-Control на GH Pages не применяются (статический
    // хостинг игнорирует генерируемые заголовки), но остаются для future
    // self-hosted deploy и для локального preview.
    // minify сжимает HTML в .output/public — снимает ~20-30% размера:
    // лишние пробелы, переносы, комментарии.
    nitro: {
        preset: 'static',
        minify: true,
        compressPublicAssets: {
            gzip: true,
            brotli: true,
        },
        routeRules: {
            '/_nuxt/**': {
                headers: {
                    'Cache-Control': 'public, max-age=31536000, immutable',
                },
            },
            '/fonts/**': {
                headers: {
                    'Cache-Control': 'public, max-age=31536000, immutable',
                },
            },
        },
    },

    features: {
        // Отключаем инлайн SSR-стилей: Nuxt 4 по умолчанию встраивает
        // критический CSS в HTML, что раздувает index.html (audit 134 KB).
        // На GitHub Pages HTTP/2 внешний CSS-файл выгоднее — кэшируется
        // отдельно и не дублируется на каждой prerendered странице.
        inlineStyles: false,
    },

    modules: [
        '@nuxt/eslint',
        '@nuxt/image',
        '@nuxt/icon',
        '@nuxt/hints',
        '@nuxt/scripts',
        '@nuxt/test-utils',
        '@nuxtjs/i18n'
    ],

    i18n: {
        locales: [
            {
                code: 'en',
                language: 'en-US',
                file: 'en.yml',
                name: 'English'
            },
            {
                code: 'ru',
                language: 'ru-RU',
                file: 'ru.yml',
                name: 'Русский'
            }
        ],
        lazy: true,
        langDir: 'locales/',
        defaultLocale: 'ru'
    },

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
        sourcemap: false,

        css: {
            preprocessorOptions: {
                less: {
                    javascriptEnabled: true,
                    globalVars: {
                        imagePath: '~/assets/images/',
                        fontPath: '/skynet-nuxt/fonts/'
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