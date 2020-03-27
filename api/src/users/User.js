const DataSource = require('../utils/DataSource')

class User extends DataSource {
  constructor() {
    super()
    this.model = {
      name: 'User',
      schema: {
        id: String,
        name: String,
        email: String,
        handle: String,
        password: String,
      },
    }
  }
}

module.exports = {
  User,
}
