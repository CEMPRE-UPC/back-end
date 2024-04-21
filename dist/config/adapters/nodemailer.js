"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailAdapter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const envs_1 = require("../envs");
const { EMAIL_USER, EMAIL_PASSWORD } = envs_1.envs;
class MailAdapter {
    static sendVerificationEmail(email, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const transporter = nodemailer_1.default.createTransport({
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
            return transporter.sendMail(mailOptions);
        });
    }
}
exports.MailAdapter = MailAdapter;
