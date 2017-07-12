import {Model} from 'objection';
import bcrypt from 'bcrypt';
import _ from 'lodash';

/**
 * @class User
 * @extends {Model}
 */
class User extends Model {

  static tableName = 't_user'

	static jsonSchema = {
		type: 'object',
		required: ['username', 'password'],
		properties: {
			id: {type: 'integer'},
			username: {type: 'string', minLength: 1, maxLength: 255},
			password: {type: 'string', minLength: 1, maxLength: 255},
			fullname: {type: 'string', minLength: 1, maxLength: 255}
		}
	};

	$beforeInsert(context) {
		const maybePromise = super.$beforeInsert(context);
		return Promise.resolve(maybePromise).then(() => {
			return this.transformPassword(this)
		});
	}

	transformPassword = async () => {
		if(_.isEmpty(this.password)) {
			return Promise.reject('password is empty');
		} else {
			let hash = await bcrypt.hash(this.password, 10);
			this.password = hash;
			return Promise.resolve(this);
		}
	}

	checkPassword = async (password) => {
		try {
			let valid = await bcrypt.compare(password, this.password);
			return Promise.resolve(valid);
		} catch(e) {
			return Promise.reject(e);
		}
	}

}

module.exports = User;
