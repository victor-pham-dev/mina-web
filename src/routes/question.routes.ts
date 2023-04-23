import { Router, Express } from 'express'
import { adminAuth } from '../middleware/auth'
import { QuestionController } from '../controller/question.controller'

export function QuestionRoutes(app: Express) {
  const router = Router()
  router.post('/', adminAuth, QuestionController.create)
  // router.patch('/status', adminAuth, ClassController.updateStatus)
  //   router.delete('/:_id', adminAuth, ClassController.markDelete)
  router.get('/test', QuestionController.getTestQuestions)
  //   router.get('/id=:_id', ClassController.getById)

  app.use('/api/question', router)
}
