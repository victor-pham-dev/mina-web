// import sgMail from '@sendgrid/mail'
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// export const sendEmailService = async (to: string, subject: string, body: string) => {
//   console.log(process.env.FROM_EMAIL)
//   try {
//     const msg = {
//       to: [to],
//       from: process.env.FROM_EMAIL,
//       subject: subject,
//       html: `<strong>${body}</strong>`,
//     }
//     const result = await sgMail.send(msg)
//   } catch (_e) {
//     console.log('Error in sendEmail: ', _e.response.body)
//   }
// }
import nodemailer from 'nodemailer'
// const nodemailer = require('nodemailer');

// Thiết lập thông tin tài khoản email
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'truongpham2412.dev@gmail.com', // email của bạn
    pass: 'Void2412' // mật khẩu của bạn
  }
});
