import { EnvironmentOptions } from './const'
import { CubeTexture, Texture } from 'three'
import { defineComponent } from 'vue'

import { useEnvironment } from '.'

export const Environment = defineComponent<EnvironmentOptions>({
  name: 'Environment',
  props: ['background', 'blur', 'files', 'encoding', 'path', 'preset'] as unknown as undefined,

  async setup(props, { expose }) {
    let texture: Texture | CubeTexture | null = null

    expose({ getTexture: () => texture })

    texture = await useEnvironment(props as EnvironmentOptions)

    return () => {
      texture
    }
  },
})
