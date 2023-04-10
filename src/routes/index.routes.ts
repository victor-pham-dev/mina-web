import { Express, Request, Response, Router } from 'express';

export const indexRoutes = (app: Express) => {
  const router = Router()

  router.get('/', (req: Request, res: Response) => {
   res.send("Welcome to mina")
  })

  app.use('/', router)
}
