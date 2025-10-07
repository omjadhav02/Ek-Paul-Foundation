export const volunteerVerificationTemplate = (name, otp) => `
  <div style="font-family: 'Segoe UI', Tahoma, sans-serif; background-color: #f9fafb; padding: 30px; border-radius: 10px; max-width: 500px; margin: auto; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
    <h2 style="color: #007bff; text-align: center;">Welcome to Ek Paul Foundation 🌍</h2>
    <p style="font-size: 16px; color: #333; text-align: center;">
      Hi <strong>${name}</strong>,<br/>
      Thank you for choosing to volunteer with us! Before we proceed, please verify your email.
    </p>

    <div style="background-color: #fff; border: 2px dashed #007bff; border-radius: 8px; padding: 15px; text-align: center; margin: 25px 0;">
      <h1 style="color: #007bff; letter-spacing: 4px; font-size: 32px;">${otp}</h1>
      <p style="color: #555; margin-top: 5px;">This OTP is valid for the next <strong>10 minutes</strong>.</p>
    </div>

    <p style="font-size: 14px; color: #666;">
      If you didn’t request this, please ignore this email.<br/>
      Once verified, our team will review and approve your volunteer profile.
    </p>

    <hr style="border:none; border-top:1px solid #ddd; margin:20px 0;" />

    <p style="font-size: 12px; color: #999; text-align: center;">
      © ${new Date().getFullYear()} Ek Paul Foundation. All rights reserved.
    </p>
  </div>
`;
