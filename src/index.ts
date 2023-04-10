import dotenv from 'dotenv'
dotenv.config()
import express, { Router } from 'express'
import cors from 'cors'
import { database } from './models/model.index'
import fs from 'fs'
import bodyParser from 'body-parser'
import { indexRoutes } from './routes/index.routes'


const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

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
indexRoutes(app)
//

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})

