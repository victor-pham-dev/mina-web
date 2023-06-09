import * as dotenv from 'dotenv'
dotenv.config()
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'

import { database } from './models/model.index'
import { CommonRoutes } from './routes/common.routes'
import { userRoutes } from './routes/user.routes'
import { RegisClassRoutes } from './routes/regis-class.routes'
import { ClassRoutes } from './routes/class.routes'
import { PostRoutes } from './routes/post.routes'
import { StudentRoutes } from './routes/students.router'
import { QuestionRoutes } from './routes/question.routes'

const app = express()

app.use(cors())
// app.use(express.json())
app.use(express.json({ limit: '25mb' }))
app.use(express.urlencoded({ limit: '25mb', extended: true }))
//connect to db
database.mongoose
  .connect(database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    //console.log('Connected to the database!')
  })
  .catch((err: any) => {
    //console.log('Cannot connect to the database!', err)
    process.exit()
  })

//

//Router list

CommonRoutes(app)
userRoutes(app)
ClassRoutes(app)
RegisClassRoutes(app)
PostRoutes(app)
StudentRoutes(app)
QuestionRoutes(app)

app.get('/', (req, res) => {
  res.send('This is mina api')
})
//

const PORT = process.env.PORT
app.listen(PORT, () => {
  //console.log(`Server is running on port ${PORT}.`)
})
