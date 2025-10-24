let installed = false;

/**
 * Install a global, capture-phase contextmenu blocker ONLY on touch devices.
 * This is the final shield against iOS Safari's long-press menu.
 */
export function installIOSContextMenuBlocker() {
  if (installed) return;
  installed = true;

  const isTouchDevice =
    typeof window !== "undefined" &&
    (("ontouchstart" in window) ||
     (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) ||
     (window.matchMedia && window.matchMedia("(pointer: coarse)").matches));

  if (!isTouchDevice) return;

  const block = (e: Event) => {
    // Allow explicit opt-out by marking a node with data-allow-contextmenu
    const el = e.target as HTMLElement | null;
    if (el && el.closest("[data-allow-contextmenu]")) return;
    e.preventDefault();
  };

  // Capture so we beat native handlers
  document.addEventListener("contextmenu", block, { capture: true });
}