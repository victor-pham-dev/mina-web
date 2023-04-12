import { Router, Express } from 'express'
import { RegisClassController } from '../controller/regis-class.controller'
import { adminAuth } from '../middleware/auth'

export function RegisClassRoutes(app: Express) {
  const router = Router()
  router.post('/', RegisClassController.regis)
  router.put('/status', adminAuth, RegisClassController.updateStatus)
  router.delete('/:id', adminAuth, RegisClassController.markDelete)

  app.use('/api/regis-class', router)
}
