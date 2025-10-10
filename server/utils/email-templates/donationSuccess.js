export const donationSuccessTemplate = (name, amount, date, transactionId) => `<meta charset="UTF-8">
<div style="font-family: 'Segoe UI', Tahoma, sans-serif; background-color: #f7fdfb; padding: 25px; border-radius: 10px; max-width: 550px; margin: auto; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
  <h2 style="color: #2e8b57; text-align: center; margin-bottom: 8px;">Thank You, ${name}! 💚</h2>
  <p style="font-size: 15px; color: #333; text-align: center; margin-top: 0;">
    Your generous donation to <strong>Ek Paul Foundation</strong> has been received successfully.
  </p>

  <div style="background-color: #ffffff; border: 1px solid #2e8b57; border-radius: 8px; padding: 16px; margin: 25px 0;">
    <h3 style="color: #2e8b57; text-align: center; margin-bottom: 16px; font-size: 18px;">Donation Receipt</h3>
    <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #333; word-break: break-word;">
      <tr>
        <td style="padding: 8px; width: 50%;">Name:</td>
        <td style="padding: 8px; text-align: right;"><strong>${name}</strong></td>
      </tr>
      <tr>
        <td style="padding: 8px;">Amount Donated:</td>
        <td style="padding: 8px; text-align: right;"><strong>₹${amount}</strong></td>
      </tr>
      <tr>
        <td style="padding: 8px;">Date:</td>
        <td style="padding: 8px; text-align: right;">${date}</td>
      </tr>
      <tr>
        <td style="padding: 8px;">Transaction ID:</td>
        <td style="padding: 8px; text-align: right; font-size: 13px; color: #444;">${transactionId}</td>
      </tr>
    </table>
  </div>

  <div style="text-align: center; margin-top: 25px;">
    <a 
      href="#" 
      style="display: inline-block; background-color: #2e8b57; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-size: 15px; font-weight: 500;">
      📄 Your PDF Receipt is attached
    </a>
  </div>

  <p style="font-size: 14px; color: #555; text-align: center; margin-top: 25px;">
    Your contribution helps us continue our mission to bring positive change. Every step counts, and you just took a big one! 🌱
  </p>

  <hr style="border:none; border-top:1px solid #ddd; margin:25px 0;" />

  <p style="font-size: 12px; color: #999; text-align: center;">
    © ${new Date().getFullYear()} Ek Paul Foundation. All rights reserved.
  </p>
</div>
`;
