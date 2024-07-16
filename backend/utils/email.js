const nodemailer = require('nodemailer')
const pug = require('pug')

const sendEmail = (options) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL,
            pass: process.env.MAIL_PASSWORD
        }
    });
    const domain = "http://localhost:3000/reset"
    let { name, to } = options;
    name = name.charAt(0).toUpperCase() + name.slice(1);
    const html = pug.renderFile(`${__dirname}/../views/reset.pug`, {
        name: name,
        url: domain,
      });

    const mailOptions = {
        from: process.env.MAIL,
        to,
        subject: `Reset Password`,
        html
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = sendEmail