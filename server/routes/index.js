import { Router } from 'express'
import postRouter from './posts'

const router = Router()

router.use('/v1/posts', postRouter)

export default router
