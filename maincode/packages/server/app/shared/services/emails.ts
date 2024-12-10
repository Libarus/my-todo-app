import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config({ path: '../../../.env' });

enum ETypeEmail {
    REGISTER,
    RECOVER,
    VERIFY,
}

export class Email {
    public static SendEmail = (to: string, name: string, subject: string, body: string): Promise<boolean> => {
        return new Promise<boolean>((resolve, reject) => {
            const transporter = nodemailer.createTransport({
                host: 'smtp.beget.com',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL_LOGIN,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });

            const mailOptions = {
                from: '"Your Name" <test@4metra.ru>',
                to: `${name} <${to}>`,
                subject: subject,
                html: body,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error(error, info);
                    reject(false);
                } else {
                    resolve(true);
                }
            });

        });
    };

    public static GetRegisterTemplateEmail() {
        return this.getTemplateEmail(ETypeEmail.REGISTER);
    }

    private static getTemplateEmail(type: ETypeEmail) {
        switch (type) {
            case ETypeEmail.REGISTER:
                return {
                    subject: 'Регистрация на сайте',
                    body: `
                    <h1>Привет!</h1>
                
                    <p>Спасибо за регистрацию!</p>
                
                    <p>Для подтверждения регистрации перейдите по ссылке: <a href="---">{%verifyToken%}</a></p>
                
                    <hr>
                    <p>С Уважением администрация!</p>
                    `,
                };
            default:
                return {
                    subject: 'unknowm',
                    body: 'unknowm'
                };
        }
    }
}
