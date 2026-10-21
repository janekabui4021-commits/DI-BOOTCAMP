const form = document.querySelector('#auth-form')
const submitButton = document.querySelector('#submit-button')
const message = document.querySelector('#form-message')
const fields = [...form.querySelectorAll('input[required]')]

const updateSubmitState = () => {
  submitButton.disabled = fields.some((field) => !field.value.trim() || !field.checkValidity())
}

fields.forEach((field) => field.addEventListener('input', updateSubmitState))
updateSubmitState()

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  updateSubmitState()
  if (submitButton.disabled) return

  const payload = Object.fromEntries(new FormData(form).entries())
  const mode = form.dataset.mode
  submitButton.disabled = true
  submitButton.textContent = mode === 'register' ? 'Creating account...' : 'Signing in...'
  message.textContent = ''
  message.classList.remove('success')

  try {
    const response = await fetch(`/${mode}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const result = await response.json()
    if (!response.ok) throw new Error(result.error || 'Request failed.')

    message.textContent = result.message
    message.classList.add('success')
    if (mode === 'register') {
      form.reset()
      updateSubmitState()
    }
  } catch (error) {
    message.textContent = error.message
  } finally {
    submitButton.innerHTML = mode === 'register'
      ? 'Create account <span aria-hidden="true">↗</span>'
      : 'Sign in <span aria-hidden="true">↗</span>'
    updateSubmitState()
  }
})