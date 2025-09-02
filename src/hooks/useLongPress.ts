import { useEffect, useRef } from "react";

type Callback = () => void;

/**
 * Cross-platform long-press hook.
 *
 * Purpose:
 * - Provides a consistent "long-press" behavior across Desktop, Android, and iOS.
 * - On Desktop: intercepts the `contextmenu` event to simulate a right-click action without showing the native menu.
 * - On Mobile (Android/iOS): a quick tap still triggers the normal `onClick`; a long-press calls the provided callback.
 * - On iOS Safari: prevents the native "Copy / Select" context menu when a long-press is detected.
 *
 * Parameters:
 * @param cb - Callback executed when a long-press is detected.
 * @param ms - Duration threshold (in ms) to qualify as a long-press. Defaults to 450ms.
 *
 * Usage:
 * const longPress = useLongPress(() => toggleFlag(cell), 450);
 * <div ref={longPress.ref} onClick={onClick}>...</div>
 */
export default function useLongPress(cb: Callback, ms = 450) {
    // Ref to the element where long-press detection will be attached
    const ref = useRef<HTMLElement | null>(null);

    // Timer used to measure how long the touch/press has been held
    const timer = useRef<number | null>(null);

    // Flag to track if the last interaction was a long-press
    const didLongPress = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        /**
         * Touch start handler
         * - Resets the long-press state.
         * - Starts the timer; if held long enough, triggers the callback and marks as long-press.
         */
        const onTouchStart = () => {
            didLongPress.current = false;
            timer.current = window.setTimeout(() => {
                cb();
                didLongPress.current = true;
            }, ms);
        };

        /**
         * Touch end handler
         * - Clears the timer.
         * - If the press was long enough, prevents the subsequent synthetic "click"
         *   so that the action doesn't trigger twice (once for long-press, once for click).
         */
        const onTouchEnd = (e: TouchEvent) => {
            if (timer.current) window.clearTimeout(timer.current);
            timer.current = null;

            if (didLongPress.current) {
                e.preventDefault(); // Cancel the default click after long-press
                didLongPress.current = false;
            }
        };

        /**
         * Context menu handler
         * - Captures right-click on Desktop and prevents the browser's context menu from appearing.
         * - Calls the callback to simulate the flagging action (or any custom logic).
         */
        const onContextMenu = (e: Event) => {
            e.preventDefault();
            cb();
        };

        // Attach event listeners
        el.addEventListener("touchstart", onTouchStart, { passive: true });
        el.addEventListener("touchend", onTouchEnd);
        el.addEventListener("contextmenu", onContextMenu);

        // Cleanup listeners on unmount
        return () => {
            el.removeEventListener("touchstart", onTouchStart as any);
            el.removeEventListener("touchend", onTouchEnd as any);
            el.removeEventListener("contextmenu", onContextMenu as any);
        };
    }, [cb, ms]);

    return { ref };
}
