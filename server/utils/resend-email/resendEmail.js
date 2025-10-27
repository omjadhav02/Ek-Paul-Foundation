import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Sends an email using Resend
 * @param {Object} mailOptions
 * @param {string} mailOptions.from
 * @param {string|string[]} mailOptions.to
 * @param {string} mailOptions.subject
 * @param {string} mailOptions.html
 */
export async function sendEmail({ from, to, subject, html }) {
  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
    });

    if (error) {
      console.error("❌ Resend Email Error:", error);
      throw new Error(error.message);
    }

    console.log("✅ Email sent successfully:", data.id);
    return data;
  } catch (err) {
    console.error("❌ Failed to send email via Resend:", err.message);
    throw err;
  }
}
