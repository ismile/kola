import jwt from 'jsonwebtoken';
import koaJwt from 'koa-jwt';
import crypto from 'crypto';
import {promisify} from 'bluebird';
import config from '../../knexfile';

const signAsync = promisify(jwt.sign)
const randomBytesAsync = promisify(crypto.randomBytes);

export default class JWTConfig {
	static auth;

	static init() {
		const jwt = this.auth = koaJwt({ secret: config.auth.secret, debug: true });
		return jwt;
	}

	static async generateJwtId() {
		try {
			let jti = await randomBytesAsync(32);
			return Promise.resolve(jti.toString('hex'));
		} catch (e) {
			return Promise.reject(e);
		}
	}

	static async generateTokens(payload, opts = {}) {
		try {

			const { auth } = config;

			const accessTokenId = await this.generateJwtId();
			const refreshTokenId = await this.generateJwtId();

			const accessTokenPayload = {
				...payload,
				jti: accessTokenId
			}
			const refreshTokenPayload = {
				jti: refreshTokenId,
				ati: accessTokenId
			}

			const refreshTokenOpts = {
				expiresIn: auth.refreshTokenTtl,
				...opts
			};
			const accessTokenOpts = {
				expiresIn: auth.accessTokenTtl,
				...opts
			};

			const refreshToken = await signAsync(refreshTokenPayload, config.auth.secret, refreshTokenOpts);
			const accessToken = await signAsync(accessTokenPayload, config.auth.secret, accessTokenOpts);
			return Promise.resolve({
				data: {...payload},
				accessToken,
				refreshToken
			});

		} catch(e) {

			return Promise.reject(e);

		}
	}
}
