import { config } from 'dotenv'
config()

"use strict"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE === "true" ? true : false,
    auth: {
        user: process.env.MAIL_EMAIL,
        pass: process.env.MAIL_PASSWORD,
    },
})

const main = async (receiver_email, subject, template_name, options = null) => {
    const email_body = generate_HTML(template_name, options)
    const info = await transporter.sendMail({
        from: process.env.APP_NAME + process.env.MAIL_EMAIL,
        to: receiver_email,
        subject: subject,
        text: email_body.plain,
        html: email_body.html,
    })
}

const generate_HTML = (template_name, options = null) => {
    if (template_name === 'welcome') {
        return {
            plain: plain_welcome_email(options),
            html: html_welcome_email(options),
        }
    } else if (template_name === 'reset_password') {
        return {
            plain: plain_reset_password_email(options),
            html: html_reset_password_email(options),
        }
    }
}

const plain_reset_password_email = (option) => {
    return `
    Dear ${option.first_name} ${option.last_name},\n
    We have received a request to reset your password.\n
    If you did not make this request, please ignore this email.\n
    This link will expire in half an hour.\n
    To reset your password, please visit the link below:\n
    ${option.reset_link}\n
    `
}

const html_reset_password_email = (option) => {
    return `
    <div style="display: block; max-width: 400px; margin: 0 auto;">
        <h1 style="font-size: 24px; color: #333; margin: 10px;">Dear ${option.first_name} ${option.last_name},</h1>
        <p style="font-size: 16px; color: #666; margin: 10px;">We have received a request to reset your password.</p>
        <p style="font-size: 16px; color: #666; margin: 10px;">If you did not make this request, please ignore this email.</p>
        <p style="font-size: 16px; color: #666; margin: 10px;">This link will expire in half an hour.</p>
        <p style="font-size: 16px; color: #666; margin: 10px;">To reset your password, please click on the link below:</p>
        <a style="display: block; width: fit-content; padding: 10px 20px; background-color: #000; color: #fff; text-decoration: none; text-align: center;" href="${option.reset_link}">Reset Now</a>
    </div>
    `
}

const plain_welcome_email = (option) => {
    return `
    Welcome to ${process.env.APP_NAME}!
    We are so happy to see you here ${option.first_name} ${option.last_name}!
    Your acceess code is ${option.access_code}
    `
}

const html_welcome_email = (option) => {
    return `
    <h1>Welcome to ${process.env.APP_NAME}!</h1>
    <p>We are so happy to see you here ${option.first_name} ${option.last_name}!</p>
    <p>Your access code is ${option.access_code}</p>
    `
}


export default { main }
