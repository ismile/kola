import jwt from 'jsonwebtoken';
import koaJwt from 'koa-jwt';
import crypto from 'crypto';
import {promisify} from 'util';
// @ts-ignore
import config from '../application.config';

const signAsync        = promisify(jwt.sign)
const randomBytesAsync = promisify(crypto.randomBytes);

export default {
  auth: null,

  init() {
    const jwt = this.auth = koaJwt({
      secret: config.auth.secret,
      debug : true
    });
    return jwt;
  },

  async generateJwtId() {
    try {
      let jti:Buffer = await randomBytesAsync(32);
      return Promise.resolve(jti.toString('hex'));
    } catch (e) {
      return Promise.reject(e);
    }
  },

  async generateTokens(payload:any, opts:jwt.SignOptions = {}) {
    try {

      const {
        auth
      } = config;

      const accessTokenId  = await this.generateJwtId();
      const refreshTokenId = await this.generateJwtId();

      const accessTokenPayload = {
        ...payload,
        jti: accessTokenId
      }
      const refreshTokenPayload = {
        jti: refreshTokenId,
        ati: accessTokenId
      }

      const refreshTokenOpts:jwt.SignOptions = {
        expiresIn: auth.refreshTokenTtl,
        ...opts
      };
      const accessTokenOpts:jwt.SignOptions = {
        expiresIn: auth.accessTokenTtl,
        ...opts
      };

      // @ts-ignore
      const refreshToken = await signAsync(refreshTokenPayload, config.auth.secret, refreshTokenOpts);
      // @ts-ignore
      const accessToken = await signAsync(accessTokenPayload, config.auth.secret, accessTokenOpts);
      return Promise.resolve({
        data: { ...payload
        },
        accessToken,
        refreshToken
      });

    } catch (e) {

      return Promise.reject(e);

    }
  }
}
