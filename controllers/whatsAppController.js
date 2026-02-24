import path from 'path'
import { db } from '../services/db.js'
import { sendWhatsApp } from '../services/twilio.js'

const loginFile = path.join(process.cwd(), 'views', 'login.html')
const adminFile = path.join(process.cwd(), 'views', 'admin.html')
const showArgentFile = path.join(process.cwd(), 'views', 'showArgent.html')
const chatFile = path.join(process.cwd(), 'views', 'chat.html')

const getToday = () => new Date();

export const chatPage = (req, res) => {
     if(!req.session.admin){
        return res.redirect('/')
    }
    res.sendFile(chatFile)
}
export const loginPage = (req, res) => {
    res.sendFile(loginFile)
}
export const adminPage = async (req, res) => {
    if(!req.session.admin){
        return res.redirect('/')
    }
        res.sendFile(adminFile)
}
export const showArgentPage = async (req, res) => {
    if(!req.session.admin){
        return res.redirect('/')
    }
    res.sendFile(showArgentFile)
}
export const loginAdmin = async (req, res) => {
    const { admin_id, password } = req.body

    const [Admin] = await db.query(`select * from admin`)

    if (admin_id === Admin[0].Admin_id  && password === Admin[0].Admin_pass) {
        req.session.admin = true;
        res.redirect('/admin')
    } else {
        res.redirect('/')
    }
}

export const getClients = async (req, res) => {
   try{
     const search = req.query.search 

    let sql = `select * from clients  
                ${search ? 'where name like ? or id like ?' : ''}
                limit 10`

    const values = search ? [`%${search}%`, `%${search}%`] : []          
     const [data] = await db.execute(sql, values)
      res.json(data)  
   }catch(err) { console.error(err)}
}
export const adminLogout = async (req, res) => {
    req.session.admin = false
    res.redirect('/')
}

export const getClients30 = async (req, res) => {
    try{
        const [day30] = await db.query(`select * from clients where DATEDIFF(?, date) = 30`,
            [getToday()])

        res.json(day30)
    }
    catch(err){ console.log("Error fetching 30days clients:", err.message)}
}
export const getClients60 = async (req, res) => {
    try{
        const [day60] = await db.query(`select * from clients where DATEDIFF(?, date) = 60`,
            [getToday()])

        res.json(day60)
    }
    catch(err){ console.log("Error fetching 60days clients:", err.message)}
}
export const getClients90 = async (req, res) => {
    try{
        const [day90] = await db.query(`select * from clients where DATEDIFF(?, date) = 90`,
            [getToday()])

        res.json(day90)
    }
    catch(err){ console.log("Error fetching 90days clients:", err.message)}
}
export const totalClients = async (req, res) => {
    try{
        const [totalClientsData] = await db.query(`SELECT COUNT(*) AS total_clients FROM clients`)
        res.json(totalClientsData[0])
    }
    catch(err){ console.error('total client error: ', err)}
}

export const getClientSummary = async () => {
    try {

        // SQL queries for 30, 60, 90 days
        const [day30] = await db.query(
            `select name from clients where DATEDIFF(?, date) = 30`,
            [getToday()]
        )
        const [day60] = await db.query(
            `select name from clients where DATEDIFF(?, date) = 60`,
            [getToday()]
        )
        const [day90] = await db.query(
            `select name from clients where DATEDIFF(?, date) = 90`,
            [getToday()]
        )
        return { day30, day60, day90 };
    } catch (err) {
        console.log('Error fetching client summary:', err.message)
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