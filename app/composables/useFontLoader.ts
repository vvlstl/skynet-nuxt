const loadedFonts = new Set<string>()
let preconnectAdded = false

export function useFontLoader() {
  function getGoogleFontsUrl(name: string, weights: number[]): string {
    const weightStr = weights.join(';')
    const fontName = name.replace(/\s+/g, '+')
    return `https://fonts.googleapis.com/css2?family=${fontName}:wght@${weightStr}&display=swap`
  }

  function loadGoogleFont(name: string, weights: number[] = [400, 700]): void {
    const fontKey = `${name}:${weights.join(',')}`

    if (loadedFonts.has(fontKey)) {
      console.log(`[FontLoader] Font already loaded: ${name}`)
      return
    }

    try {
      // Добавить preconnect один раз
      if (!preconnectAdded) {
        const preconnectLink = document.createElement('link')
        preconnectLink.rel = 'preconnect'
        preconnectLink.href = 'https://fonts.googleapis.com'
        document.head.appendChild(preconnectLink)

        const preloadLink = document.createElement('link')
        preloadLink.rel = 'preconnect'
        preloadLink.href = 'https://fonts.gstatic.com'
        preloadLink.crossOrigin = 'anonymous'
        document.head.appendChild(preloadLink)

        preconnectAdded = true
        console.log('[FontLoader] Preconnect links added')
      }

      // Загрузить шрифт
      const url = getGoogleFontsUrl(name, weights)
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = url
      document.head.appendChild(link)

      loadedFonts.add(fontKey)
      console.log(`[FontLoader] Loading font: ${name} (weights: ${weights.join(', ')})`)
    } catch (error) {
      console.error(`[FontLoader] Error loading font ${name}:`, error)
    }
  }

  return { loadGoogleFont, getGoogleFontsUrl }
}
