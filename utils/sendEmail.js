import nodemailer from 'nodemailer';

export const sendEmail = async (to, subject, message) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to,
        subject,
        text: message,
    };

    await transporter.sendMail(mailOptions);
};
