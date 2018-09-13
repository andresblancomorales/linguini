import Cookies from 'js-cookie';
import url from 'url';
import {connect} from "react-redux";

export function isDefined(variable) {
  return typeof variable !== 'undefined' && variable !== null;
}

export function isFunction(variable) {
  return typeof variable === 'function';
}

export function navigateTo(url) {
  window.location.replace(url);
}

export function setCookie(name, value, expiracyDate) {
  Cookies.set(name, value, {expires: expiracyDate});
}

export function getCookie(name) {
  return Cookies.get(name);
}

export function deleteCookie(name) {
  return Cookies.remove(name);
}

export function getQueryParam(name) {
  let theUrl = url.parse(window.location.href);
  let searchParams = new URLSearchParams(theUrl.query);
  return searchParams.get(name);
}

export function getLinguiniInstanceProvider() {
  return require('../components/linguini/instanceProvider');
}

export function reduxConnect(component, mapStateToProps, mapActionsToProps) {
  return connect(mapStateToProps, mapActionsToProps)(component);
}
