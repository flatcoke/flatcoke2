import bcrypt from 'bcrypt'

export default (Sequelize, DataTypes) => {
  const User = Sequelize.define(
    'User',
    {
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
      },
      uid: {
        type: DataTypes.STRING,
      },
      passwordDigest: {
        field: 'password',
        type: DataTypes.STRING,
      },
      password: {
        field: 'passwordVirtual',
        type: DataTypes.VIRTUAL,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      passwordConfirmation: {
        type: DataTypes.VIRTUAL,
      },
      createdAt: { field: 'created_at', type: DataTypes.DATE },
      updatedAt: { field: 'updated_at', type: DataTypes.DATE },
    },
    {
      tableName: 'users',
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
    user.email = user.email.toLowerCase()
    if (!user.password)
      user.passwordDigest = bcrypt.hashSync(
        user.password,
        bcrypt.genSaltSync(10)
      )
  })

  User.createByOAuth = ({provider, email, password, id}) => {
    User.create({ provider, email, password, id})
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
    return bcrypt.compareSync(password, this.passwordDigest)
  }

  return User
}
