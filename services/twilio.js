import dotenv from 'dotenv'
dotenv.config()
import Twilio from 'twilio'

const client = Twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

export const sendWhatsApp = async (message) => {
  try{
    const msg = await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to:  `whatsapp:${process.env.MY_WHATSAPP_NUMBER}`,
      body: message
    })
     console.log('WhatsApp message sent:', msg.sid);
  }catch(err){  console.error('Error sending WhatsApp:', err.message);}
}
