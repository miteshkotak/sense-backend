import * as dotenv from 'dotenv'

dotenv.config()

const envVars =  process.env


const envConfig = {
    port: envVars.PORT,
    open_ai_key: envVars.OPENAI_API_KEY,
    database_url: envVars.DATABASE_URL,
    session_secret: envVars.SESSION_SECRET
}

export default envConfig