// import { createConnection } from 'mysql2'
import { Deta } from "deta";

// const connection = createConnection(process.env.DATABASE_URL)

 export default defineEventHandler((event) => {
   event.context.deta = Deta(process.env.DETA_PROJECT_KEY)
})
