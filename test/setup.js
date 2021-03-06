'use strict';

require('@babel/register');
require('babel-polyfill');
require('mocha-snapshots');
const Adapter = require('enzyme-adapter-react-16');
const Enzyme = require('enzyme');
Enzyme.configure({ adapter: new Adapter()});
global.expect = require('chai').expect;
global.path = require('path');
global.sinon = require('sinon');
global.GUSTEAU_URL = 'http://www.gusteau.com';

global.URLSearchParams = require('url-search-params');

const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .reduce((result, prop) => ({
      ...result,
      [prop]: Object.getOwnPropertyDescriptor(src, prop),
    }), {});
  Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
copyProps(window, global);