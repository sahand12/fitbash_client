import findTabbable from './tabbable';

export default function scopeTab(node, event) {
  const tabbable = findTabbable(node);
  
  if (tabbable.length === 0) {
    // Do nothing, since there are no elements that can receive focus.
    event.preventDefault();
    return;
  }
  
  const shiftKey = event.shiftKey;
  const head = tabbable[0];
  const tail = tabbable[tabbable.length - 1];
  
  // Proceed with default browser behavior
  if (node === document.activeElement) { return; }
  
  let target;
  if (tail === document.activeElement && !shiftKey) {
    target = head;
  }
  if (head === document.activeElement && shiftKey) {
    target = tail;
  }
  
  if (target) {
    event.preventDefault();
    target.focus();
    return;
  }
  
  /*
   * Safari radio issue.
   *
   * Safari does not move the focus to the radio button,
   * so we need to force it to really walk through all elements.
   *
   * This is very error prune, since we are trying to guess if
   * it is a safari browser from the first occurrence between
   * chrome and safari.
   *
   * The chrome user agent contains the first occurrence
   * as the 'chrome/version' and later the 'safari/version'
   */
  const checkSafari = /(\bChrom\b|\bSafari\b)\//.exec(navigator.userAgent);
  const isSafariDesktop =
    checkSafari != null &&
    checkSafari[1] != 'Chrome' &&
    /\biPod\b|\biPad\b/g.exec(navigator.userAgent) == null;
  
  // If we are not in safari desktop, let the browser control the focus
  if (!isSafariDesktop) return;
  
  let x = tabbable.indexOf(document.activeElement);
  if (x > -1) {
    x += shiftKey ? -1 : 1;
  }
  
  event.preventDefault();
  tabbable[x].focus();
}
