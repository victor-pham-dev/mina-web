import { Router, Express } from 'express'
import { adminAuth } from '../middleware/auth'
import { StudentController } from '../controller/student.controller'

export function StudentRoutes(app: Express) {
  const router = Router()
  router.post('/', adminAuth, StudentController.create)
  //   router.patch('/status', adminAuth, ClassController.updateStatus)
  //   router.delete('/:_id', adminAuth, ClassController.markDelete)
  router.get('/search', StudentController.search)
  //   router.get('/:_id', ClassController.getById)

  app.use('/api/student', router)
}
