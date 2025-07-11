import { Router } from 'express'

const router = Router()

router.get('/health', (req, res) => {
  const data = {
    uptime: process.uptime(),
    message: 'OK',
    date: new Date()
  }

  res.status(200).send(data)
})

export default router;
