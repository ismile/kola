import {Model} from 'objection';
import bcrypt from 'bcrypt';
import _ from 'lodash';

/**
 * @class <%= className %>
 * @extends {Model}
 */
class <%= className %> extends Model {
	static tableName = 't_<%= name %>'

	static jsonSchema = {
		type: 'object',
		required: [],
		properties: {
			id: {type: 'integer'},
			name: {type: 'string'}
		}
	}
}


export default <%= className %>;
