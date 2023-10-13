// librerias
import nodemailer  from 'nodemailer';
import dotenv from 'dotenv';

// iniciando estancias
dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: process.env.USERMAIL || 'gustavober98@gmail.com',
        pass: process.env.PASSMAIL || '1234'
    },
});

transporter.verify().then(
    console.log('Ready for send emails')
);

export { transporter }