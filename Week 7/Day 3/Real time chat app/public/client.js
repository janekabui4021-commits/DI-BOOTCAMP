const socket = io()

const entryScreen = document.querySelector('#entry-screen')
const chatApp = document.querySelector('#chat-app')
const entryForm = document.querySelector('#entry-form')
const usernameInput = document.querySelector('#username-input')
const roomInput = document.querySelector('#room-input')
const entryError = document.querySelector('#entry-error')
const roomForm = document.querySelector('#room-form')
const newRoomInput = document.querySelector('#new-room-input')
const messageForm = document.querySelector('#message-form')
const messageInput = document.querySelector('#message-input')
const messageList = document.querySelector('#message-list')
const userList = document.querySelector('#user-list')
const toast = document.querySelector('#toast')
const connectionLabel = document.querySelector('#connection-label')
const connectionIndicator = document.querySelector('.connection-indicator')
const peopleToggle = document.querySelector('#people-toggle')
const peopleSidebar = document.querySelector('.people-sidebar')

let username = ''
let currentRoom = ''
let toastTimer
let unreadMessages = 0

usernameInput.value = localStorage.getItem('common-room-username') ?? ''

const normalizeRoom = (value) => value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 32)
const initials = (name) => name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || '?'
const palette = ['avatar-blue', 'avatar-coral', 'avatar-lime', 'avatar-violet']
const avatarClass = (name) => palette[[...name].reduce((sum, character) => sum + character.charCodeAt(0), 0) % palette.length]

const showToast = (message) => {
  toast.textContent = message
  toast.classList.add('visible')
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 3200)
}

const setConnection = (connected) => {
  connectionLabel.textContent = connected ? 'Connected' : 'Reconnecting'
  connectionIndicator.classList.toggle('offline', !connected)
}

const updateRoomSelection = () => {
  document.querySelectorAll('.room-link').forEach((button) => {
    const selected = button.dataset.room === currentRoom
    button.classList.toggle('active', selected)
    if (selected) button.setAttribute('aria-current', 'page')
    else button.removeAttribute('aria-current')
  })
}

const addRoomButton = (room) => {
  if (document.querySelector(`[data-room="${CSS.escape(room)}"]`)) return
  const button = document.createElement('button')
  button.className = 'room-link'
  button.type = 'button'
  button.dataset.room = room
  const hash = document.createElement('span')
  hash.className = 'hash'
  hash.textContent = '#'
  button.append(hash, document.createTextNode(` ${room}`))
  document.querySelector('#room-list').append(button)
}

const joinRoom = (roomValue) => {
  const room = normalizeRoom(roomValue)
  if (!room) {
    entryError.textContent = 'Room names need at least one letter or number.'
    entryError.hidden = false
    return
  }

  currentRoom = room
  chatApp.hidden = false
  entryScreen.hidden = true
  document.querySelector('#current-room').textContent = room
  document.querySelector('#welcome-room').textContent = room
  messageList.innerHTML = ''
  updateRoomSelection()
  addRoomButton(room)
  socket.emit('room:join', { username, room })
}

const formatTime = (value) => new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(new Date(value))

const createMessage = (message) => {
  if (message.system) {
    const systemMessage = document.createElement('p')
    systemMessage.className = 'system-message'
    systemMessage.textContent = message.text
    return systemMessage
  }

  const article = document.createElement('article')
  article.className = 'message'
  const avatar = document.createElement('span')
  avatar.className = `avatar ${avatarClass(message.username)}`
  avatar.textContent = initials(message.username)

  const content = document.createElement('div')
  content.className = 'message-content'
  const meta = document.createElement('div')
  meta.className = 'message-meta'
  const author = document.createElement('strong')
  author.textContent = message.username
  const time = document.createElement('time')
  time.dateTime = message.sentAt
  time.textContent = formatTime(message.sentAt)
  meta.append(author, time)

  const text = document.createElement('p')
  text.className = 'message-text'
  text.textContent = message.text
  content.append(meta, text)
  article.append(avatar, content)
  return article
}

const appendMessage = (message) => {
  messageList.append(createMessage(message))
  messageList.scrollTop = messageList.scrollHeight
}

const renderUsers = (users) => {
  userList.replaceChildren()
  users.forEach((user) => {
    const item = document.createElement('li')
    item.className = 'user-item'
    const avatar = document.createElement('span')
    avatar.className = `avatar ${avatarClass(user.username)}`
    avatar.textContent = initials(user.username)
    const name = document.createElement('span')
    name.className = 'user-name'
    name.textContent = user.username
    item.append(avatar, name)
    if (user.id === socket.id) {
      const you = document.createElement('span')
      you.className = 'you-tag'
      you.textContent = 'YOU'
      item.append(you)
    }
    userList.append(item)
  })
  document.querySelector('#people-count').textContent = users.length
  document.querySelector('#toggle-user-count').textContent = users.length
  document.querySelector('#header-user-count').textContent = `${users.length} ${users.length === 1 ? 'person' : 'here'}`
}

entryForm.addEventListener('submit', (event) => {
  event.preventDefault()
  username = usernameInput.value.trim().slice(0, 24)
  if (!username) {
    entryError.textContent = 'Add a name so people know who joined.'
    entryError.hidden = false
    usernameInput.focus()
    return
  }

  localStorage.setItem('common-room-username', username)
  document.querySelector('#my-name').textContent = username
  document.querySelector('#my-avatar').textContent = initials(username)
  entryError.hidden = true
  if ('Notification' in window && Notification.permission === 'default') Notification.requestPermission()
  joinRoom(roomInput.value)
})

roomForm.addEventListener('submit', (event) => {
  event.preventDefault()
  if (!newRoomInput.value.trim()) return
  joinRoom(newRoomInput.value)
  newRoomInput.value = ''
})

document.querySelector('#room-list').addEventListener('click', (event) => {
  const button = event.target.closest('[data-room]')
  if (button) joinRoom(button.dataset.room)
})

document.querySelector('#leave-button').addEventListener('click', () => {
  socket.emit('room:leave')
})

peopleToggle.addEventListener('click', () => {
  const isOpen = peopleSidebar.classList.toggle('visible')
  peopleToggle.setAttribute('aria-expanded', String(isOpen))
})

document.addEventListener('click', (event) => {
  if (!peopleSidebar.classList.contains('visible')) return
  if (peopleSidebar.contains(event.target) || peopleToggle.contains(event.target)) return
  peopleSidebar.classList.remove('visible')
  peopleToggle.setAttribute('aria-expanded', 'false')
})

messageForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const text = messageInput.value.trim()
  if (!text || !currentRoom) return
  socket.emit('chat:send', text)
  messageInput.value = ''
  messageInput.style.height = 'auto'
  messageInput.focus()
})

messageInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    messageForm.requestSubmit()
  }
})

messageInput.addEventListener('input', () => {
  messageInput.style.height = 'auto'
  messageInput.style.height = `${Math.min(messageInput.scrollHeight, 120)}px`
})

socket.on('connect', () => {
  setConnection(true)
  if (username && currentRoom) socket.emit('room:join', { username, room: currentRoom })
})

socket.on('disconnect', () => setConnection(false))
socket.on('room:history', (messages) => {
  messageList.replaceChildren()
  if (messages.length === 0) {
    const welcome = document.createElement('div')
    welcome.className = 'room-welcome'
    const mark = document.createElement('span')
    mark.className = 'welcome-mark'
    mark.textContent = '#'
    const heading = document.createElement('h2')
    heading.append('Welcome to ')
    const roomName = document.createElement('span')
    roomName.textContent = currentRoom
    heading.append(roomName)
    const description = document.createElement('p')
    description.textContent = 'This is the beginning of something good.'
    welcome.append(mark, heading, description)
    messageList.append(welcome)
  } else {
    messages.forEach(appendMessage)
  }
})

socket.on('room:joined', ({ room, username: joinedName }) => {
  currentRoom = room
  username = joinedName
  document.querySelector('#current-room').textContent = room
  document.querySelector('#welcome-room').textContent = room
  updateRoomSelection()
  addRoomButton(room)
})

socket.on('room:users', renderUsers)
socket.on('chat:message', (message) => {
  appendMessage(message)
  if (message.system || message.userId === socket.id) return
  showToast(`${message.username} sent a message`)
  if (document.hidden && 'Notification' in window && Notification.permission === 'granted') {
    new Notification(`New message in #${currentRoom}`, { body: `${message.username}: ${message.text.slice(0, 120)}` })
  }
  if (document.hidden) {
    unreadMessages += 1
    document.title = `(${unreadMessages}) Common Room`
  }
})

socket.on('chat:error', (message) => showToast(message))
socket.on('room:left', () => {
  currentRoom = ''
  chatApp.hidden = true
  entryScreen.hidden = false
  userList.replaceChildren()
  messageList.replaceChildren()
  entryError.hidden = true
  roomInput.value = 'lobby'
  usernameInput.value = username
  usernameInput.focus()
})

document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    unreadMessages = 0
    document.title = 'Common Room | Real-time chat'
  }
})