import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'

vi.mock('d3', () => ({
  geoNaturalEarth1: vi.fn(() => {
    const proj = (coords: [number, number]) => [400, 200]
    proj.scale = vi.fn(() => proj)
    proj.translate = vi.fn(() => proj)
    return proj
  }),
  geoPath: vi.fn(() => {
    const pathFn = () => 'M0,0L10,10'
    return pathFn
  }),
}))

vi.mock('topojson-client', () => ({
  feature: vi.fn(() => ({
    type: 'FeatureCollection',
    features: [],
  })),
}))

const NetworkSection = (await import('~/components/sections/NetworkSection.vue')).default

describe('NetworkSection.vue', () => {
  const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
  const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          type: 'Topology',
          objects: { countries: { type: 'GeometryCollection', geometries: [] } },
          arcs: [],
        }),
      })
    ))
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    errorSpy.mockClear()
    logSpy.mockClear()
    warnSpy.mockClear()
  })

  it('renders root element with BEM class network', async () => {
    const wrapper = await mountSuspended(NetworkSection)
    expect(wrapper.classes()).toContain('network')
  })

  it('renders info panel with title and stats', async () => {
    const wrapper = await mountSuspended(NetworkSection)
    const html = wrapper.html()
    expect(html).toContain('Глобальная сеть')
    expect(html).toContain('ACTIVE NODES:')
    expect(html).toContain('127')
    expect(html).toContain('ONLINE:')
    expect(html).toContain('100%')
  })

  it('renders map area', async () => {
    const wrapper = await mountSuspended(NetworkSection)
    const html = wrapper.html()
    expect(html).toContain('network__map-area')
  })

  it('renders SVG with map elements', async () => {
    const wrapper = await mountSuspended(NetworkSection)
    const html = wrapper.html()
    expect(html).toContain('network__map-svg')
    expect(html).toContain('network-countries')
    expect(html).toContain('network-links')
    expect(html).toContain('network-nodes-layer')
  })

  it('logs mount on creation', async () => {
    await mountSuspended(NetworkSection)
    expect(logSpy.mock.calls.some(call => String(call[0]).includes('Mount'))).toBe(true)
  })
})
