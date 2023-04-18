import { Router, Express } from 'express'
import { adminAuth } from '../middleware/auth'
import { ClassController } from '../controller/class.controller'

export function ClassRoutes(app: Express) {
  const router = Router()
  router.post('/', adminAuth, ClassController.create)
  router.patch('/status', adminAuth, ClassController.updateStatus)
  router.delete('/:_id', adminAuth, ClassController.markDelete)
  router.get('/search', ClassController.search)
  router.get('/:_id', ClassController.getById)

  app.use('/api/class', router)
}
