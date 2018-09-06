import jwt from 'jsonwebtoken';
import * as _ from './utilities';
import url from 'url';
import {NoTokenProvidedException} from "../clients/fetchClient";

const ACCESS_TOKEN_COOKIE = 'gusteau_access_token';
const ACCESS_TOKEN_PARAM = 'access_token';

export default class BearerTokenProvider {

  constructor(tokenDecodedListener) {
    this.tokenDecodedListener = tokenDecodedListener;
  }

  async getToken(decode = false) {
    let accessToken = this.getTokenFromURL();
    let decodedToken = undefined;

    if (_.isDefined(accessToken)) {
      decodedToken = await this.decodeToken(accessToken);

      _.setCookie(ACCESS_TOKEN_COOKIE, accessToken, new Date(decodedToken.exp));
    }

    if (!_.isDefined(accessToken)) {
      accessToken = this.getTokenFromCookie();
    }

    if (!_.isDefined(accessToken)) {
      throw new NoTokenProvidedException();
    }

    if (!_.isDefined(decodedToken) && decode) {
      this.decodeToken(accessToken);
    }

    return accessToken;
  }

  async decodeToken(token) {
    let decodedToken = await jwt.decode(token);

    if (_.isDefined(this.tokenDecodedListener)) {
      this.tokenDecodedListener(decodedToken);
    }

    return decodedToken;
  }

  getTokenFromCookie() {
    return _.getCookie(ACCESS_TOKEN_COOKIE);
  }

  getTokenFromURL() {
    let theUrl = url.parse(window.location.href);
    let searchParams = new URLSearchParams(theUrl.query);
    if (searchParams.has(ACCESS_TOKEN_PARAM)) {
      return searchParams.get(ACCESS_TOKEN_PARAM);
    }

    return undefined;
  }
}