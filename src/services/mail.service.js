import { createTransport } from "nodemailer";

import { CONFIG } from "../config/config.js";
import { EMAIL_TYPES } from "../common/constants/emailTypes.js";

class MailService {
  constructor() {
    this.transporter = createTransport({
      host: CONFIG.MAIL.HOST,
      port: CONFIG.MAIL.PORT,
      auth: {
        user: CONFIG.MAIL.USER,
        pass: CONFIG.MAIL.PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async getMessageTemplate({ type, email }) {
    let message = `<h2> Hola, ${email}! </h2>`;
    switch (type) {
      case EMAIL_TYPES.WELCOME:
        message += `
          <h3 style="color: darkblue">
            Bienvenido a nuestro Ecommerce de Victornillo!
          </h3>
          <br>
          Gracias por registrarte en nuestra app.
        `;
        break;
    }

    message += `
      <br>
      <img
        src="cid:logo"
        alt="Logo de Victornillo"
        style="margin-top: 30px; width: 300px; height: auto; display: block; margin-left: auto; margin-right: auto; background-color: white; padding: 10px;"
      />
      </body>
    `;

    return message;
  }

  async sendMail({ to, subject, type }) {
    try {
      const html = await this.getMessageTemplate({ type, email: to });


      const info = await this.transporter.sendMail({
        from: CONFIG.MAIL.FROM,
        to,
        subject,
        html,
        attachments: [
          {
            filename: "logovictornillo.png",
            path: "./public/images/logovictornillo.png",
            cid: "logo",
          },
        ],
      });

      console.log("Message sent: ", info.messageId);
    } catch (error) {
      console.error("Error sending email: ", error);
      throw error;
    }
  }
}

export const mailService = new MailService();
