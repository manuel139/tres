import { useTres } from '/@/core/'
import { PerspectiveCamera, OrthographicCamera } from 'three'

import { toRef, watch, Ref } from 'vue'

export enum CameraType {
  Perspective = 'Perspective',
  Orthographic = 'Orthographic',
}

export type Camera = PerspectiveCamera | OrthographicCamera

export interface PerspectiveCameraOptions {
  fov?: number
  near?: number
  far?: number
}

export interface OrthographicCameraOptions {
  left?: number
  right?: number
  top?: number
  bottom?: number
  near?: number
  far?: number
}

interface UseCameraReturn {
  activeCamera: Ref<Camera | undefined>
  createCamera: (cameraType?: CameraType, options?: PerspectiveCameraOptions | OrthographicCameraOptions) => Camera
  updateCamera: () => void
  pushCamera: (camera: Camera) => void
  clearCameras: () => void
}

const VERTICAL_FIELD_OF_VIEW = 45
let camera: Camera

/**
 * Create and update cameras
 *
 * ```ts
 * import { useCamera } from '@tresjs/core'
 * const { createCamera, updateCamera } = useCamera()
 * const camera = createCamera(new PerspectiveCamera(45, 1, 0.1, 1000))
 * updateCamera()
 * ```
 *
 * @export
 * @return {*}  {UseCameraReturn}
 */
export function useCamera(): UseCameraReturn {
  const { state, setState } = useTres()

  /**
   * Create camera and push to Tres `state.cameras` array
   *
   * ```ts
   * import { useCamera } from '@tresjs/core'
   * const { createCamera } = useCamera()
   * const camera = createCamera(new PerspectiveCamera(45, 1, 0.1, 1000))
   * ```
   *
   * @param {*} [cameraType=CameraType.Perspective]
   * @param {(PerspectiveCameraOptions | OrthographicCameraOptions)} [options]
   * @return {*}
   */
  function createCamera(
    cameraType = CameraType.Perspective,
    options?: PerspectiveCameraOptions | OrthographicCameraOptions,
  ) {
    if (cameraType === CameraType.Perspective) {
      const { near, far, fov } = (options as PerspectiveCameraOptions) || {
        near: 0.1,
        far: 1000,
        fov: VERTICAL_FIELD_OF_VIEW,
      }
      camera = new PerspectiveCamera(fov, state.aspectRatio?.value || 1, near, far)
      state.cameras?.push(camera as PerspectiveCamera)
    } else {
      const { left, right, top, bottom, near, far } = (options as OrthographicCameraOptions) || {
        left: -100,
        right: 100,
        top: 100,
        bottom: -100,
        near: 0.1,
        far: 1000,
      }
      camera = new OrthographicCamera(left, right, top, bottom, near, far)
      state.cameras?.push(camera as OrthographicCamera)
    }
    state.camera = camera
    return camera
  }

  setState('camera', state.camera)

  /**
   * Update camera aspect ratio and projection matrix
   *
   */
  function updateCamera() {
    if (state.camera instanceof PerspectiveCamera && state.aspectRatio) {
      state.camera.aspect = state.aspectRatio.value
    }
    state.camera?.updateProjectionMatrix()
  }

  /**
   * Push camera to cameras array and update aspect ratio if camera is PerspectiveCamera
   *
   * @param {Camera} camera
   */
  function pushCamera(camera: Camera): void {
    state.cameras?.push(camera)
    if (camera instanceof PerspectiveCamera && state.aspectRatio) {
      camera.aspect = state.aspectRatio.value
    }
    camera.updateProjectionMatrix()
  }

  /**
   * Clear cameras array
   *
   */
  function clearCameras() {
    state.cameras = []
  }

  if (state.aspectRatio) {
    watch(state.aspectRatio, updateCamera)
  }
  return {
    activeCamera: toRef(state, 'camera'),
    createCamera,
    updateCamera,
    pushCamera,
    clearCameras,
  }
}
