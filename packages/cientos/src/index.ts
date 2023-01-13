import OrbitControls from './core/OrbitControls.vue'
import TransformControls from './core/TransformControls.vue'
import { useTweakPane } from './core/useTweakPane'
import { GLTFModel } from './core/useGLTF/component'
import { FBXModel } from './core/useFBX/component'
import Text3D from './core/Text3D.vue'
import Plane from './core/Plane.vue'

export * from './core/useGLTF'
export * from './core/useFBX'
export * from './types'
export { OrbitControls, TransformControls, useTweakPane, GLTFModel, FBXModel, Text3D, Plane }
