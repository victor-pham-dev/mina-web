import { Router, Express } from 'express'
import { adminAuth } from '../middleware/auth'
import { PostController } from '../controller/post.controller'

export function PostRoutes(app: Express) {
  const router = Router()
  router.get('/search', PostController.search)
  router.get('/id=:_id', PostController.getOne)
  router.post('/', adminAuth, PostController.create)
  // router.patch('/', adminAuth, PostController.update)
  router.delete('/id=:id', adminAuth, PostController.markDelete)

  app.use('/api/post', router)
}
