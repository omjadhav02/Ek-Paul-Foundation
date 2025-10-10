import nodemailer from "nodemailer";

export const sendEmail2 = async (to, subject, htmlContent, attachmentPath) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Ek Paul Foundation" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: htmlContent,
    };

    if (attachmentPath) {
      mailOptions.attachments = [
        {
          filename: "Donation_Receipt.pdf",
          path: attachmentPath,
          contentType: "application/pdf",
        },
      ];
    }

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully to", to);
  } catch (error) {
    console.error("❌ Error in sendEmail2 utils:", error);
  }
};
