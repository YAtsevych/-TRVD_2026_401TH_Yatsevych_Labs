export async function Register(email, password) {
  if (!email.includes('@')) {
    throw new Error('Wrong email')
  }

  if (password.length < 6) {
    throw new Error('Password is too short')
  }
  const link = `${import.meta.env.VITE_API_URL}`
  const response = await fetch(`${link}/api/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message)
  }

  return await data
}
