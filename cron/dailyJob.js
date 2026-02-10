import cron from 'node-cron'

import { sendDailySummary } from '../controllers/whatsAppController.js'

export const scheduleDailyJob = () => {
cron.schedule("30 18 * * *", async () => {
  console.log('Running daily WhatsApp summary...');    
  await sendDailySummary()

})

}