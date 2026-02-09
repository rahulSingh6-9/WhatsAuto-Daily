import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { scheduleDailyJob } from './cron/dailyJob.js'


const app = express()
app.use(express.json())

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

// Start daily cron job
scheduleDailyJob()