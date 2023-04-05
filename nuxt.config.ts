declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DATABASE_URL: string
            DETA_PROJECT_KEY: string
        }
    }
}

export default defineNuxtConfig({
    modules: ['nuxt-windicss'],
})
