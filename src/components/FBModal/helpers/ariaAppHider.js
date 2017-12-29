// @flow
import warning from "warning";

let globalElement: ?HTMLElement = null;

export function assertNodeList(nodeList: NodeList<HTMLElement>, selector: string) {
  if (!nodeList || !nodeList.length) {
    throw new Error(`react-modal: Node elements were found for selector ${selector}.`);
  }
}

export function setElement(element: string | HTMLElement): ?HTMLElement {
  let useElement: ?HTMLElement;
  if (typeof element === 'string') {
    const el = document.querySelectorAll(element);
    assertNodeList(el, element);
    useElement = "length" in el ? el[0] : null;
  }
  globalElement = useElement || globalElement;
  
  return globalElement;
}

export function validateElement(appElement: ?HTMLElement): boolean {
  if (!appElement && !globalElement) {
    warning(false,[
      'react-modal: App element is not defined.',
      'Please use `Modal.setAppElement(el)` or set `appElement={el}`.',
      'This is needed so screen readers don\'t see main content',
      'when modal is opened. It is not recommended, but you can opt-out',
      'by setting `ariaHideApp={false}'
    ].join(' '));
    
    return false;
  }
  
  return true;
}

export function hide(appElement: ?HTMLElement): void {
  if (validateElement(appElement)) {
    (appElement || globalElement).setAttribute('aria-hidden', 'true');
  }
}

export function show(appElement: ?HTMLElement): void {
  if (validateElement(appElement)) {
    (appElement || globalElement).removeAttribute('aria-hidden');
  }
}

export function documentNotReadyOrSSRTesting() {
  globalElement = null;
}

export function resetForTesting() {
  globalElement = null;
}
