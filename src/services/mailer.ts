
import sgMail from '@sendgrid/mail'
import nodemailer from 'nodemailer'
import { OAuth2Client } from 'google-auth-library'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

interface Params {
  to: string
  subject: string
  body: string
}
//
const GOOGLE_MAILER_CLIENT_ID = process.env.GOOGLE_MAILER_CLIENT_ID
const GOOGLE_MAILER_CLIENT_SECRET = process.env.GOOGLE_MAILER_CLIENT_SECRET
const GOOGLE_MAILER_REFRESH_TOKEN = process.env.GOOGLE_MAILER_REFRESH_TOKEN
const ADMIN_EMAIL_ADDRESS = process.env.ADMIN_EMAIL_ADDRESS

const myOAuth2Client = new OAuth2Client(
  GOOGLE_MAILER_CLIENT_ID,
  GOOGLE_MAILER_CLIENT_SECRET
)
myOAuth2Client.setCredentials({
  refresh_token: GOOGLE_MAILER_REFRESH_TOKEN
})

export const sendEmailService = async (params: Params) => {
  const { to, subject, body } = params
  const myAccessTokenObject = await myOAuth2Client.getAccessToken()
  const myAccessToken = myAccessTokenObject?.token
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: ADMIN_EMAIL_ADDRESS,
      clientId: GOOGLE_MAILER_CLIENT_ID,
      clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
      refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
      accessToken: myAccessToken
    }
  })

  const mailOptions = {
    to: to,
    subject: subject,
    html: `<h3>${body}</h3>`
  }
  await transport.sendMail(mailOptions)
}
