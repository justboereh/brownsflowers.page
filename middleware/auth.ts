import { useLocalStorage } from '@vueuse/core'

export default defineNuxtRouteMiddleware((to, from) => {
    const authCookie = useLocalStorage('.auth_brownsflowers', null)
    const noAuth = !authCookie.value || authCookie.value === ''

    if (noAuth && to.path === '/account') return navigateTo('/account/signin')
})
