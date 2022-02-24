import type { NextApiRequest, NextApiResponse } from 'next'
import twilio from 'twilio'

type Data = {
  message: any
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { body } = req
  const { method } = req
  if (method === 'GET')
    return res.status(200).json({ message: 'GET request for sending sms' })
  if (method !== 'POST')
    return res.status(405).json({ message: 'This method is not allowed' })
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const client = twilio(accountSid, authToken)
  client.messages
    .create({
      body: body.message,
      from: '+19035827937',
      to: body.phoneNumber,
    })
    .then((message) => {
      console.log(message)
      res.status(200).json({ message: 'Message sent successfully' })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: 'Message sending failed' })
    })
}
