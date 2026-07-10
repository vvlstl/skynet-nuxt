const loadedFonts = new Set<string>()

// Резолв всех .woff2 из app/assets/fonts/variants/ на этапе сборки.
// Vite заменяет каждый URL на корректный продакшен-путь (с хэшем),
// что позволяет динамически подгружать шрифты в рантайме.
const fontModules = import.meta.glob(
    '~/assets/fonts/variants/**/*.woff2',
    {
        eager: true,
        query: '?url',
        import: 'default',
    },
) as Record<string, string>

// Карта: lowercase(family) → массив файлов из всех поддиректорий variants/.
type FontFile = {
    family: string
    weight: number
    style: string
    filePath: string
    url: string
}

const fontFamilyMap = new Map<string, FontFile[]>()

function buildFontIndex() {
    fontFamilyMap.clear()

    for (const [filePath, url] of Object.entries(fontModules)) {
        const fileName = filePath.split('/').pop() || ''
        const parsed = parseFontFileName(fileName)
        if (!parsed) continue

        const familyKey = parsed.family.toLowerCase()
        let bucket = fontFamilyMap.get(familyKey)
        if (!bucket) {
            bucket = []
            fontFamilyMap.set(familyKey, bucket)
        }

        bucket.push({
            family: parsed.family,
            weight: parsed.weight,
            style: parsed.style,
            filePath,
            url,
        })
    }
}

// Парсит имя файла шрифта в формате `<Family>-<WeightName>.woff2`.
// Поддерживаемые weight-имена соответствуют CSS-конвенции.
const WEIGHT_NAMES: Record<string, number> = {
    thin: 100,
    hairline: 100,
    blond: 100,
    extralight: 200,
    ultralight: 200,
    light: 300,
    regular: 400,
    normal: 400,
    book: 400,
    medium: 500,
    semibold: 600,
    demibold: 600,
    bold: 700,
    extrabold: 800,
    ultrabold: 800,
    black: 900,
    heavy: 900,
}

function parseFontFileName(
    fileName: string,
): { family: string; weight: number; style: string } | null {
    const baseName = fileName.replace(/\.woff2$/i, '')

    // Сначала проверяем italic-суффикс: `<Family>-<WeightName>Italic`.
    const italicMatch = baseName.match(/^(.+?)-([A-Za-z]+)Italic$/i)
    if (italicMatch && italicMatch[1] && italicMatch[2]) {
        const weight = WEIGHT_NAMES[italicMatch[2].toLowerCase()]
        if (weight !== undefined) {
            return {
                family: italicMatch[1],
                weight,
                style: 'italic',
            }
        }
    }

    // Обычный формат: `<Family>-<WeightName>`.
    const parts = baseName.split('-')
    if (parts.length < 2) {
        // Без явного веса — считаем Regular (400).
        return {family: baseName, weight: 400, style: 'normal'}
    }

    const weightName = (parts[parts.length - 1] || '').toLowerCase()
    const weight = WEIGHT_NAMES[weightName]
    if (weight === undefined) {
        // Не распознали weight — весь baseName это family, вес 400.
        return {family: baseName, weight: 400, style: 'normal'}
    }

    const family = parts.slice(0, -1).join('-') || baseName
    return {family, weight, style: 'normal'}
}

function ensureIndex() {
    if (fontFamilyMap.size === 0 && Object.keys(fontModules).length > 0) {
        buildFontIndex()
    }
}

function injectFontFace(file: FontFile) {
    const id = `font-face-${file.family.toLowerCase()}-${file.weight}-${file.style}`
    if (document.getElementById(id)) return

    const style = document.createElement('style')
    style.id = id
    const family = file.family.replace(/'/g, "\\'")
    style.textContent = `
@font-face {
  font-family: '${family}';
  font-style: ${file.style};
  font-weight: ${file.weight};
  font-display: swap;
  src: url('${file.url}') format('woff2');
}`.trim()

    document.head.appendChild(style)
}

export function useFontLoader() {
    function loadFont(name: string, weights: number[] = [400, 700]): void {
        if (typeof document === 'undefined') return

        ensureIndex()

        const familyKey = name.toLowerCase()
        const fontKey = `${familyKey}:${weights.join(',')}`

        if (loadedFonts.has(fontKey)) {
            return
        }

        const files = fontFamilyMap.get(familyKey)
        if (!files || files.length === 0) {
            console.error(
                `[FontLoader] Family not found in app/assets/fonts/variants/:`,
                name,
            )
            console.error(
                '[FontLoader] Available families:',
                Array.from(fontFamilyMap.keys()),
            )
            return
        }

        try {
            let injectedCount = 0
            for (const targetWeight of weights) {
                // Точное совпадение по весу, иначе ближайший доступный.
                const exact = files.find((f) => f.weight === targetWeight)
                const fallback =
                    files
                        .slice()
                        .sort((a, b) => Math.abs(a.weight - targetWeight) - Math.abs(b.weight - targetWeight))[0]

                const file = exact || fallback
                if (!file) continue

                injectFontFace(file)
                injectedCount++
            }

            if (injectedCount === 0) {
                console.error('[FontLoader] No matching weights for:', name, weights)
                return
            }

            loadedFonts.add(fontKey)
        } catch (error) {
            console.error(`[FontLoader] Error loading font ${name}:`, error)
        }
    }

    function listAvailableFamilies(): string[] {
        ensureIndex()
        return Array.from(fontFamilyMap.keys()).sort()
    }

    return {loadFont, listAvailableFamilies}
}
