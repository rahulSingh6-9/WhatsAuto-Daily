import express from 'express'
// import { sendDailySummary, getClientSummary } from '../controllers/whatsappController.js'

const router = express.Router()

// Health check
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Backend running fine 🚀'
  })
})

// Manual WhatsApp trigger (testing)
// router.get('/send-summary', async (req, res) => {
//   try {
//     await sendDailySummary()
//     res.json({ message: 'WhatsApp summary sent successfully ✅' })
//   } catch (err) {
//     res.status(500).json({ error: err.message })
//   }
// })

// Check today’s 30/60/90 day clients (without WhatsApp)
// router.get('/clients/summary', async (req, res) => {
//   try {
//     const summary = await getClientSummary()
//     res.json(summary)
//   } catch (err) {
//     res.status(500).json({ error: err.message })
//   }
// })

export default router
