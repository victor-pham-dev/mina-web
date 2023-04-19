import { Express, Router } from 'express'
import { commonAuth } from '../middleware/auth'
import { UserController } from '../controller/user.controller'

export const userRoutes = (app: Express) => {
  const router = Router()
  router.post('/', UserController.Register)
  router.post('/login/account', UserController.LoginWithAccount)
  router.get('/activeCode/:registerToken', UserController.CheckRegisterToken)
  router.get('/auth', commonAuth, UserController.Auth)

  app.use('/api/user', router)
}
