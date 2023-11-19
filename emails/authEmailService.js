import { createTransporter } from "../config/nodemailer.js";

export const sendEmailVerify = async ({ name, email, token }) => {
  const transporter = createTransporter(
    "sandbox.smtp.mailtrap.io",
    2525,
    "77745168e232c6",
    "ca1f1bef933be6",
  );

  const emailTemplate = `
  <div style="font-family: 'Arial', sans-serif; color: #333; padding: 20px; text-align: center;">
    <h1 style="color: #333; font-size: 24px; font-weight: bold; margin-bottom: 20px; text-transform: uppercase;">Bienvenido a AppSalon</h1>
    <p style="font-size: 16px; margin-bottom: 25px;">Hola ${name}, estamos emocionados de tenerte a bordo. Por favor confirma tu cuenta para continuar.</p>
    <a href="http://localhost:4000/api/verify/${token}" style="text-decoration: none; background-color: #0275d8; color: #fff; padding: 15px 25px; border-radius: 5px; font-weight: bold; margin-top: 20px; display: inline-block; font-size: 18px;">Confirmar Cuenta</a>
    <p style="font-size: 14px; margin-top: 30px; color: #666;">Si tú no creaste esta cuenta, por favor ignora este mensaje.</p>
  </div>
  `;

  const info = await transporter.sendMail({
    from: '"AppSalon" <no-reply@appsalon.com>', // Remitente con un nombre descriptivo y una dirección de correo ficticia
    to: email,
    subject: "Confirma tu cuenta en AppSalon",
    text: `Hola ${name}, confirma tu cuenta en AppSalon visitando este enlace: http://localhost:4000/api/verify/${token}`, // Versión de texto para clientes de correo que no admiten HTML
    html: emailTemplate, // Utiliza la variable de la plantilla HTML
  });

  console.log("Email enviado: %s", info.messageId);
};
