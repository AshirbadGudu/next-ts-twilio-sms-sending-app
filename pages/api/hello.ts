import type { NextApiRequest, NextApiResponse } from 'next'
import twilio from 'twilio'

type Data = {
  message: any
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const client = twilio(accountSid, authToken)
  client.messages
    .create({
      body: 'Hello From Twilio',
      from: '+19035827937',
      to: '+917008614546',
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
