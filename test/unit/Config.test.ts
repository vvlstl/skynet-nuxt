import { describe, expect, it } from 'vitest'
import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'

const CONFIG_SOURCE = readFileSync(
	resolve(process.cwd(), 'nuxt.config.ts'),
	'utf8',
)

describe('nuxt.config.ts: Nitro production optimizations', () => {
	it('nitro preset остаётся static (GitHub Pages)', () => {
		expect(CONFIG_SOURCE).toMatch(/nitro:\s*\{[^}]*preset:\s*['"]static['"]/s)
	})

	it('compressPublicAssets включает gzip и brotli', () => {
		expect(CONFIG_SOURCE).toMatch(/compressPublicAssets:\s*\{/s)
		expect(CONFIG_SOURCE).toMatch(/gzip:\s*true/s)
		expect(CONFIG_SOURCE).toMatch(/brotli:\s*true/s)
	})

	it('routeRules кэширует /_nuxt/** как immutable', () => {
		expect(CONFIG_SOURCE).toMatch(/['"]\/_nuxt\/\*\*['"]\s*:\s*\{/s)
		expect(CONFIG_SOURCE).toMatch(/Cache-Control['"]?\s*:\s*['"]public,\s*max-age=31536000,\s*immutable['"]/s)
	})

	it('routeRules кэширует /fonts/** (шрифты в public/fonts)', () => {
		expect(CONFIG_SOURCE).toMatch(/['"]\/fonts\/\*\*['"]\s*:\s*\{/s)
	})

	it('nitro.minify включён (сжатие HTML)', () => {
		expect(CONFIG_SOURCE).toMatch(/minify:\s*true/)
	})

	it('inlineStyles отключён (CSS в отдельном файле)', () => {
		expect(CONFIG_SOURCE).toMatch(/inlineStyles:\s*false/)
	})

	it('fontPath в vite.less.globalVars указывает на public/fonts', () => {
		expect(CONFIG_SOURCE).toMatch(/fontPath:\s*['"]\/skynet-nuxt\/fonts\/['"]/)
	})
})