import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const logoUrl = `${domain}/elhiloenredado_icon.png`;

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/reset-password?token=${token}`;

  try {
    const { data, error } = await resend.emails.send({
      from: "El Hilo Enredado <recuperacion-cuentas@elhiloenredado.javierruiz.org>",
      to: email,
      subject: "Restablece tu contraseña - El Hilo Enredado",
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #EFECE3; border-radius: 12px; background-color: #FDFBF4;">
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="${logoUrl}" alt="El Hilo Enredado" style="width: 80px; height: 80px; margin-bottom: 10px;">
            <h1 style="color: #4A5D4E; font-size: 24px; margin: 0; font-family: 'Lora', serif;">El Hilo Enredado</h1>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <h2 style="color: #1a1a1a; font-size: 20px; margin-top: 0;">Restablecer tu contraseña</h2>
            <p style="color: #4b5563; line-height: 1.6;">Hola,</p>
            <p style="color: #4b5563; line-height: 1.6;">Hemos recibido una solicitud para restablecer la contraseña de tu cuenta. Si no has sido tú, puedes ignorar este correo con total seguridad.</p>
            
            <div style="text-align: center; margin: 35px 0;">
              <a href="${resetLink}" style="display: inline-block; padding: 14px 30px; background-color: #4A5D4E; color: #FDFBF4; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(74, 93, 78, 0.2);">
                Restablecer Contraseña
              </a>
            </div>
            
            <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">Este enlace caducará en 1 hora por motivos de seguridad.</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; color: #9ca3af; font-size: 12px;">
            <p>&copy; 2026 El Hilo Enredado &middot; Detalles artesanales hechos con amor</p>
            <p>Si tienes problemas con el botón, copia y pega esta URL en tu navegador:</p>
            <p style="word-break: break-all; color: #4A5D4E;">${resetLink}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Error (Password Reset):", error);
      throw error;
    }

    console.log("Password reset email sent successfully:", data?.id);
  } catch (err) {
    console.error("Exception in sendPasswordResetEmail:", err);
    throw err;
  }
};

export const sendWelcomeEmail = async (email: string, name: string) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "El Hilo Enredado <hola@elhiloenredado.javierruiz.org>",
      to: email,
      subject: "¡Bienvenid@ a El Hilo Enredado! 🧵",
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #EFECE3; border-radius: 12px; background-color: #FDFBF4;">
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="${logoUrl}" alt="El Hilo Enredado" style="width: 80px; height: 80px; margin-bottom: 10px;">
            <h1 style="color: #4A5D4E; font-size: 24px; margin: 0; font-family: 'Lora', serif;">El Hilo Enredado</h1>
          </div>

          <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <h2 style="color: #1a1a1a; font-size: 20px; margin-top: 0;">¡Bienvenida, ${name}!</h2>
            <p style="color: #4b5563; line-height: 1.6;">Estamos muy felices de que te hayas unido a nuestra comunidad de artesanía.</p>
            <p style="color: #4b5563; line-height: 1.6;">En tu nueva cuenta podrás gestionar tus pedidos, guardar tus productos favoritos y recibir detalles personalizados.</p>
            
            <div style="text-align: center; margin: 35px 0;">
              <a href="${domain}/login" style="display: inline-block; padding: 14px 30px; background-color: #4A5D4E; color: #FDFBF4; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                Explorar la Tienda
              </a>
            </div>
            
            <p style="color: #4b5563; line-height: 1.6;">Esperamos que encuentres ese detalle especial que estás buscando.</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; color: #9ca3af; font-size: 12px;">
            <p>&copy; 2026 El Hilo Enredado &middot; Detalles artesanales hechos con amor</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Error (Welcome Email):", error);
      throw error;
    }

    console.log("Welcome email sent successfully:", data?.id);
  } catch (err) {
    console.error("Exception in sendWelcomeEmail:", err);
    throw err;
  }
};
