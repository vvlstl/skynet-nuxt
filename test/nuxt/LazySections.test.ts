import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

// Проверяем, что ниже-fold секции обёрнуты в defineAsyncComponent и разбиты
// на отдельные чанки через `import('../sections/...')`. PromoBlock (LCP-критичная)
// остаётся статическим импортом.
const INDEX_SOURCE = readFileSync(
  resolve(process.cwd(), 'app/pages/index.vue'),
  'utf8',
)

describe('index.vue: ленивая загрузка секций', () => {
  it('PromoBlock импортируется статически (LCP-критичная)', () => {
    expect(INDEX_SOURCE).toMatch(
      /import\s+PromoBlock\s+from\s+["']~?\/components\/sections\/promo-block\/PromoBlock\.vue["']/,
    )
    expect(INDEX_SOURCE).not.toMatch(
      /defineAsyncComponent\([^)]*PromoBlock/,
    )
  })

  it('Devices обёрнут в defineAsyncComponent', () => {
    expect(INDEX_SOURCE).toMatch(
      /const\s+Devices\s*=\s*defineAsyncComponent\(\(\)\s*=>\s*import\(\s*['"]~?\/components\/sections\/devices\/Devices\.vue['"]\s*\)\s*\)/,
    )
  })

  it('NetworkSection остаётся обёрнутым в defineAsyncComponent', () => {
    expect(INDEX_SOURCE).toMatch(
      /const\s+NetworkSection\s*=\s*defineAsyncComponent\(\(\)\s*=>\s*import\(\s*['"]~?\/components\/sections\/NetworkSection\.vue['"]\s*\)\s*\)/,
    )
  })

  it('PricingSection обёрнут в defineAsyncComponent', () => {
    expect(INDEX_SOURCE).toMatch(
      /const\s+PricingSection\s*=\s*defineAsyncComponent\(\(\)\s*=>\s*import\(\s*['"]~?\/components\/sections\/pricing\/PricingSection\.vue['"]\s*\)\s*\)/,
    )
  })

  it('HowItWorks обёрнут в defineAsyncComponent', () => {
    expect(INDEX_SOURCE).toMatch(
      /const\s+HowItWorks\s*=\s*defineAsyncComponent\(\(\)\s*=>\s*import\(\s*['"]~?\/components\/sections\/how-it-works\/HowItWorks\.vue['"]\s*\)\s*\)/,
    )
  })

  it('отсутствуют прямые статические импорты ниже-fold секций', () => {
    const staticImportPattern =
      /^import\s+(Devices|PricingSection|HowItWorks)\s+from\s+['"]/m
    expect(staticImportPattern.test(INDEX_SOURCE)).toBe(false)
  })
})