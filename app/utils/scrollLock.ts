import {clearAllBodyScrollLocks, disableBodyScroll, enableBodyScroll} from 'body-scroll-lock'

let lockedCount = 0;

export function lockScroll(lock: boolean, targetElement: HTMLElement | null) {
	if (!targetElement) return;
	if (typeof window === 'undefined') return;
	if (typeof document === 'undefined') return;

	if (lock) {
		lockedCount++;

		let topCompensation = 0;
		if (lockedCount === 1) {
			topCompensation = -1 * (window.scrollY ?? 0);
		}

		disableBodyScroll(targetElement, {
			allowTouchMove: (el: HTMLElement) => !!el.closest('[data-scroll-lock-scrollable]'),
		});

		if (lockedCount === 1) {
			document.body.classList.add('lock-scroll');
			document.body.style.setProperty('top', topCompensation + 'px');
		}
	} else {
		lockedCount--;

		if (targetElement) {
			enableBodyScroll(targetElement);
		} else {
			clearAllBodyScrollLocks();
		}

		if (lockedCount < 1) {
			document.body.classList.remove('lock-scroll');
			document.body.style.removeProperty('top');
		}
	}
}
