// Update with your config settings.

module.exports = {
	auth: {
		secret: 'dont_tell_anyone',
    accessTokenTtl: 60 * 5 * 12,
    refreshTokenTtl: 60 * 1 * 12
  },

	logger: {
		dev: 'debug',
		prod: 'info'
	},

	client: {
		host: 'http://localhost:3000'
	},

	// database config
  development: {
    client: 'postgresql',
    connection: {
      database: 'db_name',
      user:     'user',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'db_name',
      user:     'user',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'db_name',
      user:     'user',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
