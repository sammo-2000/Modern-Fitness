const nodemailer = require("nodemailer");

function sendEmail(user) {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: 'Exciting News! Your New Customized Workout Plan Is Ready',
        text: 'New Program Created you can view it online',
        html: HTML(user),
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email: ", error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}

const HTML = (user) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Thank Your For Signing Up</title>
        </head>
        
        <body style="display: flex; align-items: center; justify-content: center; font-family: sans-serif; text-align: center;">
            <div
                style="max-width: 600px; width: 100%; margin: 30px auto; border-radius: 20px; overflow: hidden; box-shadow: 0px 0px 5px #92bfd6;">
                <h1
                    style="background-color: #427aeb; padding: 30px 10px; color: #fff; margin: 0; border-bottom: 2px solid #fff;">
                    ${process.env.APP_NAME}</h1>
                <div style="padding: 10px; margin: 0; background-color: #7da3f0; color: #ffffff;">
                    <h2>Welcome to ${process.env.APP_NAME}</h2>
                </div>
                <div style="margin: 0; text-align: left; line-height: 1.8rem;">
                    <img style="object-fit: cover; width: 100%; height: 100%; max-height: 300px; padding: 0; margin: 0; filter: brightness(0.8);"
                        src="https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="gym image">
        
                    <div style="padding: 10px 30px; ">
        
                        <p style="font-size: 1.2rem;"><strong>Dear ${user.first_name} ${user.last_name},</strong></p>
        
                        <p>I hope this email finds you in great health and high spirits. We're thrilled to inform you that our
                            dedicated gym trainer has crafted a brand new custom workout plan tailored just for you!</p>
        
                        <p>This personalized program is designed to align with your fitness goals, taking into consideration
                            your preferences, strengths, and areas for improvement. Our trainer has put a lot of thought and
                            expertise into creating a routine that will challenge you, keep you motivated, and ultimately lead
                            you towards the results you desire.</p>
        
                        <p>Here are a few highlights of your new workout plan:</p>
        
                        <ol>
                            <li><strong>Targeted Exercises:</strong> The plan includes exercises specifically chosen to address
                                your fitness objectives and enhance your overall strength and endurance.</li>
                            <li><strong>Progressive Structure:</strong> You'll notice a carefully structured progression to
                                ensure your workouts remain challenging and effective as you advance on your fitness journey.
                            </li>
                            <li><strong>Variety for Engagement:</strong> Our trainer has incorporated a mix of exercises to keep
                                your workouts interesting and enjoyable, preventing monotony and promoting long-term commitment.
                            </li>
                            <li><strong>Flexible Schedule:</strong> The plan is adaptable to your schedule, making it easier for
                                you to stay consistent and integrate fitness seamlessly into your routine.
                            </li>
                        </ol>
        
                        <p>To access your new workout plan, simply log in to your account on our website. You'll find it
                            under the "Programs" section.</p>
        
                        <p>Remember, our trainer is here to support you every step of the way. If you have any questions, need
                            clarification on exercises, or want to discuss any adjustments, please don't hesitate to reach out.
                            Your success is our priority!</p>
        
                        <p>Thank you for entrusting us with your fitness journey. We can't wait to see the amazing progress
                            you'll achieve with this personalized workout plan.</p>
        
                        <p>Best regards,</p>
        
                        <p>Modern Fitness<br><a href="">${process.env.BACKEND_FULL_DOMAIN}</a></p>
        
                    </div>
        
                </div>
            </div>
        </body>
        
        </html>
    `
}

module.exports = { sendEmail };