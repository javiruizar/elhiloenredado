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

export const sendOrderConfirmationEmail = async (email: string, orderData: any) => {
  const itemsHtml = orderData.items.map((item: any) => `
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid #EFECE3;">
        <p style="margin: 0; font-weight: bold; color: #1a1a1a;">${item.product.name}</p>
        ${item.customization ? `<p style="margin: 0; font-size: 12px; color: #4A5D4E; font-style: italic;">"${item.customization}"</p>` : ""}
      </td>
      <td style="padding: 10px 0; border-bottom: 1px solid #EFECE3; text-align: center; color: #4b5563;">x${item.quantity}</td>
      <td style="padding: 10px 0; border-bottom: 1px solid #EFECE3; text-align: right; font-weight: bold; color: #1a1a1a;">${(item.price * item.quantity).toFixed(2)}€</td>
    </tr>
  `).join("");

  try {
    const { data, error } = await resend.emails.send({
      from: "El Hilo Enredado <hola@elhiloenredado.javierruiz.org>",
      to: email,
      subject: `Confirmación de Pedido #${orderData.id.substring(0, 8)} - El Hilo Enredado`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #EFECE3; border-radius: 12px; background-color: #FDFBF4;">
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="${logoUrl}" alt="El Hilo Enredado" style="width: 80px; height: 80px; margin-bottom: 10px;">
            <h1 style="color: #4A5D4E; font-size: 24px; margin: 0; font-family: 'Lora', serif;">¡Gracias por tu pedido!</h1>
          </div>

          <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <p style="color: #4b5563; line-height: 1.6;">Hola, hemos recibido tu pedido correctamente. Nos pondremos manos a la obra para preparar tus detalles artesanales lo antes posible.</p>
            
            <h3 style="color: #4A5D4E; border-bottom: 2px solid #FDFBF4; padding-bottom: 10px; margin-top: 25px;">Resumen del Pedido</h3>
            <table style="width: 100%; border-collapse: collapse;">
              ${itemsHtml}
              <tr>
                <td colspan="2" style="padding: 20px 0 10px; text-align: right; color: #4b5563;">Total del pedido:</td>
                <td style="padding: 20px 0 10px; text-align: right; font-size: 18px; font-weight: bold; color: #1a1a1a;">${orderData.total.toFixed(2)}€</td>
              </tr>
            </table>

            <div style="margin-top: 25px; padding: 15px; background-color: #FDFBF4; border-radius: 8px;">
              <h4 style="margin: 0 0 10px 0; color: #4A5D4E;">Dirección de Envío:</h4>
              <p style="margin: 0; font-size: 14px; color: #4b5563; line-height: 1.4;">${orderData.address.replace(/\n/g, "<br>")}</p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px; color: #9ca3af; font-size: 12px;">
            <p>Si tienes alguna duda, responde a este correo y te atenderemos encantados.</p>
            <p>&copy; 2026 El Hilo Enredado</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Error (Order Confirmation):", error);
    }
  } catch (err) {
    console.error("Exception in sendOrderConfirmationEmail:", err);
  }
};
