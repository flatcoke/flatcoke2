import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
import dbConfig from '../config/database'

const env = process.env.NODE_ENV || 'development'
const config = dbConfig[env]

let db = null // eslint-disable-line

if (!db) {
  const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  )
  db = {
    sequelize,
    Sequelize,
    models: {},
  }
  const dir = path.join(__dirname)
  fs.readdirSync(dir).forEach(file => {
    if (file !== 'index.js') {
      const modelDir = path.join(dir, file)
      const model = sequelize.import(modelDir)
      db.models[model.name] = model
    }
  })
  Object.keys(db.models).forEach(key => {
    if (db.models[key].associate) {
      db.models[key].associate(db.models)
    }
  })
}

export default db
