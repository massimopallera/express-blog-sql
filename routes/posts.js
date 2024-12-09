import express from 'express'
const router = express.Router()
import postsController from '../Controllers/postsController.js'

router.get('/', postsController.index)

router.get('/:id', postsController.show)

// router.get('/:tag', postsController.printByTag) removed method

router.post('/', postsController.store)

router.put('/:id', postsController.update)

router.delete('/:id', postsController.destroy)

export default  router