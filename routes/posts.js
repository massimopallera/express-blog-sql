const express = require('express')
const router = express.Router()
const postsController = require('../Controllers/postsController.js')

router.get('/', postsController.index)

router.get('/:id', postsController.show)

// router.get('/:tag', postsController.printByTag) removed method

router.post('/', postsController.store)

router.put('/:id', postsController.update)

router.delete('/:id', postsController.destroy)

module.exports = router