export const volunteerApprovedTemplate = (name) => `
  <div style="font-family: 'Segoe UI', Tahoma, sans-serif; background-color: #f9fff0; padding: 30px; border-radius: 10px; max-width: 500px; margin: auto; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
    <h2 style="color: #28a745; text-align: center;">Congratulations, ${name}! 🎉</h2>
    <p style="font-size: 16px; color: #333; text-align: center;">
      Your volunteer application with Ek Paul Foundation has been <strong>approved</strong> by our admin team.
    </p>

    <div style="background-color: #fff; border: 2px solid #28a745; border-radius: 8px; padding: 15px; text-align: center; margin: 25px 0;">
      <p style="color: #555; font-size: 16px;">You are now officially a verified volunteer. Welcome aboard! 🌍</p>
    </div>

    <p style="font-size: 14px; color: #666; text-align: center;">
      You will soon receive updates about upcoming events where you can contribute.  
      Thank you for being part of our mission!
    </p>

    <hr style="border:none; border-top:1px solid #ddd; margin:20px 0;" />

    <p style="font-size: 12px; color: #999; text-align: center;">
      © ${new Date().getFullYear()} Ek Paul Foundation. All rights reserved.
    </p>
  </div>
`;
