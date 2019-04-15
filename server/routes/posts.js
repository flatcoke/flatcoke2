import { Router } from 'express'
import db from 'models'

const { Post } = db.models

const router = Router()

router.get('/', async (req, res) => {
  // res.send('Post Running')
  const result = await Post.findAll()
  res.send(result)
})

export default router
