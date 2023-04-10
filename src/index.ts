import dotenv from 'dotenv'
dotenv.config()

import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import { database } from './models/model.index'
import { CommonRoutes } from './routes/common.routes'
import { userRoutes } from './routes/user.routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

console.log(database.url)
//connect to db
database.mongoose
  .connect(database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database!')
  })
  .catch((err: any) => {
    console.log('Cannot connect to the database!', err)
    process.exit()
  })

//

//Router list

CommonRoutes(app)
//user
userRoutes(app)

//

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
