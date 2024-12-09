import express from 'express'
import postsController from '../Controllers/postsController.js'

const router = express.Router()

router.get('/', postsController.index)

router.get('/:id', postsController.show)

// router.get('/:tag', postsController.printByTag) removed method

router.post('/', postsController.store)

router.put('/:id', postsController.update)

router.delete('/:id', postsController.destroy)

export default  router