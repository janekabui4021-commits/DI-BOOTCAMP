const fs = require('node:fs')
const path = require('node:path')
const _ = require('lodash')

const notesFile = path.join(__dirname, 'notes.json')

const readNotes = () => {
  try {
    const notes = JSON.parse(fs.readFileSync(notesFile, 'utf8'))
    if (!Array.isArray(notes)) throw new Error('The notes file must contain a JSON array.')
    return notes
  } catch (error) {
    if (error.code === 'ENOENT') return []
    if (error instanceof SyntaxError) throw new Error('The notes file contains invalid JSON.')
    throw error
  }
}

const writeNotes = (notes) => {
  fs.writeFileSync(notesFile, `${JSON.stringify(notes, null, 2)}\n`, 'utf8')
}

const findNoteIndex = (notes, title) => _.findIndex(notes, (note) => note.title === title)

const addNote = (title, body) => {
  const cleanTitle = typeof title === 'string' ? title.trim() : ''
  const cleanBody = typeof body === 'string' ? body.trim() : ''
  if (!cleanTitle) throw new Error('A note title is required.')
  if (!cleanBody) throw new Error('A note body is required.')

  const notes = readNotes()
  if (findNoteIndex(notes, cleanTitle) !== -1) return { added: false }
  notes.push({ title: cleanTitle, body: cleanBody })
  writeNotes(notes)
  return { added: true }
}

const getNotes = () => readNotes()

const readNote = (title) => {
  const cleanTitle = typeof title === 'string' ? title.trim() : ''
  const notes = readNotes()
  const index = findNoteIndex(notes, cleanTitle)
  return index === -1 ? null : notes[index]
}

const removeNote = (title) => {
  const cleanTitle = typeof title === 'string' ? title.trim() : ''
  const notes = readNotes()
  const index = findNoteIndex(notes, cleanTitle)
  if (index === -1) return false
  notes.splice(index, 1)
  writeNotes(notes)
  return true
}

module.exports = { addNote, getNotes, readNote, removeNote }