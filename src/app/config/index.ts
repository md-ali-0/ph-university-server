import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
    port: process.env.PORT,
    database_uri: process.env.DB_URI,
    database_name: process.env.DB_NAME,
    default_password: process.env.DEFAULT_PASSWORD,
    salt: 10
}
