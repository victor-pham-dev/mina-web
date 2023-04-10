const dbConfig = require('../config/db.config.ts')

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

interface databaseProps {
  mongoose: any
  url: string
}
const database: databaseProps = {
  mongoose: mongoose,
  url: dbConfig.url,
}

export { database }
