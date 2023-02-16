import { useTres } from '@tresjs/core'
import { inject } from 'vue'

export function useCientos() {
  const extend =
    inject<(objects: any) => void>('extend') ||
    (() => {
      console.warn('No extend function provided')
    })

  const { state, setState } = inject('useTres', useTres())
  return {
    state,
    setState,
    extend,
  }
}
