require("dotenv").config();
const nodemailer = require("nodemailer");

const remitente = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PWD,
  },
});

export const sendEmails = async (invites, idExchange) => {
  try {
    const destinatarios = {
      from: process.env.GMAIL_USER,
      to: invites,
      subject: "Invitación a intercambio",
      text: `Hola, se te ha invitado al intercambio con el ID ${idExchange}`,
    };
    const info = await remitente.sendMail(destinatarios);
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (e) {
    console.log(e);
  }
};
