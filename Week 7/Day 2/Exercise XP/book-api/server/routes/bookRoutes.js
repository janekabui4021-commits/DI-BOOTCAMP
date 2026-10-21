const express = require('express')
const bookController = require('../controllers/bookController')

const router = express.Router()

router.get('/', bookController.getBooks)
router.get('/:bookId', bookController.getBook)
router.post('/', bookController.createBook)
router.put('/:bookId', bookController.updateBook)
router.delete('/:bookId', bookController.deleteBook)

module.exports = router