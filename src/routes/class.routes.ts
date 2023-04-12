import { Router, Express } from 'express'
import { adminAuth } from '../middleware/auth'
import { ClassController } from '../controller/class.controller'

export function ClassRoutes(app: Express) {
  const router = Router()
  router.post('/', adminAuth, ClassController.create)
  router.put('/status', adminAuth, ClassController.updateStatus)
  router.delete('/:id', adminAuth, ClassController.markDelete)

  app.use('/api/class', router)
}
