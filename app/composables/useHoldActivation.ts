import {onUnmounted, ref} from 'vue'
import type {Ref} from 'vue'

type THoldActivationComposable = {
    isHolding: Ref<boolean>
    progress: Ref<number>
    isActivated: Ref<boolean>
    startHold: (e?: Event) => void
    cancelHold: () => void
    reset: () => void
}

/**
 * Логика удержания кнопки активации: progress 0..100 на requestAnimationFrame.
 * После достижения 100% фиксируется isActivated — сбросить можно только через reset().
 */
export function useHoldActivation(durationMs = 3000): THoldActivationComposable {
    const isHolding = ref<boolean>(false)
    const progress = ref<number>(0)
    const isActivated = ref<boolean>(false)

    let rafId: number | null = null
    let startTime: number | null = null

    const loop = (now: number): void => {
        if (startTime === null) return
        const elapsed = now - startTime
        const next = Math.min((elapsed / durationMs) * 100, 100)
        progress.value = next

        if (next >= 100) {
            isActivated.value = true
            isHolding.value = false
            rafId = null
            return
        }

        rafId = requestAnimationFrame(loop)
    }

    const cancelRaf = (): void => {
        if (rafId !== null) {
            cancelAnimationFrame(rafId)
            rafId = null
        }
    }

    const startHold = (e?: Event): void => {
        if (isActivated.value || isHolding.value) return
        e?.preventDefault()

        isHolding.value = true
        startTime = performance.now()
        rafId = requestAnimationFrame(loop)
    }

    const cancelHold = (): void => {
        if (isActivated.value) return
        if (!isHolding.value) return

        isHolding.value = false
        progress.value = 0
        startTime = null
        cancelRaf()
    }

    const reset = (): void => {
        cancelRaf()
        isHolding.value = false
        progress.value = 0
        isActivated.value = false
        startTime = null
    }

    onUnmounted(() => {
        cancelRaf()
    })

    return {
        isHolding,
        progress,
        isActivated,
        startHold,
        cancelHold,
        reset,
    }
}
