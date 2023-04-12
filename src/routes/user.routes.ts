import { Express, Router } from 'express'
import { commonAuth } from '../middleware/auth'
import { Register, LoginWithAccount, Auth } from '../controller/user.controller'

export const userRoutes = (app: Express) => {
  const router = Router()
  router.post('/', Register)
  router.post('/login/account', LoginWithAccount)
  router.get('/auth', commonAuth, Auth)

  app.use('/api/user', router)
}
