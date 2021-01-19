require("dotenv").config();
const nodemailer = require("nodemailer");

const remitente = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PWD,
  },
});

const destinatario = {
  from: process.env.GMAIL_USER,
  to: "gio.cas.rb@gmail.com",
  subject: "Registro en IntercambiApp",
  text: "Se completo su registro en IntercambiApp",
};

remitente.sendMail(destinatario, (err, data) => {
  if (err) {
    console.log("Error al enviar email");
  } else {
    console.log("emial enviado");
  }
});
