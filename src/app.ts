import cors from 'cors'
import express, { Application } from 'express'
import router from './app/routes'


const app: Application = express()

// Parser

app.use(express.json())
app.use(cors())

app.use('/api/v1/', router);

export default app
