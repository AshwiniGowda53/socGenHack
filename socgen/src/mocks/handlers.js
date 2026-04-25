import { http, HttpResponse } from 'msw'

const mockUser = {
  customerId: "523456789",
  password: "password123",
  name: "Ashwini"
}

const generateToken = (payload) => btoa(JSON.stringify(payload))

export const handlers = [
  http.post('/login', async ({ request }) => {
    const body = await request.json()

    if (
      body.customerId === mockUser.customerId &&
      body.password === mockUser.password
    ) {
      return HttpResponse.json({
        accessToken: generateToken({ exp: Date.now() + 60000 }),
        refreshToken: generateToken({ exp: Date.now() + 300000 }),
        user: mockUser
      })
    }

    return HttpResponse.json({ message: "Invalid credentials" }, { status: 401 })
  }),

  http.post('/refresh', async ({ request }) => {
    const { refreshToken } = await request.json()

    if (!refreshToken) {
      return HttpResponse.json({ message: "Invalid" }, { status: 401 })
    }

    return HttpResponse.json({
      accessToken: generateToken({ exp: Date.now() + 60000 }),
      refreshToken: generateToken({ exp: Date.now() + 300000 })
    })
  })
]