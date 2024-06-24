import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_uri: process.env.DB_URI,
    database_name: process.env.DB_NAME,
    default_password: process.env.DEFAULT_PASSWORD,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_access_expire_in: process.env.JWT_ACCESS_EXPIRE_IN,
    jwt_refresh_expire_in: process.env.JWT_REFRESH_EXPIRE_IN,
    salt: 10,
    reset_pass_ui_link: process.env.RESET_PASS_UI_LINK,
}
