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
    }
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
