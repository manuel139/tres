# useAnimations

`useAnimation` is a composable that returns a `shallowReactive` with all the models actions based on the animations provided. It is a wrapper around the [AnimationMixer](https://threejs.org/docs/#api/en/animation/AnimationMixer) class.

<StackBlitzEmbed projectId="tresjs-use-animations" />

## Usage

```ts
import { useAnimations } from '@tresjs/cientos'

const { scene: model, animations } = await useGLTF('/models/ugly-naked-bunny.gltf')

// Animations [ { name: 'Greeting'}, { name: 'Idle' } ]

const { actions, mixer } = useAnimations(animations, model)

let currentAction = actions.Greeting

currentAction.play()
```
