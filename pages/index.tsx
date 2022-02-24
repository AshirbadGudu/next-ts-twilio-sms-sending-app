import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'

const Home: NextPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [message, setMessage] = useState('')

  const sendSms = async () => {
    try {
      const response = await fetch('/api/send-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, message }),
      })
      const data = await response.json()
      alert(data?.message)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Twilio Next TS SMS Sending App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-4xl font-bold">
          Welcome to{' '}
          <a className="text-blue-600" href="https://nextjs.org">
            Twilio Next TS SMS Sending App
          </a>
        </h1>

        <p className="mt-3 text-2xl">
          Get started by entering the{' '}
          <code className="rounded-md bg-gray-100 p-3 font-mono text-lg">
            phone number and message
          </code>
        </p>
        <div className="py-12">
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Enter Phone Number With Country Code"
            className="w-full rounded-md border-2 border-gray-300 p-3"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <textarea
            name="message"
            placeholder="Enter your message here"
            className="mt-3 w-full rounded-md border-2 border-gray-200 p-3"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button
            onClick={sendSms}
            className="mt-3 w-full rounded-md border-2 border-gray-300 p-3
          hover:bg-gray-100 hover:text-gray-900"
          >
            Send Message
          </button>
        </div>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://github.com/AshirbadGudu"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created By{' '}
          <span className="font-semibold text-blue-600">AshirbadGudu</span>
        </a>
      </footer>
    </div>
  )
}

export default Home
