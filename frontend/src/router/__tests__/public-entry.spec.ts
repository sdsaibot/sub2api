import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import router from '@/router'

describe('public entry redirects', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('registers / and legacy /home as redirects to the login route', () => {
    const routes = router.getRoutes()
    expect(routes.find((route) => route.path === '/')?.redirect).toBe('/login')
    expect(routes.find((route) => route.path === '/home')?.redirect).toBe('/login')
    expect(routes.find((route) => route.name === 'Login')?.path).toBe('/login')
  })

  it('sends an anonymous visitor from / to the login page', async () => {
    await router.push('/')

    expect(router.currentRoute.value.path).toBe('/login')
    expect(router.currentRoute.value.name).toBe('Login')
  })

  it('sends an anonymous visitor from /home to the login page', async () => {
    await router.push('/home')

    expect(router.currentRoute.value.path).toBe('/login')
    expect(router.currentRoute.value.name).toBe('Login')
  })
})
