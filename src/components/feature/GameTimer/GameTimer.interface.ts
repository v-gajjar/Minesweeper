export interface GameTimerProps {
  /** Show the Start/Stop/Reset buttons (default: true) */
  showControls?: boolean;
  /** Optional className to style the wrapper */
  className?: string;
  /** Disable Start while a game is ended (you can pass gameHasEnded()) */
  disableStart?: boolean;
  /** Title attribute for a11y/tooltip */
  title?: string;
}
