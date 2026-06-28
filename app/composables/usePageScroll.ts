import {ref} from 'vue';

// Глобальные реактивные refs для позиции скролла.
// Обновляются напрямую через scroll listener без useWindowScroll.
const scrollY = ref<number>(0);
const scrollX = ref<number>(0);
let initialized = false;

function updateScrollPosition() {
    if (typeof window === 'undefined') return;
    if (document.body.classList.contains('lock-scroll')) return;

    scrollY.value = window.scrollY;
    scrollX.value = window.scrollX;
}

function initScrollTracking() {
    if (initialized) return;
    initialized = true;
    updateScrollPosition();
    window.addEventListener('scroll', updateScrollPosition, {passive: true});
}

export function usePageScroll() {
    if (import.meta.client) {
        initScrollTracking();
    }

    return {scrollY, scrollX};
}