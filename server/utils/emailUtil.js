
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host : process.env.EMAIL_HOST,
    port : process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
});

const sendEmail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: '"VMS" <no-reply@vms.com>',
            to, 
            subject,
            text
        });
        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error("Error sending email", error);
        throw new Error('Failed to send email')
        

    }
};

module.exports = {sendEmail}