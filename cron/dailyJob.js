import cron from 'node-cron'

import { sendDailySummary } from '../controllers/whatsAppController.js'

export const scheduleDailyJob = () => {
cron.schedule("0 19 * * *", async () => {
  console.log('Running daily WhatsApp summary...');    
  await sendDailySummary()

})

}