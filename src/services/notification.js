// import { db } from "@/lib/firebase/client";

// export async function sendNotification({ message }) {
//   const batch = db.batch();
//   const recipients = await db.collection("users").get();

//   recipients.forEach((doc) => {
//     const ref = db.collection("notifications").doc();
//     batch.set(ref, { userId: doc.id, message, sentAt: new Date() });
//   });

//   await batch.commit();
// }

// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'alpiisi11@gmail.com',
//         pass: 'sua_senha_de_app'  // NÃO use sua senha normal, gere uma senha de app!
//     }
// });

// const mailOptions = {
//     from: 'alpiisi11@gmail.com',
//     to: 'destinatario@example.com',
//     subject: 'Testando envio de e-mail com Node.js',
//     text: 'Este é um e-mail enviado usando Node.js e Nodemailer!'
// };

// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         console.log('Erro ao enviar e-mail:', error);
//     } else {
//         console.log('E-mail enviado: ' + info.response);
//     }
// });
