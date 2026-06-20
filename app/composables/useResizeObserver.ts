import debounce from 'debounce';
import type { Ref } from 'vue';
import { onMounted, onBeforeUnmount, unref } from 'vue';

/**
 * resizeObserver следит за ресайзом ДОКУМЕНТА
 * Это хэлпер для функций, которые должны отрабатывать при изменении размеров ДОКУМЕНТА, в том числе при:
 * - переключении Mobile/Desktop в режиме эмуляции
 * - инициализации и изменения стейта компонентов
 *
 * resizeObserver не реагирует на изменение размеров окна без изменения размеров документа
 * @param callback - функция, которая будет вызываться при ресайзе
 * @param debounceTime - задержка вызова функции в миллисекундах
 * @param callOnInit - вызвать функцию сразу при инициализации
 * @param setUpOnMounted - инициализировать resizeObserver при монтировании VUE компонента
 * @param el - элемент, за ресайзом которого мы следим
 */
export function useResizeObserver(
    callback: () => void,
    debounceTime: number = 100,
    callOnInit: boolean = true,
    setUpOnMounted: boolean = false,
    el?: Ref<null | HTMLElement> | HTMLElement | null,
) {
    const debouncedCallback = debounce(callback, debounceTime);
    let ro: ResizeObserver | undefined;

    function setUp() {
        if (callOnInit) debouncedCallback();

        if (!window) {
            callback();

            return;
        }

        if (!('ResizeObserver' in window)) {
            (window as Window).addEventListener('resize', callback);

            return;
        }

        ro = new ResizeObserver(() => {
            debouncedCallback();
        });

        ro.observe(unref(el) ?? document.body);
    }
    function tearDown() {
        ro?.disconnect();
    }

    if (setUpOnMounted) {
        onMounted(setUp);
        onBeforeUnmount(tearDown);
    } else {
        setUp();
    }

    return ro;
}