import nodemailer from 'nodemailer';
import { envs } from '../envs';

const { EMAIL_USER, EMAIL_PASSWORD } = envs;

export class MailAdapter {
    static async sendVerificationEmail(email: string, token: string): Promise<void> {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: EMAIL_USER,
            to: email,
            subject: 'Verificación de cuenta',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; color: #444;">
                    <h2 style="color: #357b38;">¡Bienvenido a CEMPRE!</h2>
                    <p>Estamos emocionados de tenerte con nosotros. Solo queda un paso más para completar tu registro.</p>
                    <p>Haz clic en el botón de abajo para verificar tu cuenta:</p>
                    <a href="http://localhost:4200/auth/activate-account/?token=${token}" style="background-color: #357b38; color: #fff; text-decoration: none; padding: 10px 20px; margin: 10px 0; display: inline-block;">Verificar cuenta</a>
                    <p>Si tienes alguna pregunta, no dudes en contactarnos. ¡Estamos aquí para ayudarte!</p>
                    <p>Saludos,</p>
                    <p>El equipo de CEMPRE</p>
                </div>
            `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error({ error });
            } else {
                console.log('Correo enviado: ' + info.response);
            }
        });
    }
}
