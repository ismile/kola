import {Model} from 'objection';
import Knex from 'knex';
import config from '../../knexfile';
import constant from './constant';

export default class DbConfig {
	static init() {
		const knex = exports.knex = Knex(config[constant.env]);
		Model.knex(knex);
	}
}
