import {db} from '../services/db.js'
import { sendWhatsApp } from '../services/twilio.js'

export const getClientSummary = async () => {
    try{
        const today = new Date()

        // SQL queries for 30, 60, 90 days
        const [day30] = await db.query(
            `select name from clients where DATEDIFF(?, date) = 30`,
            [today]
        )
        const [day60] = await db.query(
            `select name from clients where DATEDIFF(?, date) = 60`,
            [today]
        )
        const [day90] = await db.query(
            `select name from clients where DATEDIFF(?, date) = 90`,
            [today]
        )
        return { day30, day60, day90 };
    }catch(err){console.log('Error fetching client summary:', err.message)
         return { day30: [], day60: [], day90: [] };
    }
}

/**
 * Generate summary message as string
 */
export const generateMessage = (summary) => {
  const formatNames = (arr) => (arr.length ? arr.map(c => c.name).join(', ') : 'None');

  return `
30 Days Clients: ${formatNames(summary.day30)}
60 Days Clients: ${formatNames(summary.day60)}
90 Days Clients: ${formatNames(summary.day90)}
  `
}

/**
 * Send WhatsApp summary
 */
export const sendDailySummary = async () => {
  const summary = await getClientSummary();
  const message = generateMessage(summary);
  await sendWhatsApp(message);
};