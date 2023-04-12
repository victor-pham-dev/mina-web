import sgMail from '@sendgrid/mail'
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export const sendEmailService = async (to: string, subject: string, body: string) => {
  console.log(process.env.FROM_EMAIL)
  try {
    const msg = {
      to: [to],
      from: process.env.FROM_EMAIL,
      subject: subject,
      html: `<strong>${body}</strong>`,
    }
    const result = await sgMail.send(msg)
  } catch (_e) {
    console.log('Error in sendEmail: ', _e.response.body)
  }
}
