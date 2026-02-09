import dotenv from 'dotenv'
dotenv.config()

import Twilio from 'twilio'

const client = new Twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

export const sendWhatsApp = async () => {
  try {
    const msg = await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${process.env.MY_WHATSAPP_NUMBER}`,
      body: "hello rj"
    })

    console.log('WhatsApp message sent:', msg.sid)
  } catch (err) {
    console.error('Error sending WhatsApp:', err.message)
  }
}

sendWhatsApp()
