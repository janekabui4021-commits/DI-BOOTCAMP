# Notes App

A Node.js command-line app that stores notes in `notes.json`.

## Setup

```powershell
npm install
```

## Commands

```powershell
node app add --title="Note Title" --body="Note body"
node app list
node app read --title="Note Title"
node app remove --title="Note Title"
```

The `add` command rejects duplicate titles. `read` and `remove` report `Note not found` when no matching title exists. Unknown commands print `command not recognized`.