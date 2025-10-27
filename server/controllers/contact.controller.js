import { sendEmail } from "../utils/resend-email/resendEmail.js";

export const sendContactMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("❌ RESEND_API_KEY not set in .env file!");
    return res.status(500).json({ message: "Server email not configured." });
  }

  const foundationEmail = process.env.FOUNDATION_EMAIL;
  const senderEmail = email.trim();

  // 🟢 Email to Foundation Admin
  const foundationMail = {
    from: `Ek Paul Foundation <${foundationEmail}>`,
    to: foundationEmail,
    subject: `📩 New Contact Message from ${name}`,
    html: `
    <div style="background:#f4f6f8;padding:40px;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <div style="max-width:620px;margin:auto;background:#ffffff;border-radius:14px;padding:35px;box-shadow:0 8px 24px rgba(0,0,0,0.08);">
        <div style="text-align:center;margin-bottom:25px;">
          <img src="https://ekpaulfoundation.org/logo.png" alt="Ek Paul Foundation"
               style="height:70px;margin-bottom:10px;" onerror="this.style.display='none'"/>
          <h1 style="color:#0b3d2e;margin:10px 0 0;font-size:22px;">🌱 Ek Paul Foundation</h1>
          <p style="color:#888;margin:6px 0 0;font-size:14px;">Empowering Lives, One Step at a Time</p>
        </div>

        <div style="border-top:3px solid #2d7a5f;padding-top:25px;">
          <h2 style="color:#222;font-size:20px;margin-bottom:10px;">📬 New Inquiry Received</h2>
          <p style="font-size:16px;line-height:1.6;color:#333;margin:0 0 20px;">
            You’ve received a new message from your website’s contact form:
          </p>

          <table style="width:100%;border-collapse:collapse;font-size:15px;color:#333;">
            <tr><td style="padding:8px 0;width:90px;"><strong>Name:</strong></td><td>${name}</td></tr>
            <tr><td style="padding:8px 0;"><strong>Email:</strong></td>
              <td><a href="mailto:${email}" style="color:#2d7a5f;text-decoration:none;">${email}</a></td>
            </tr>
          </table>

          <div style="margin-top:20px;padding:18px;background:#f9fcfa;border-left:4px solid #2d7a5f;border-radius:8px;">
            <strong style="display:block;margin-bottom:5px;color:#0b3d2e;">Message:</strong>
            <p style="margin:0;font-size:15px;line-height:1.6;color:#444;white-space:pre-line;">
              ${message}
            </p>
          </div>

          <div style="margin-top:30px;text-align:center;">
            <hr style="border:none;border-top:1px solid #ddd;margin:25px 0;"/>
            <p style="font-size:13px;color:#777;">
              Sent via <a href="https://ekpaulfoundation.org" style="color:#2d7a5f;text-decoration:none;font-weight:600;">ekpaulfoundation.org</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    `,
  };

  // 🟡 Auto-Reply to Sender
  const autoReplyMail = {
    from: `Ek Paul Foundation <${foundationEmail}>`,
    to: senderEmail,
    subject: "Thank you for contacting Ek Paul Foundation 💛",
    html: `
    <div style="background:#f4f6f8;padding:40px 20px;font-family:Segoe UI,Roboto,sans-serif;">
      <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:14px;padding:35px;box-shadow:0 3px 12px rgba(0,0,0,0.08);">
        <div style="text-align:center;">
          <img src="https://ekpaulfoundation.org/logo.png" alt="Ek Paul Foundation" style="height:70px;margin-bottom:15px;" onerror="this.style.display='none'"/>
          <h2 style="color:#333;margin:0;">Thank you, ${name}! 💛</h2>
        </div>

        <p style="font-size:16px;line-height:1.6;margin-top:20px;color:#444;">
          We’ve received your message and are truly grateful for your effort to reach out.
          Our team will carefully review it and get back to you soon.
        </p>

        <p style="font-size:16px;line-height:1.6;color:#444;">
          In the meantime, you can explore our latest initiatives and stories on our website.
        </p>

        <div style="text-align:center;margin:30px 0;">
          <a href="https://ekpaulfoundation.org"
             style="background:#007bff;color:#fff;padding:12px 28px;border-radius:25px;
                    text-decoration:none;font-weight:600;font-size:15px;display:inline-block;">
            Visit Our Website
          </a>
        </div>

        <p style="margin-top:25px;color:#555;font-size:15px;">
          With gratitude,<br/>
          <strong>Ek Paul Foundation Team</strong><br/>
          <a href="mailto:${foundationEmail}" style="color:#007bff;text-decoration:none;">${foundationEmail}</a>
        </p>

        <hr style="margin:25px 0;border:none;border-top:1px solid #ddd;"/>

        <div style="text-align:center;font-size:13px;color:#777;">
          <p>Follow us for updates</p>
          <div style="margin-top:10px;">
            <a href="https://instagram.com/ekpaulfoundation" style="margin:0 8px;color:#007bff;text-decoration:none;">Instagram</a> •
            <a href="https://facebook.com/ekpaulfoundation" style="margin:0 8px;color:#007bff;text-decoration:none;">Facebook</a> •
            <a href="https://linkedin.com/company/ekpaulfoundation" style="margin:0 8px;color:#007bff;text-decoration:none;">LinkedIn</a>
          </div>
          <p style="margin-top:10px;color:#aaa;">© ${new Date().getFullYear()} Ek Paul Foundation</p>
        </div>
      </div>
    </div>
    `,
  };

  try {
    await sendEmail(foundationMail);
    await sendEmail(autoReplyMail);

    res.status(200).json({ message: "Message sent successfully ✅" });
  } catch (error) {
    console.error("Error sending contact message:", error);
    res.status(500).json({ message: "Failed to send message.", error: error.message });
  }
};
