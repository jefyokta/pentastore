const nodemailer = require('nodemailer');
require('dotenv').config();

class Mail {
    constructor(to, subject, text) {
        this.pentaEmail = process.env.EMAIL || 'oktaax.pentaverify@gmail.com';
        this.pentamail = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: this.pentaEmail,
                pass: process.env.EMAIL_PASS || 'lszk pxff pfdj lqwd'
            }
        });
        this.user = to;
        this.subject = subject;
        this.text = text; 
        this.opt = {}; 
    }

    setMail() {
        this.opt = {
            from: this.pentaEmail,
            to: this.user,
            subject: this.subject,
            text: this.text
        };
    }

    sendMail() {
        this.setMail();

        this.pentamail.sendMail(this.opt, (error, info) => {
            if (error) {
                console.error("Error occurred:", error); 
                return { status: 402, msg: 'badrequest' };
            }
            console.log("Email sent:", info.response);
            return { status: 200, msg: `Mail sent to ${this.user}` };
        });
    }
}

module.exports= Mail


