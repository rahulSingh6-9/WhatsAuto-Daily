import express from 'express'
// import { sendDailySummary, getClientSummary } from '../controllers/whatsappController.js'
import { loginPage, loginAdmin, adminPage, getClients, adminLogout, showArgentPage, getClients30, getClients60, getClients90, chatPage, totalClients } from '../controllers/whatsAppController.js'
const router = express.Router()

router.get('/', loginPage)
router.get('/admin', adminPage)
router.get('/showArgent', showArgentPage)
router.get('/chats', chatPage)
router.get('/api/totalclients', totalClients)

router.get("/api/getclients", getClients);
router.get('/api/getclients30', getClients30)
router.get('/api/getclients60', getClients60)
router.get('/api/getclients90', getClients90)

router.post('/', loginAdmin)
router.post('/api/adminLogout', adminLogout)

// Health check
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Backend running fine 🚀'
  })
})


export default router
