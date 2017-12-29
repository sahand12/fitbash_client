// @flow
import * as refCount from './refCount';

export function add(bodyClass: string) {
  // Increment class(es) on refCount tracker and add class(es) to body
  bodyClass.split(" ")
    .map(refCount.add)
    .forEach(className => document.body && document.body.classList && document.body.classList.add(className));
}

export function remove(bodyClass: string) {
  // Decrement class(es) from the refCount tracker
  // and remove unused class(es) form body
  bodyClass.split(' ')
    .map(refCount.remove)
    .filter(className => refCount.get()[className] === 0)
    .forEach(className => document.body && document.body.classList && document.body.classList.remove(className));
}
