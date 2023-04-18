import { Express, Request, Response, Router } from 'express'
import { CommonController } from '../controller/common.controller'
import { adminAuth } from '../middleware/auth'

export const CommonRoutes = (app: Express) => {
  const router = Router()

  router.get('/', (req: Request, res: Response) => {
    res.send('Welcome to mina')
  })

  router.post('/send-mail', adminAuth, CommonController.Mailer)

  router.post('/file/', adminAuth, CommonController.SingleUpload)
  router.get('/file/:imageName', CommonController.getImageByName)

  app.use('/api', router)
}
