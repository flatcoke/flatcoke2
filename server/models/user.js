import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default (Sequelize, DataTypes) => {
  const User = Sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING(30),
        unique: {
          args: true,
          msg: 'The username is already in use',
        },
        validate: {
          is: /^[a-z0-9\_\-]+$/i,
          notEmpty: { msg: 'Username can not be null' },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: 'The email is already in use',
        },
        validate: {
          isEmail: true,
          notEmpty: { msg: 'Email can not be null' },
        },
      },
      provider: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      uid: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      passwordConfirmation: {
        type: DataTypes.VIRTUAL,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      createdAt: { field: 'created_at', type: DataTypes.DATE },
      updatedAt: { field: 'updated_at', type: DataTypes.DATE },
    },
    {
      tableName: 'users',
      defaultScope: {
        attributes: ['id', 'username', 'email', 'createdAt', 'updatedAt'],
      },
      instanceMethods: {
        authenticate: function authenticate(password) {
          return bcrypt.compareSync(password, this.passwordDigest)
        },
      },
    }
  )

  User.associate = models => {
    User.hasMany(models.Post, {
      foreignKey: 'userId',
      as: 'posts',
      onDelete: 'CASCADE',
    })
  }

  User.beforeValidate((user, options) => {})

  User.beforeCreate((user, option) => {
    console.log(user)
    console.log(user.email)
    user.email = user.email.toLowerCase()
    if (!user.password)
      user.passwordDigest = bcrypt.hashSync(
        user.password,
        bcrypt.genSaltSync(10)
      )
  })

  User.findOrCreateByOAuth = async ({ provider, email, username, uid }) => {
    const user = await User.findOne({ where: { provider, uid } })
    if (user) return user

    const hashedPassword = bcrypt.genSaltSync(10)
    return User.create({
      provider,
      email,
      username,
      uid,
      password: hashedPassword,
    })
  }

  User.findAndAuthenticate = async payload => {
    const { usernameOrEmail, password } = payload
    if (!usernameOrEmail && !password) {
      throw new Error('Missing required value')
    }
    const user = await User.find({
      where: {
        [Sequelize.Op.or]: [
          { username: usernameOrEmail },
          { email: usernameOrEmail },
        ],
      },
    })
    if (user && user.authenticate(payload.password)) {
      return user
    }
    return undefined
  }

  User.prototype.authenticate = function(password) {
    return bcrypt.compareSync(password, this.password)
  }

  User.prototype.toJWT = function() {
    const { id, username, email, isAdmin } = this
    return jwt.sign({ id, username, email, isAdmin }, process.env.SECRET)
  }

  return User
}
