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