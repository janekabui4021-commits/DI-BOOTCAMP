let books = [
  { id: 1, title: 'The Hobbit', author: 'J.R.R. Tolkien', publishedYear: 1937 },
  { id: 2, title: 'Pride and Prejudice', author: 'Jane Austen', publishedYear: 1813 },
]
let nextBookId = books.length + 1

function getAll() {
  return books
}

function getById(id) {
  return books.find((book) => book.id === id)
}

function create(bookDetails) {
  const book = { id: nextBookId++, ...bookDetails }
  books.push(book)
  return book
}

function update(id, bookDetails) {
  const bookIndex = books.findIndex((book) => book.id === id)
  books[bookIndex] = { id, ...bookDetails }
  return books[bookIndex]
}

function remove(id) {
  const bookIndex = books.findIndex((book) => book.id === id)
  if (bookIndex === -1) {
    return false
  }

  books.splice(bookIndex, 1)
  return true
}

module.exports = { getAll, getById, create, update, delete: remove }