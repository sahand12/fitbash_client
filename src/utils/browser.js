// @flow
// https://stackoverflow.com/questions/1038727/how-to-get-browser-width-using-javascript-code (using dimensions.js of jquery)
export const getBrowserWidth = function getBrowserWidth () {
  if (document && document.body && document.documentElement) {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth,
    );
  }
  return undefined;
};
export const getBrowserHeight = function getBrowserHeight() {
  if (document && document.body && document.documentElement) {
    return Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.documentElement.clientHeight,
    );
  }
  return undefined;
};
export const getBrowserOuterWidth = function getBrowserOuterWidth () {
  return window.outerWidth;
};
export const getElementWidth = function getElementWidth(elem: HTMLElement) {
  return elem.offsetWidth;
};
export const getElementHeight = function getElementHeight(elem: HTMLElement) {
  return elem.offsetHeight;
};
export const getElementStyle = function getElementStyle(elem: HTMLElement, styleProperty: string) {
  if (elem) {
    return window.getComputedStyle(elem)
      .getPropertyValue(styleProperty);
  }
  return undefined;
};
