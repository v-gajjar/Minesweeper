import { useCallback, useRef } from 'react';

export function useLongPress({
  onLongPress,
  onClick,
  onContextMenu,
  ms = 500
}) {
  const timerRef = useRef(null);
  const longPressTriggered = useRef(false);

  const startPressTimer = useCallback((e) => {
    longPressTriggered.current = false;

    timerRef.current = setTimeout(() => {
      longPressTriggered.current = true;
      onLongPress?.(e);
    }, ms);
  }, [onLongPress, ms]);

  const clearPressTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

  }, []);

  const handleClick = useCallback((e) => {
    if (longPressTriggered.current) {
      e.preventDefault();
    } else {
      onClick?.(e);
    }

    setTimeout(() => {
      longPressTriggered.current = false;
    }, 0);
  }, [onClick]);

  const handleContextMenu = useCallback((e) => {
    if (longPressTriggered.current) {
      e.preventDefault();
    } else {
      onContextMenu?.(e);
    }


    setTimeout(() => {
      longPressTriggered.current = false;
    }, 0);
  }, [onContextMenu]);

  return {
    onMouseDown: startPressTimer,
    onTouchStart: startPressTimer,
    onMouseUp: clearPressTimer,
    onTouchEnd: clearPressTimer,
    onMouseLeave: clearPressTimer,
    onTouchCancel: clearPressTimer,
    onClick: handleClick,
    onContextMenu: handleContextMenu,
  };
}