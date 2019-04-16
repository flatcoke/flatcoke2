import { Router } from 'express'
import db from 'models'

const { Post } = db.models

const router = Router()

router.get('/', async (req, res) => {
  const result = await Post.findAll()
  res.send(result)
})

router.get('/:id', async (req, res) => {
  const { id } = req.query
  const post = await Post.find(id)
  res.send(post)
})

export default router
