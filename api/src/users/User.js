const bcrypt = require('bcrypt')
const DataSource = require('../utils/DataSource')
if (process.env.NODE_ENV !== 'production') {
  var dotenv = require('dotenv')
  dotenv.config()
}

const { SALT_ROUNDS } = process.env

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

  async login({ email, password }, authenticate, login) {
    try {
      const { user } = await authenticate('graphql-local', {
        email,
        password,
      })
      await login(user)
      return user
    } catch (error) {
      throw error
    }
  }

  async signup(user) {
    try {
      const [existingUser] = await this.Model.find({ email: user.email })
      if (!!existingUser) {
        throw new Error('User with email already exists')
      }
      const newUser = await this.Model.create({
        ...user,
        password: bcrypt.hashSync(user.password, parseInt(SALT_ROUNDS)),
      })
      return newUser
    } catch (error) {
      throw error
    }
  }
}

module.exports = {
  User,
}
