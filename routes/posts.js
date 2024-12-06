const express = require('express')
const router = express.Router()
const postsController = require('../Controllers/postsController.js')

router.get('/', postsController.index)

router.get('/:slug', postsController.show)

router.get('/:tag', postsController.printByTag)

router.post('/', postsController.store)

router.put('/:slug', postsController.update)

router.delete('/:slug', postsController.destroy)

module.exports = router