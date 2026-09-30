const authScreen = document.querySelector('#auth-screen')
const gameShell = document.querySelector('#game-shell')
const authForm = document.querySelector('#auth-form')
const authError = document.querySelector('#auth-error')
const gameList = document.querySelector('#game-list')
const lobbyScreen = document.querySelector('#lobby-screen')
const matchScreen = document.querySelector('#match-screen')
const board = document.querySelector('#game-board')
const toast = document.querySelector('#toast')

let authMode = 'login'
let token = localStorage.getItem('frontline-token') ?? ''
let username = localStorage.getItem('frontline-username') ?? ''
let currentGame = null
let pollTimer
let toastTimer
let actionPending = false

const api = async (route, options = {}) => {
  const headers = { ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...(options.headers ?? {}) }
  if (token) headers.Authorization = `Bearer ${token}`
  const response = await fetch(route, { ...options, headers })
  const data = response.status === 204 ? {} : await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.error ?? 'The request could not be completed.')
  return data
}

const showToast = (message) => {
  toast.textContent = message
  toast.classList.add('visible')
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 3000)
}

const setAuthMode = (mode) => {
  authMode = mode
  document.querySelectorAll('.auth-tab').forEach((button) => {
    const selected = button.dataset.mode === mode
    button.classList.toggle('active', selected)
    button.setAttribute('aria-pressed', String(selected))
  })
  const registering = mode === 'register'
  document.querySelector('#auth-eyebrow').textContent = registering ? 'New commander' : 'Welcome back'
  document.querySelector('#auth-title').textContent = registering ? 'Create your account.' : 'Enter the field.'
  document.querySelector('#auth-submit').innerHTML = registering
    ? 'Create account <span aria-hidden="true">↗</span>'
    : 'Sign in <span aria-hidden="true">↗</span>'
  document.querySelector('#password').autocomplete = registering ? 'new-password' : 'current-password'
  authError.hidden = true
}

const enterLobby = async () => {
  authScreen.hidden = true
  gameShell.hidden = false
  document.querySelector('#account-name').textContent = username
  lobbyScreen.hidden = false
  matchScreen.hidden = true
  await loadGames()
  clearInterval(pollTimer)
  pollTimer = setInterval(() => {
    if (!gameShell.hidden && !matchScreen.hidden) refreshGame()
    else if (!gameShell.hidden) loadGames()
  }, 2500)
}

const signOut = async () => {
  try { await api('/api/auth/logout', { method: 'POST' }) } catch {}
  clearInterval(pollTimer)
  localStorage.removeItem('frontline-token')
  localStorage.removeItem('frontline-username')
  token = ''
  username = ''
  currentGame = null
  gameShell.hidden = true
  authScreen.hidden = false
}

const loadGames = async () => {
  try {
    const { games } = await api('/api/games')
    renderGames(games)
  } catch (error) {
    showToast(error.message)
  }
}

const renderGames = (games) => {
  const openGames = games.filter((game) => game.status === 'waiting')
  document.querySelector('#field-count').textContent = `${openGames.length} OPEN`
  if (games.length === 0) {
    gameList.innerHTML = '<p class="empty-state">No fields are open yet. Start one and invite a friend.</p>'
    return
  }

  gameList.replaceChildren()
  games.forEach((game) => {
    const row = document.createElement('article')
    row.className = 'game-row'
    const copy = document.createElement('div')
    copy.className = 'game-row-copy'
    const title = document.createElement('strong')
    title.textContent = game.players.map((player) => player.username).join(' vs ') || 'Open field'
    const detail = document.createElement('span')
    detail.className = 'game-row-state'
    detail.textContent = `${game.id.toUpperCase()} · ${game.status === 'waiting' ? 'Waiting for opponent' : 'In progress'}`
    copy.append(title, detail)
    const button = document.createElement('button')
    button.className = 'small-button'
    button.type = 'button'
    const isPlayer = game.players.some((player) => player.username === username)
    button.textContent = isPlayer ? 'Return' : game.status === 'waiting' ? 'Join field' : 'In play'
    button.disabled = !isPlayer && game.status !== 'waiting'
    if (!button.disabled) button.addEventListener('click', () => openGame(game.id, !isPlayer))
    row.append(copy, button)
    gameList.append(row)
  })
}

const showMatch = (game) => {
  currentGame = game
  lobbyScreen.hidden = true
  matchScreen.hidden = false
  document.querySelector('#game-id').textContent = game.id.toUpperCase()
  renderGame(game)
}

const openGame = async (gameId, join) => {
  try {
    const result = join
      ? await api(`/api/games/${encodeURIComponent(gameId)}/join`, { method: 'POST' })
      : await api(`/api/games/${encodeURIComponent(gameId)}`)
    showMatch(result.game)
  } catch (error) {
    showToast(error.message)
    loadGames()
  }
}

const refreshGame = async () => {
  if (!currentGame) return
  try {
    const { game } = await api(`/api/games/${encodeURIComponent(currentGame.id)}`)
    if (JSON.stringify(game) !== JSON.stringify(currentGame)) showMatch(game)
  } catch (error) {
    showToast(error.message)
    backToLobby()
  }
}

const renderPlayers = (game) => {
  const container = document.querySelector('#players-list')
  container.replaceChildren()
  document.querySelector('#player-count').textContent = `${game.players.length} / 2`
  game.players.forEach((player) => {
    const row = document.createElement('div')
    row.className = 'player-row'
    const mark = document.createElement('span')
    mark.className = `player-mark side-${player.side.toLowerCase()}`
    mark.textContent = player.side
    const copy = document.createElement('span')
    copy.className = 'player-copy'
    const name = document.createElement('strong')
    name.textContent = player.username
    const side = document.createElement('span')
    side.textContent = `Side ${player.side}`
    copy.append(name, side)
    row.append(mark, copy)
    if (player.username === username) {
      const you = document.createElement('span')
      you.className = 'you-mark'
      you.textContent = 'YOU'
      row.append(you)
    }
    container.append(row)
  })
  if (game.players.length === 1) {
    const waiting = document.createElement('p')
    waiting.className = 'empty-state'
    waiting.textContent = 'Share the field ID to invite a second player.'
    container.append(waiting)
  }
}

const renderBoard = (game) => {
  board.replaceChildren()
  const playersByCell = new Map(game.players.map((player) => [`${player.position.x},${player.position.y}`, player]))
  const basesByCell = new Map(game.players.map((player) => [`${player.base.x},${player.base.y}`, player]))
  const obstacles = new Set(game.obstacles.map((cell) => `${cell.x},${cell.y}`))

  for (let y = 0; y < 10; y += 1) {
    for (let x = 0; x < 10; x += 1) {
      const key = `${x},${y}`
      const cell = document.createElement('div')
      cell.className = 'grid-cell'
      cell.setAttribute('role', 'gridcell')
      cell.setAttribute('aria-label', `Column ${x + 1}, row ${y + 1}`)
      const coordinate = document.createElement('span')
      coordinate.className = 'cell-coordinate'
      coordinate.textContent = `${String.fromCharCode(65 + x)}${y + 1}`
      cell.append(coordinate)

      const base = basesByCell.get(key)
      if (base) {
        cell.classList.add(`base-${base.side.toLowerCase()}`)
        const baseLabel = document.createElement('span')
        baseLabel.className = 'cell-base'
        baseLabel.textContent = `${base.side} HQ`
        cell.append(baseLabel)
      }

      if (obstacles.has(key)) {
        cell.classList.add('obstacle')
        const rock = document.createElement('span')
        rock.className = 'rock'
        rock.setAttribute('aria-label', 'Obstacle')
        cell.append(rock)
      }

      const player = playersByCell.get(key)
      if (player) {
        const unit = document.createElement('span')
        unit.className = `unit-token side-${player.side.toLowerCase()}`
        unit.textContent = player.side
        cell.append(unit)
        cell.setAttribute('aria-label', `${player.username} on ${player.side} base at ${String.fromCharCode(65 + x)}${y + 1}`)
      }
      board.append(cell)
    }
  }
}

const renderGame = (game) => {
  document.querySelector('#game-id').textContent = game.id.toUpperCase()
  const status = document.querySelector('#match-status')
  status.textContent = game.status === 'waiting' ? 'WAITING' : game.status === 'finished' ? 'FINISHED' : 'IN PLAY'
  status.className = `match-status ${game.status}`
  const isMyTurn = game.status === 'active' && game.turn === username
  const myPlayer = game.players.find((player) => player.username === username)
  const opponent = game.players.find((player) => player.username !== username)

  if (game.status === 'waiting') {
    document.querySelector('#turn-name').textContent = 'Awaiting opponent'
    document.querySelector('#turn-hint').textContent = 'Copy the field ID and send it to a friend.'
    document.querySelector('#command-hint').textContent = 'No moves until a second player joins.'
  } else if (game.status === 'finished') {
    document.querySelector('#turn-name').textContent = `${game.winner} wins`
    document.querySelector('#turn-hint').textContent = game.winner === username ? 'Base captured. Field secured.' : 'Your base has fallen.'
    document.querySelector('#command-hint').textContent = 'This field is complete.'
  } else {
    document.querySelector('#turn-name').textContent = isMyTurn ? 'Your move' : `${game.turn}'s move`
    document.querySelector('#turn-hint').textContent = isMyTurn ? 'Choose a direction or attack an adjacent base.' : 'Waiting for the opposing commander.'
    document.querySelector('#command-hint').textContent = isMyTurn ? 'One square per turn.' : 'Commands are locked until your turn.'
  }

  document.querySelectorAll('[data-direction]').forEach((button) => {
    button.disabled = !isMyTurn || actionPending
  })
  const adjacentToBase = myPlayer && opponent && Math.abs(myPlayer.position.x - opponent.base.x) + Math.abs(myPlayer.position.y - opponent.base.y) === 1
  document.querySelector('#attack-button').disabled = !isMyTurn || !adjacentToBase || actionPending
  document.querySelector('#action-feedback').textContent = ''

  renderPlayers(game)
  renderBoard(game)
  const log = document.querySelector('#move-log')
  log.replaceChildren()
  game.log.slice().reverse().forEach((entry) => {
    const item = document.createElement('li')
    item.textContent = entry.text
    log.append(item)
  })
}

const performAction = async (route, body) => {
  if (!currentGame || actionPending) return
  actionPending = true
  renderGame(currentGame)
  try {
    const { game } = await api(`/api/games/${encodeURIComponent(currentGame.id)}/${route}`, {
      method: 'POST',
      body: JSON.stringify(body),
    })
    showMatch(game)
  } catch (error) {
    document.querySelector('#action-feedback').textContent = error.message
    showToast(error.message)
    refreshGame()
  } finally {
    actionPending = false
    if (currentGame) renderGame(currentGame)
  }
}

const backToLobby = () => {
  currentGame = null
  lobbyScreen.hidden = false
  matchScreen.hidden = true
  loadGames()
}

document.querySelectorAll('.auth-tab').forEach((button) => button.addEventListener('click', () => setAuthMode(button.dataset.mode)))

authForm.addEventListener('submit', async (event) => {
  event.preventDefault()
  const button = document.querySelector('#auth-submit')
  button.disabled = true
  authError.hidden = true
  try {
    const result = await api(`/api/auth/${authMode === 'register' ? 'register' : 'login'}`, {
      method: 'POST',
      body: JSON.stringify({
        username: document.querySelector('#username').value.trim(),
        password: document.querySelector('#password').value,
      }),
    })
    token = result.token
    username = result.username
    localStorage.setItem('frontline-token', token)
    localStorage.setItem('frontline-username', username)
    await enterLobby()
  } catch (error) {
    authError.textContent = error.message
    authError.hidden = false
  } finally {
    button.disabled = false
  }
})

document.querySelector('#create-game').addEventListener('click', async () => {
  try {
    const { game } = await api('/api/games', { method: 'POST' })
    showMatch(game)
  } catch (error) {
    showToast(error.message)
  }
})

document.querySelector('#back-to-lobby').addEventListener('click', backToLobby)
document.querySelector('#logout-button').addEventListener('click', signOut)
document.querySelector('#copy-game-id').addEventListener('click', async () => {
  if (!currentGame) return
  try {
    await navigator.clipboard.writeText(currentGame.id)
    showToast('Field ID copied. Send it to your opponent.')
  } catch {
    showToast(`Field ID: ${currentGame.id}`)
  }
})

document.querySelectorAll('[data-direction]').forEach((button) => {
  button.addEventListener('click', () => performAction('move', { direction: button.dataset.direction }))
})
document.querySelector('#attack-button').addEventListener('click', () => performAction('attack', {}))

const restoreSession = async () => {
  if (!token) return
  try {
    const result = await api('/api/auth/me')
    username = result.username
    localStorage.setItem('frontline-username', username)
    await enterLobby()
  } catch {
    localStorage.removeItem('frontline-token')
    localStorage.removeItem('frontline-username')
    token = ''
    username = ''
  }
}

restoreSession()