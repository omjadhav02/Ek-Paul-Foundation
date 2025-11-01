import { Resend } from "resend";
import fs from "fs";

export const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Sends an email using Resend
 * @param {Object} mailOptions
 * @param {string} mailOptions.from
 * @param {string|string[]} mailOptions.to
 * @param {string} mailOptions.subject
 * @param {string} mailOptions.html
 * @param {Array} [mailOptions.attachments] - Optional attachments (e.g., PDFs)
 */
export async function sendEmail({ from, to, subject, html, attachments = [] }) {
  try {
    const formattedAttachments = attachments.map((file) => {
      const fileContent = fs.readFileSync(file.path).toString("base64");
      return {
        filename: file.filename,
        content: fileContent,
        type: file.contentType || "application/pdf",
      };
    });

    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
      attachments: formattedAttachments.length > 0 ? formattedAttachments : undefined,
    });

    if (error) {
      console.error("❌ Resend Email Error:", error);
      throw new Error(error.message);
    }

    return data;
  } catch (err) {
    console.error("❌ Failed to send email via Resend:", err.message);
    throw err;
  }
}
