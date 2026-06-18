	import * as THREE from 'three'
	import { useThreeScene } from '~/composables/useThreeScene'
	import type { ThreeSceneContext } from '~/composables/useThreeScene'
	import { buildWorldMapCanvas } from '~/utils/worldMap'

	const RADIUS = 1

	export interface GlobeCity {
		lat: number
		lon: number
		major?: boolean
	}

	export interface GlobeConnection {
		from: number
		to: number
	}

	export interface UseGlobeSceneOptions {
		cities?: GlobeCity[]
		connections?: GlobeConnection[]
		background?: THREE.ColorRepresentation | null
		fov?: number
		near?: number
		far?: number
		cameraZ?: number
		autoRotateSpeed?: number
	}

	export interface GlobeSceneContext {
		scene: THREE.Scene
		camera: THREE.PerspectiveCamera
		renderer: THREE.WebGLRenderer
		root: THREE.Group
		texture: THREE.CanvasTexture
		dispose: () => void
		resize: () => void
		start: () => void
		stop: () => void
	}

	const DEFAULT_CITIES: GlobeCity[] = [
		{ lat: 55.75, lon: 37.6, major: true },
		{ lat: 51.5, lon: -0.1, major: true },
		{ lat: 40.7, lon: -74, major: true },
		{ lat: 48.85, lon: 2.35 },
		{ lat: 35.6, lon: 139.7 },
		{ lat: 1.35, lon: 103.8 },
		{ lat: -33.9, lon: 151.2 },
		{ lat: 25.2, lon: 55.3 },
		{ lat: 59.9, lon: 30.3 },
		{ lat: 52.5, lon: 13.4 },
		{ lat: 41.9, lon: 12.5 },
		{ lat: 19.4, lon: -99.1 },
		{ lat: 22.3, lon: 114.2 },
		{ lat: 37.6, lon: 127 },
		{ lat: 34.05, lon: -118.2 },
		{ lat: 43.65, lon: -79.38 },
	]

	const DEFAULT_CONNECTIONS: GlobeConnection[] = [
		{ from: 0, to: 1 },
		{ from: 0, to: 2 },
		{ from: 0, to: 3 },
		{ from: 1, to: 4 },
		{ from: 2, to: 5 },
		{ from: 3, to: 6 },
		{ from: 4, to: 7 },
		{ from: 5, to: 8 },
		{ from: 1, to: 9 },
		{ from: 2, to: 10 },
		{ from: 6, to: 11 },
		{ from: 7, to: 12 },
		{ from: 8, to: 13 },
		{ from: 9, to: 14 },
		{ from: 10, to: 15 },
		{ from: 3, to: 15 },
		{ from: 0, to: 8 },
		{ from: 1, to: 3 },
	]

	function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
		const phi = ((90 - lat) * Math.PI) / 180
		const theta = ((lon + 180) * Math.PI) / 180
		return new THREE.Vector3(
			-radius * Math.sin(phi) * Math.cos(theta),
			radius * Math.cos(phi),
			radius * Math.sin(phi) * Math.sin(theta),
		)
	}

	function disposeMaterial(material: THREE.Material | THREE.Material[]): void {
		if (Array.isArray(material)) {
			material.forEach(mat => mat.dispose())
		}
		else {
			material.dispose()
		}
	}

	function disposeObject3D(object: THREE.Object3D): void {
		object.traverse((child) => {
			const mesh = child as THREE.Mesh
			if (!mesh.geometry) {
				return
			}
			mesh.geometry.dispose()
			if (mesh.material) {
				disposeMaterial(mesh.material)
			}
		})
	}

	interface PacketState {
		mesh: THREE.Mesh
		trail: THREE.Line
		trailGeo: THREE.BufferGeometry
		history: THREE.Vector3[]
		t: number
		speed: number
		arcIdx: number
	}

	export async function useGlobeScene(
		container: HTMLElement,
		options: UseGlobeSceneOptions = {},
	): Promise<GlobeSceneContext | null> {
		if (!import.meta.client) {
			return null
		}

		if (!container) {
			return null
		}

		const {
			cities = DEFAULT_CITIES,
			connections = DEFAULT_CONNECTIONS,
			background = null,
			fov = 42,
			near = 0.1,
			far = 100,
			cameraZ = 3.2,
			autoRotateSpeed = 0.0025,
		} = options

		const ctx = useThreeScene(container, {
			background,
			fov,
			near,
			far,
			cameraZ,
			antialias: true,
			alpha: true,
		}) as ThreeSceneContext | null

		if (!ctx) {
			return null
		}

		const worldMap = buildWorldMapCanvas()
		const texture = new THREE.CanvasTexture(worldMap.canvas)
		texture.needsUpdate = true

		const root = new THREE.Group()
		ctx.scene.add(root)

		const globeMesh = new THREE.Mesh(
			new THREE.SphereGeometry(RADIUS * 0.999, 64, 32),
			new THREE.MeshBasicMaterial({ map: texture }),
		)
		root.add(globeMesh)

		const wireframe = new THREE.LineSegments(
			new THREE.WireframeGeometry(new THREE.SphereGeometry(RADIUS, 36, 18)),
			new THREE.LineBasicMaterial({ color: 0xbb1100, transparent: true, opacity: 0.1 }),
		)
		root.add(wireframe)

		const glowShells: THREE.Mesh[] = []
		const glowScales = [1.04, 1.09, 1.15]
		const glowOpacities = [0.07, 0.035, 0.015]
		glowScales.forEach((scale, i) => {
			const shell = new THREE.Mesh(
				new THREE.SphereGeometry(RADIUS * scale, 32, 32),
				new THREE.MeshBasicMaterial({
					color: 0xff1100,
					transparent: true,
					opacity: glowOpacities[i],
					side: THREE.BackSide,
				}),
			)
			root.add(shell)
			glowShells.push(shell)
		})

		const cityVectors = cities.map(
			city => latLonToVector3(city.lat, city.lon, RADIUS * 1.002),
		)

		const dotGeo = new THREE.SphereGeometry(0.018, 8, 8)
		const dotMeshes: THREE.Mesh[] = []
		cities.forEach((city, i) => {
			const dot = new THREE.Mesh(
				dotGeo,
				new THREE.MeshBasicMaterial({ color: city.major ? 0xff6644 : 0xff2200 }),
			)
			dot.position.copy(cityVectors[i])
			root.add(dot)
			dotMeshes.push(dot)
		})

		const arcs: THREE.Vector3[][] = connections.map((conn) => {
			const p1 = cityVectors[conn.from]
			const p2 = cityVectors[conn.to]
			const points: THREE.Vector3[] = []
			const segments = 70
			for (let i = 0; i <= segments; i++) {
				const t = i / segments
				const point = new THREE.Vector3().lerpVectors(p1, p2, t)
					.normalize()
					.multiplyScalar(RADIUS + Math.sin(Math.PI * t) * 0.2)
				points.push(point)
			}
			root.add(new THREE.Line(
				new THREE.BufferGeometry().setFromPoints(points),
				new THREE.LineBasicMaterial({ color: 0xff2200, transparent: true, opacity: 0.4 }),
			))
			return points
		})

		const packetGeo = new THREE.SphereGeometry(0.028, 8, 8)
		const packets: PacketState[] = connections.map((_, i) => {
			const mesh = new THREE.Mesh(
				packetGeo,
				new THREE.MeshBasicMaterial({ color: 0xff6633 }),
			)
			root.add(mesh)

			const trailGeo = new THREE.BufferGeometry().setFromPoints(
				Array.from({ length: 14 }, () => new THREE.Vector3()),
			)
			const trail = new THREE.Line(
				trailGeo,
				new THREE.LineBasicMaterial({ color: 0xff3300, transparent: true, opacity: 0.55 }),
			)
			root.add(trail)

			return {
				mesh,
				trail,
				trailGeo,
				history: [],
				t: Math.random(),
				speed: 0.003 + Math.random() * 0.004,
				arcIdx: i,
			}
		})

		const pulseRings: THREE.Mesh[] = cities
			.map((city, i) => ({ city, i }))
			.filter(({ city }) => city.major)
			.map(({ city, i }, idx) => {
				const ring = new THREE.Mesh(
					new THREE.RingGeometry(0, 0.055, 32),
					new THREE.MeshBasicMaterial({
						color: 0xff3300,
						transparent: true,
						opacity: 0.8,
						side: THREE.DoubleSide,
					}),
				)
				const pos = cityVectors[i]
				ring.position.copy(pos)
				ring.lookAt(pos.clone().multiplyScalar(2))
				ring.userData.phase = idx * 1.8
				root.add(ring)
				return ring
			})

		const particlePositions = new Float32Array(300 * 3)
		for (let i = 0; i < 300; i++) {
			const theta = Math.random() * Math.PI * 2
			const phi = Math.acos(2 * Math.random() - 1)
			const r = 1.3 + Math.random() * 1.2
			particlePositions[i * 3] = Math.sin(phi) * Math.cos(theta) * r
			particlePositions[i * 3 + 1] = Math.cos(phi) * r
			particlePositions[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * r
		}
		const particleGeo = new THREE.BufferGeometry()
		particleGeo.setAttribute('position', new THREE.Float32BufferAttribute(particlePositions, 3))
		const particles = new THREE.Points(
			particleGeo,
			new THREE.PointsMaterial({ color: 0xff1100, size: 0.009, transparent: true, opacity: 0.35 }),
		)
		root.add(particles)

		const dragState = { active: false, prevX: 0, prevY: 0, vx: 0, vy: 0 }
		let clock = 0
		let frameId = 0
		let disposed = false

		function onPointerDown(clientX: number, clientY: number): void {
			dragState.active = true
			dragState.prevX = clientX
			dragState.prevY = clientY
			dragState.vx = 0
			dragState.vy = 0
		}

		function onPointerMove(clientX: number, clientY: number): void {
			if (!dragState.active) {
				return
			}
			dragState.vy = (clientX - dragState.prevX) * 0.006
			dragState.vx = (clientY - dragState.prevY) * 0.006
			dragState.prevX = clientX
			dragState.prevY = clientY
		}

		function onPointerUp(): void {
			dragState.active = false
		}

		function onMouseDown(event: MouseEvent): void {
			onPointerDown(event.clientX, event.clientY)
		}

		function onMouseMove(event: MouseEvent): void {
			onPointerMove(event.clientX, event.clientY)
		}

		function onTouchStart(event: TouchEvent): void {
			const touch = event.touches[0]
			if (!touch) {
				return
			}
			onPointerDown(touch.clientX, touch.clientY)
		}

		function onTouchMove(event: TouchEvent): void {
			const touch = event.touches[0]
			if (!touch) {
				return
			}
			onPointerMove(touch.clientX, touch.clientY)
		}

		container.addEventListener('mousedown', onMouseDown)
		window.addEventListener('mouseup', onPointerUp)
		window.addEventListener('mousemove', onMouseMove)
		container.addEventListener('touchstart', onTouchStart, { passive: true })
		container.addEventListener('touchend', onPointerUp)
		container.addEventListener('touchmove', onTouchMove, { passive: true })

		function animate(): void {
			frameId = requestAnimationFrame(animate)
			clock += 0.016

			if (!dragState.active) {
				dragState.vx *= 0.93
				dragState.vy *= 0.93
			}

			root.rotation.y += dragState.active ? dragState.vy : autoRotateSpeed + dragState.vy
			root.rotation.x += dragState.vx

			pulseRings.forEach((ring) => {
				const phase = (clock + ring.userData.phase) % 2.5
				ring.scale.setScalar(phase * 9)
				const material = ring.material as THREE.MeshBasicMaterial
				material.opacity = Math.max(0, 0.65 - phase * 0.26)
			})

			packets.forEach((packet) => {
				packet.t += packet.speed
				if (packet.t > 1) {
					packet.t = 0
					packet.history = []
				}
				const arc = arcs[packet.arcIdx]
				const point = arc[Math.min(Math.floor(packet.t * 70), 69)]
				packet.mesh.position.copy(point)
				packet.history.push(point.clone())
				if (packet.history.length > 14) {
					packet.history.shift()
				}
				if (packet.history.length >= 2) {
					packet.trailGeo.setFromPoints(packet.history)
				}
			})

			ctx.renderer.render(ctx.scene, ctx.camera)
		}

		function start(): void {
			if (frameId || disposed) {
				return
			}
			animate()
		}

		function stop(): void {
			if (!frameId) {
				return
			}
			cancelAnimationFrame(frameId)
			frameId = 0
		}

		function resize(): void {
			ctx.resize()
		}

		function dispose(): void {
			if (disposed) {
				return
			}
			disposed = true

			stop()
			container.removeEventListener('mousedown', onMouseDown)
			window.removeEventListener('mouseup', onPointerUp)
			window.removeEventListener('mousemove', onMouseMove)
			container.removeEventListener('touchstart', onTouchStart)
			container.removeEventListener('touchend', onPointerUp)
			container.removeEventListener('touchmove', onTouchMove)

			texture.dispose()
			disposeObject3D(root)
			ctx.dispose()
		}

		return {
			scene: ctx.scene,
			camera: ctx.camera,
			renderer: ctx.renderer,
			root,
			texture,
			dispose,
			resize,
			start,
			stop,
		}
	}
