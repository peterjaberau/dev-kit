export function triggerPostMoveFlash(element: HTMLElement) {
  element.animate([{ backgroundColor: 'bg.subtle' }, {}], {
    duration: 'durations.large',
    easing: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
    iterations: 1,
  });
}
