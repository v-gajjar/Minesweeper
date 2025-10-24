import { useEffect, useRef } from "react";

type Options = { threshold?: number };

/**
 * Quick tap => click (reveal)
 * Long-press => synthetic `contextmenu` (flag)
 * Does NOT block touchstart (so iOS still synthesizes click).
 */
export function useLongPress<T extends HTMLElement>(opts: Options = {}) {
  const { threshold = 600 } = opts;

  const ref = useRef<T | null>(null);
  const timerRef = useRef<number | null>(null);
  const activePointerId = useRef<number | null>(null);
  const firedLongPressRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const clear = () => {
      if (timerRef.current != null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      activePointerId.current = null;
    };

    // We block native contextmenu/select/gesture on the element itself,
    // but we do NOT block touchstart (it would kill click on iOS).
    const block = (e: Event) => e.preventDefault();
    el.addEventListener("contextmenu", block);
    el.addEventListener("gesturestart", block as any);
    el.addEventListener("selectstart", block as any);

    // Long-press via pointer events
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "touch" && e.pointerType !== "pen") return;
      activePointerId.current = e.pointerId;
      firedLongPressRef.current = false;
      try { el.setPointerCapture?.(e.pointerId); } catch {}
      timerRef.current = window.setTimeout(() => {
        if (activePointerId.current === e.pointerId) {
          firedLongPressRef.current = true;
          const ev = new Event("contextmenu", { bubbles: true, cancelable: true });
          el.dispatchEvent(ev);
        }
      }, threshold);
    };
    const onUp = () => clear();
    const onCancel = () => clear();

    // After a long-press, iOS often emits a click; swallow that
    const onClickCapture = (e: MouseEvent) => {
      if (firedLongPressRef.current) {
        e.preventDefault();
        e.stopPropagation();
        firedLongPressRef.current = false;
      }
    };

    el.addEventListener("pointerdown", onDown, { passive: true });
    el.addEventListener("pointerup", onUp, { passive: true });
    el.addEventListener("pointercancel", onCancel, { passive: true });
    el.addEventListener("touchcancel", onCancel, { passive: true });
    el.addEventListener("click", onClickCapture, { capture: true });

    return () => {
      el.removeEventListener("contextmenu", block as any);
      el.removeEventListener("gesturestart", block as any);
      el.removeEventListener("selectstart", block as any);
      el.removeEventListener("pointerdown", onDown as any);
      el.removeEventListener("pointerup", onUp as any);
      el.removeEventListener("pointercancel", onCancel as any);
      el.removeEventListener("touchcancel", onCancel as any);
      el.removeEventListener("click", onClickCapture as any, { capture: true } as any);
    };
  }, [threshold]);

  return { ref };
}