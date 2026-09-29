const bookModel = require('../models/bookModel')

function parseBookId(value) {
  const id = Number(value)
  return Number.isInteger(id) && id > 0 ? id : null
}

function isValidBook({ title, author, publishedYear }) {
  return typeof title === 'string' && Boolean(title.trim()) &&
    typeof author === 'string' && Boolean(author.trim()) &&
    Number.isInteger(publishedYear)
}

function getBooks(req, res) {
  res.status(200).json(bookModel.getAll())
}

function getBook(req, res) {
  const id = parseBookId(req.params.bookId)
  const book = id ? bookModel.getById(id) : null

  if (!book) {
    return res.status(404).json({ message: 'Book not found' })
  }

  res.status(200).json(book)
}

function createBook(req, res) {
  const bookDetails = req.body || {}

  if (!isValidBook(bookDetails)) {
    return res.status(400).json({
      message: 'title, author, and an integer publishedYear are required',
    })
  }

  res.status(201).json(bookModel.create(bookDetails))
}

function updateBook(req, res) {
  const id = parseBookId(req.params.bookId)

  if (!id || !bookModel.getById(id)) {
    return res.status(404).json({ message: 'Book not found' })
  }

  const bookDetails = req.body || {}
  if (!isValidBook(bookDetails)) {
    return res.status(400).json({
      message: 'title, author, and an integer publishedYear are required',
    })
  }

  res.status(200).json(bookModel.update(id, bookDetails))
}

function deleteBook(req, res) {
  const id = parseBookId(req.params.bookId)

  if (!id || !bookModel.delete(id)) {
    return res.status(404).json({ message: 'Book not found' })
  }

  res.status(200).json({ message: 'Book deleted successfully' })
}

module.exports = { getBooks, getBook, createBook, updateBook, deleteBook }