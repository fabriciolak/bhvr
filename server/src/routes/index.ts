import { Router } from "express"
import * as healthRoutes from './health'

export * from './health'

const router = Router()

// /api/v1/
router.use('/v1', healthRoutes.default)

export default router
