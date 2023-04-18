import { Router, Express } from 'express'
import { RegisClassController } from '../controller/regis-class.controller'
import { adminAuth } from '../middleware/auth'

export function RegisClassRoutes(app: Express) {
  const router = Router()
  router.post('/', RegisClassController.regis)
  router.put('/', adminAuth, RegisClassController.updateStatus)
  router.delete('/:_id', adminAuth, RegisClassController.markDelete)
  router.get('/search', adminAuth, RegisClassController.search)

  app.use('/api/regis-class', router)
}
