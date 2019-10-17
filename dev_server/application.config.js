module.exports = {
  name   : 'kola',
  version: '0.1',
  description: '',
  auth: {
    secret: 'this is secret'
  },

  production: {
    log: {
      level: 'info'
    },
    db: {
      url    : 'mongodb://localhost:27017',
      name   : 'meraki',
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    }
  },

  development: {
    log: {
      level: 'dev'
    },
    db: {
      url    : 'mongodb://localhost:27017',
      name   : 'meraki',
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    }
  }
}
