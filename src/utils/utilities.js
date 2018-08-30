export function isDefined(variable) {
  return typeof variable !== 'undefined' && variable !== null;
}

export function isFunction(variable) {
  return typeof variable === 'function';
}

export function navigateTo(url) {
  window.location.replace(url);
}