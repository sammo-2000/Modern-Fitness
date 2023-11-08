const nodemailer = require("nodemailer");

function sendEmail(email, first_name, last_name, access_code) {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Welcome to Modern Fitness",
        text: "Welcome to Modern Fitness, your access code is " + access_code,
        html: HTML(email, first_name, last_name, access_code),
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email: ", error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}

const HTML = (email, first_name, last_name, access_code) => {
    return `
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Thank Your For Signing Up</title>
        </head>

        <body style="display: flex; align-items: center; justify-content: center; font-family: sans-serif; text-align: center;">
            <div style="max-width: 600px; width: 100%; margin: 30px auto; border-radius: 20px; overflow: hidden; box-shadow: 0px 0px 5px #92bfd6;">
                <h1 style="background-color: #427aeb; padding: 30px 10px; color: #fff; margin: 0; border-bottom: 2px solid #fff;">${process.env.APP_NAME}</h1>
                <div style="padding: 10px; margin: 0; background-color: #7da3f0; color: #ffffff;">
                    <h2>Welcome to ${process.env.APP_NAME}</h2>
                </div>
                <div style="margin: 0; text-align: left; line-height: 1.8rem;">
                    <img style="object-fit: cover; width: 100%; height: 100%; max-height: 300px; padding: 0; margin: 0; filter: brightness(0.8);" src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="gym image">

                    <div style="padding: 10px 30px; ">

                        <p style="font-size: 1.2rem;"><strong>Dear ${first_name} ${last_name},</strong></p>

                        <p>We are thrilled to welcome you to the Modern Fitness family! Your fitness journey starts here, and we're
                            excited to help you achieve your health and wellness goals. As a valued member of our community, we are
                            dedicated to providing you with the best possible gym experience.</p>
        
                        <p><strong style="margin-right: 10px;">Your Access Code:</strong><span style="font-size: 1.2rem; color: #ffffff; display: inline-block; background: #427aeb; padding: 10px 20px; border-radius: 10px; text-align: center; max-width: fit-content; margin: auto;">${access_code}</span></p>

                        <p>To ensure a seamless start to your fitness journey, please follow these steps:</p>

                        <ol>
                            <li><strong>Access the Member Portal:</strong> Make sure to give your correct details on your profile tab.</li>
                            <li><strong>Trainer create custom program:</strong>Our trainers will create custom workout depending on your
                                goals.</li>
                            <li><strong>Train with us:</strong>Follow your custom program in our gym and see the transofmration!</li>
                        </ol>

                        <p>To access your member portal right away, simply click the button below:</p>

                        <div style="display: flex; justify-content: center; align-items: center;">
                            <a href="" style="text-decoration: none; font-size: 1.2rem; color: #ffffff; display: inline-block; background: #427aeb; padding: 10px 20px; border-radius: 10px; text-align: center; max-width: fit-content; margin: auto;">Access Your Member Portal</a>
                        </div>

                        <p>If you have any questions or need assistance, our friendly staff is here to help. Feel free to reach out
                            to us via phone at 07710 123456 or by email at ${email}.</p>

                        <p>Thank you for choosing Modern Fitness to be a part of your fitness journey. We look forward to supporting
                            you in achieving your health and fitness goals.</p>

                        <p>Let's make every workout count!</p>

                        <p>Sincerely,</p>
                        <p>Modern Fitness<br><a href="">${process.env.BACKEND_FULL_DOMAIN}</a></p>

                    </div>

                </div>
            </div>
        </body>

        </html>
    `
}

module.exports = { sendEmail };