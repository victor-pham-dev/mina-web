import { Express, Request, Response, Router } from 'express';
import { SendMail } from '../controller/common.controller';
import { adminAuth } from '../middleware/auth';

export const CommonRoutes = (app: Express) => {
  const router = Router()

  router.get('/', (req: Request, res: Response) => {
   res.send("Welcome to mina")
  })

  router.post('/send-mail', adminAuth, SendMail)

  app.use('/api', router)
}
