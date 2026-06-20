/// <reference lib="dom" />
import {BREAKPOINTS} from "~/utils/const";

interface NavigatorConnection {
    effectiveType?: '4g' | '3g' | '2g' | 'slow-2g';
    downlink?: number;
    rtt?: number;
    saveData?: boolean;
}

interface NavigatorWithConnection extends Navigator {
    connection?: NavigatorConnection;
}

export const Detector = {
    get isXs(): boolean {
        return typeof window !== 'undefined' ? window.innerWidth < BREAKPOINTS.xs : false;
    },

    get isSm(): boolean {
        return typeof window !== 'undefined' ? window.innerWidth < BREAKPOINTS.sm : false;
    },

    get isMd(): boolean {
        return typeof window !== 'undefined' ? window.innerWidth < BREAKPOINTS.md : false;
    },

    get isLg(): boolean {
        return typeof window !== 'undefined' ? window.innerWidth < BREAKPOINTS.lg : false;
    },

    get isXl(): boolean {
        return typeof window !== 'undefined' ? window.innerWidth < BREAKPOINTS.xl : false;
    },

    get isXxl(): boolean {
        return typeof window !== 'undefined' ? window.innerWidth < BREAKPOINTS.xxl : false;
    },

    get isTouch(): boolean {
        return ('ontouchstart' in window)
            || (navigator.maxTouchPoints > 0)
            || ((navigator as any).msMaxTouchPoints > 0);
    },

    get userAgent(): string {
        return navigator !== undefined ? navigator.userAgent : '';
    },

    get vendor(): string {
        return (navigator !== undefined ? navigator?.vendor : '') || '';
    },

    get getWindowHeight(): number {
        return window?.innerHeight ?? 0;
    },

    get getWindowWidth(): number {
        return window?.innerWidth ?? 0;
    },

    get getOrientation(): string {
        return this.getWindowWidth > this.getWindowHeight ? 'horizontal' : 'vertical';
    },

    get scrollbarWidth(): number {
        return Math.round(window?.innerWidth - document?.documentElement?.clientWidth);
    },

    get isSlowNetwork(): boolean {
        const slowTypes = ['slow-2g', '2g', '3g'];
        const nav = navigator as NavigatorWithConnection;
        const networkType = nav?.connection?.effectiveType ?? '';

        return slowTypes.includes(networkType);
    },

    get isSafari(): boolean {
        const ua = navigator.userAgent;
        return /^((?!chrome|android).)*safari/i.test(ua);
    },

    get isMac() {
        if (typeof document === 'undefined') return false;

        return navigator?.platform?.indexOf('Mac') > -1;
    },

    get isIphone() {
        if (typeof document === 'undefined') return false;

        return (navigator?.platform?.indexOf('iPhone') !== -1) || (navigator.userAgent.indexOf('iPhone') !== -1);
    },

    get isIpad() {
        if (typeof document === 'undefined') return false;

        return (navigator?.platform?.indexOf('iPad') !== -1) || (navigator.userAgent.match(/iPad/i) !== null);
    },

    get isAndroid() {
        if (typeof document === 'undefined') return false;

        return (navigator?.platform?.indexOf('Android') !== -1) || (navigator.userAgent.indexOf('Android') !== -1);
    },
};