import express from 'express'
import session from 'express-session'
import dotenv from 'dotenv'
dotenv.config()
import { scheduleDailyJob } from './cron/dailyJob.js'
import router from './routes/whatsappRoutes.js'

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(session({
    secret: 'my_admin_secret',   // koi bhi strong string
    resave: false,
    saveUninitialized: false
}))

app.use('/', router)

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

// Start daily cron job
scheduleDailyJob()