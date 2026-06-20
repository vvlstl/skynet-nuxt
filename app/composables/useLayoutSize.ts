import { reactive, toRefs } from 'vue';
import type {TResizeWatcher} from "~/types/TResizeWatcher";

const values = reactive<TResizeWatcher>({
    isXs: Detector.isXs,
    isSm: Detector.isSm,
    isMd: Detector.isMd,
    isLg: Detector.isLg,
    isXl: Detector.isXl,
    isMobile: Detector.isMd,
    isTouch: Detector.isTouch,
    windowWidth: Detector.getWindowWidth,
    windowHeight: Detector.getWindowHeight,
});

useResizeObserver(() => {
    values.isXs = Detector.isXs;
    values.isSm = Detector.isSm;
    values.isMd = Detector.isMd;
    values.isLg = Detector.isLg;
    values.isXl = Detector.isXl;
    values.isMobile = Detector.isMd;
    values.isTouch = Detector.isTouch;
    values.windowWidth = Detector.getWindowWidth;
    values.windowHeight = Detector.getWindowHeight;
});

export function useLayoutSize() {
    return {
        ...toRefs(values),
    };
}