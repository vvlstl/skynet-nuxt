import { describe, expect, it } from 'vitest'
import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'

const APP_VUE = readFileSync(
	resolve(process.cwd(), 'app/app.vue'),
	'utf8',
)

describe('app.vue: font preload в useHead', () => {
	it('содержит useHead с font preload для Bender-Bold', () => {
		expect(APP_VUE).toMatch(/rel:\s*['"]preload['"]/)
		expect(APP_VUE).toMatch(/Bender-Bold\.woff2/)
		expect(APP_VUE).toMatch(/as:\s*['"]font['"]/)
		expect(APP_VUE).toMatch(/type:\s*['"]font\/woff2['"]/)
		expect(APP_VUE).toMatch(/crossorigin:\s*['"]anonymous['"]/)
	})

	it('содержит preload для Bender-Black, Bender-Light, Bender-Regular и ShareTechMono-Regular.woff2', () => {
		expect(APP_VUE).toMatch(/Bender-Black\.woff2/)
		expect(APP_VUE).toMatch(/Bender-Light\.woff2/)
		expect(APP_VUE).toMatch(/Bender-Regular\.woff2/)
		expect(APP_VUE).toMatch(/ShareTechMono-Regular\.woff2/)
	})

	it('font preload включается в link-массив useHead', () => {
		expect(APP_VUE).toMatch(/link:\s*\[\.\.\.\(i18nHead\.value\.link\s*\?\?\s*\[\]\),\s*\.\.\.fontPreloads\.value\]/)
	})
})