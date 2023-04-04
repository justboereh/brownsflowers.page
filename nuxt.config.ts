const API_BASEURL =
    process.env.NODE_ENV === 'production'
        ? process.env.API_BASEURL_DEV
        : process.env.API_BASEURL_PROD

export default defineNuxtConfig({
    modules: ['nuxt-windicss'],
    ignore: ['/pages/api/**/*.*'],
})
