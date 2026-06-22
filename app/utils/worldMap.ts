	import topologyData from 'world-atlas/countries-110m.json'

	type TopoPoint = [number, number]

	interface TopoArc extends Array<TopoPoint> {}

	interface TopoGeometry {
		type: 'Polygon' | 'MultiPolygon' | string
		arcs: number[][][] | number[][]
	}

	interface TopoObject {
		type: string
		geometries: TopoGeometry[]
	}

	interface Topology {
		type: string
		arcs: TopoArc[]
		transform?: { scale: [number, number], translate: [number, number] }
		objects: { countries: TopoObject }
	}

	const topology = topologyData as unknown as Topology

	export interface WorldMapOptions {
		width?: number
		height?: number
		fillColor?: string
		strokeColor?: string
		strokeWidth?: number
		backgroundColor?: string
	}

	export interface WorldMapResult {
		canvas: HTMLCanvasElement
		status: 'loaded' | 'fallback'
	}

	function ll2xy(lon: number, lat: number, width: number, height: number): [number, number] {
		return [
			((lon + 180) / 360) * width,
			((90 - lat) / 180) * height,
		]
	}

	function decodeArc(
		arcIndex: number,
		arcs: TopoArc[],
		scale: [number, number],
		translate: [number, number],
	): TopoPoint[] {
		const reversed = arcIndex < 0
		const idx = reversed ? ~arcIndex : arcIndex
		const arc = arcs[idx]
		if (!arc) {
			return []
		}

		const points: TopoPoint[] = []
		let x = 0
		let y = 0
		for (const [dx, dy] of arc) {
			x += dx
			y += dy
			points.push([
				x * scale[0] + translate[0],
				y * scale[1] + translate[1],
			])
		}

		return reversed ? points.reverse() : points
	}

	function decodeRing(
		ring: number[],
		arcs: TopoArc[],
		scale: [number, number],
		translate: [number, number],
	): TopoPoint[] {
		const points: TopoPoint[] = []
		for (const arcIndex of ring) {
			const decoded = decodeArc(arcIndex, arcs, scale, translate)
			if (decoded.length > 1) {
				points.push(...decoded.slice(0, -1))
			}
		}
		return points
	}

	function strokePath(
		ctx: CanvasRenderingContext2D,
		points: TopoPoint[],
		width: number,
		height: number,
	): void {
		if (points.length < 2) {
			return
		}

		const [sx, sy] = ll2xy(points[0][0], points[0][1], width, height)
		ctx.moveTo(sx, sy)
		let prevLon = points[0][0]

		for (let i = 1; i < points.length; i++) {
			const [lon, lat] = points[i]
			const [x, y] = ll2xy(lon, lat, width, height)

			// скачок через антимеридиан (180/-180) — не рисуем линию через весь canvas,
			// а начинаем путь заново
			if (Math.abs(lon - prevLon) > 180) {
				ctx.moveTo(x, y)
			}
			else {
				ctx.lineTo(x, y)
			}

			prevLon = lon
		}
	}

	function drawFallback(
		ctx: CanvasRenderingContext2D,
		width: number,
		height: number,
		fillColor: string,
		strokeColor: string,
	): void {
		const blobs = [
			[100, 130, 260, 200],
			[430, 80, 280, 280],
			[680, 60, 380, 280],
			[700, 280, 160, 120],
		]
		ctx.fillStyle = fillColor
		ctx.strokeStyle = strokeColor
		ctx.lineWidth = 1.5
		for (const [bx, by, bw, bh] of blobs) {
			const scaleX = width / 1024
			const scaleY = height / 512
			ctx.fillRect(bx * scaleX, by * scaleY, bw * scaleX, bh * scaleY)
			ctx.strokeRect(bx * scaleX, by * scaleY, bw * scaleX, bh * scaleY)
		}
	}

	export function buildWorldMapCanvas(options: WorldMapOptions = {}): WorldMapResult {
		const {
			width = 2048,
			height = 1024,
			fillColor = '#330808',
			strokeColor = '#ff1b1b',
			strokeWidth = 1.2,
			backgroundColor = '#050505',
		} = options

		const canvas = document.createElement('canvas')
		canvas.width = width
		canvas.height = height
		const ctx = canvas.getContext('2d')

		if (!ctx) {
			return { canvas, status: 'fallback' }
		}

		ctx.fillStyle = backgroundColor
		ctx.fillRect(0, 0, width, height)

		const arcs = topology.arcs ?? []
		const transform = topology.transform ?? { scale: [1, 1], translate: [0, 0] }
		const countries = topology.objects?.countries

		if (!countries?.geometries?.length) {
			drawFallback(ctx, width, height, fillColor, strokeColor)
			return { canvas, status: 'fallback' }
		}

		try {
			ctx.fillStyle = fillColor
			ctx.strokeStyle = strokeColor
			ctx.lineWidth = strokeWidth

			for (const geometry of countries.geometries) {
				const polys: number[][][] = geometry.type === 'Polygon'
					? [geometry.arcs as number[][]]
					: geometry.type === 'MultiPolygon'
						? (geometry.arcs as number[][][])
						: []

				ctx.beginPath()
				for (const poly of polys) {
					for (const ring of poly) {
						const points = decodeRing(ring, arcs, transform.scale, transform.translate)
						strokePath(ctx, points, width, height)
					}
					ctx.closePath()
				}
				ctx.fill()
				ctx.stroke()
			}

			return { canvas, status: 'loaded' }
		}
		catch (error) {
			drawFallback(ctx, width, height, fillColor, strokeColor)
			return { canvas, status: 'fallback' }
		}
	}
