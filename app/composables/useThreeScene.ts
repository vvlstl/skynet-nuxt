import * as THREE from 'three'

export interface UseThreeSceneOptions {
	fov?: number
	near?: number
	far?: number
	cameraZ?: number
	alpha?: boolean
	antialias?: boolean
	background?: THREE.ColorRepresentation | null
}

export interface ThreeSceneContext {
	scene: THREE.Scene
	camera: THREE.PerspectiveCamera
	renderer: THREE.WebGLRenderer
	dispose: () => void
	resize: () => void
}

function disposeObject3D(object: THREE.Object3D): void {
	object.traverse((child) => {
		const mesh = child as THREE.Mesh
		if (!mesh.geometry) {
			return
		}
		mesh.geometry.dispose()

		const material = mesh.material
		if (Array.isArray(material)) {
			material.forEach((mat) => mat.dispose())
		}
		else if (material) {
			material.dispose()
		}
	})
}

export function useThreeScene(
	container: HTMLElement,
	options: UseThreeSceneOptions = {},
): ThreeSceneContext | null {
	if (!import.meta.client) {
		return null
	}

	if (!container) {
		return null
	}

	const {
		fov = 50,
		near = 0.1,
		far = 1000,
		cameraZ = 5,
		alpha = true,
		antialias = true,
		background = null,
	} = options

	const width = container.clientWidth || 1
	const height = container.clientHeight || 1

	const scene = new THREE.Scene()
	if (background !== null) {
		scene.background = new THREE.Color(background)
	}

	const camera = new THREE.PerspectiveCamera(fov, width / height, near, far)
	camera.position.z = cameraZ

	let renderer: THREE.WebGLRenderer
	try {
		renderer = new THREE.WebGLRenderer({ alpha, antialias })
	}
	catch (error) {
		return null
	}

	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
	renderer.setSize(width, height)
	container.appendChild(renderer.domElement)

	const resize = (): void => {
		const w = container.clientWidth || 1
		const h = container.clientHeight || 1
		if (w === 0 || h === 0) {
			return
		}
		camera.aspect = w / h
		camera.updateProjectionMatrix()
		renderer.setSize(w, h)
	}

	let disposed = false
	const dispose = (): void => {
		if (disposed) {
			return
		}
		disposed = true

		disposeObject3D(scene)

		renderer.dispose()
		if (renderer.domElement.parentNode) {
			renderer.domElement.parentNode.removeChild(renderer.domElement)
		}

	}

	return { scene, camera, renderer, dispose, resize }
}
