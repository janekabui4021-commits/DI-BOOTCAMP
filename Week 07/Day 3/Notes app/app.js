const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const notes = require('./notes')

const reportError = (action) => {
  try {
    action()
  } catch (error) {
    console.error(error.message)
    process.exitCode = 1
  }
}

yargs(hideBin(process.argv))
  .command('add', 'Add a note', (builder) => builder
    .option('title', { describe: 'The note title', type: 'string', demandOption: true })
    .option('body', { describe: 'The note body', type: 'string', demandOption: true }), (argv) => {
    reportError(() => {
      const result = notes.addNote(argv.title, argv.body)
      console.log(result.added ? 'Note added!' : 'Note already exists')
    })
  })
  .command('list', 'List all notes', () => {}, () => {
    reportError(() => {
      const allNotes = notes.getNotes()
      if (allNotes.length === 0) {
        console.log('No notes found.')
        return
      }
      console.log('Your notes:')
      allNotes.forEach((note) => console.log(`- ${note.title}`))
    })
  })
  .command('read', 'Read a note', (builder) => builder
    .option('title', { describe: 'The note title', type: 'string', demandOption: true }), (argv) => {
    reportError(() => {
      const note = notes.readNote(argv.title)
      if (!note) {
        console.log('Note not found')
        return
      }
      console.log(`${note.title}\n${note.body}`)
    })
  })
  .command('remove', 'Remove a note', (builder) => builder
    .option('title', { describe: 'The note title', type: 'string', demandOption: true }), (argv) => {
    reportError(() => {
      console.log(notes.removeNote(argv.title) ? 'Note removed!' : 'Note not found')
    })
  })
  .demandCommand(1, 'command not recognized')
  .strictCommands()
  .strictOptions()
  .fail((message, error) => {
    console.error(error ? message : 'command not recognized')
    process.exitCode = 1
  })
  .help()
  .parse()