import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

/**
 * Generates a single-page professional donation receipt PDF
 * and returns the file path once writing completes.
 */
export const generateDonationReceipt = async (donation) => {
  const { name, amount, transactionId, createdAt, email, phone } = donation;

  // Ensure /temp folder exists
  const tempDir = path.resolve("./temp");
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

  const filePath = path.join(tempDir, `receipt_${transactionId}.pdf`);
  const doc = new PDFDocument({ margin: 50, size: "A4", autoFirstPage: true });
  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  const primaryColor = "#004AAD";
  const gray = "#444";
  const startX = 70;
  let y = 60;

  // Disable automatic page break — keep one page only
  doc.on("pageAdded", () => {
    doc.removePage(doc.page); // Prevent new pages
  });

  // ---------- HEADER ----------
  doc
    .font("Helvetica-Bold")
    .fontSize(22)
    .fillColor(primaryColor)
    .text("Ek Paul Foundation", { align: "center" });

  doc
    .font("Helvetica")
    .fontSize(11)
    .fillColor(gray)
    .text("Registered NGO, Jalgaon, Maharashtra", { align: "center" })
    .text("“Together, we make the world a better place.”", { align: "center" });

  y += 70;
  doc
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke(primaryColor);
  y += 25;

  // ---------- RECEIPT TITLE ----------
  doc
    .font("Helvetica-Bold")
    .fontSize(16)
    .fillColor(primaryColor)
    .text("Donation Receipt", { align: "center" });

  y += 40;

  // ---------- RECEIPT INFO TABLE ----------
  const info = [
    ["Donor Name", name || "N/A"],
    ["Email", email || "N/A"],
    ["Phone", phone || "N/A"],
    ["Donation Amount", `Rs ${amount}/-`],
    ["Payment ID", transactionId],
    [
      "Date & Time",
      new Date(createdAt).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Asia/Kolkata",
      }),
    ],
  ];

  const labelX = 70;
  const valueX = 240;
  const rowHeight = 24;

  info.forEach(([label, value], i) => {
    const bg = i % 2 === 0 ? "#F8FAFC" : "#FFFFFF";
    doc
      .rect(labelX - 10, y - 6, 400, rowHeight)
      .fillAndStroke(bg, "#E5E7EB");

    doc
      .font("Helvetica-Bold")
      .fontSize(11)
      .fillColor(primaryColor)
      .text(label, labelX, y);

    doc
      .font("Helvetica")
      .fillColor("#000")
      .text(value, valueX, y);

    y += rowHeight;
  });

  y += 30;

  // ---------- THANK YOU MESSAGE ----------
  const message = `Dear ${name || "Donor"},\n\nThank you for your generous contribution to Ek Paul Foundation. Your donation helps us continue our mission to uplift underprivileged communities, support education, and provide essential resources to those in need.\n\nWe deeply appreciate your kindness and belief in our vision.`;

  doc
    .font("Helvetica")
    .fontSize(11)
    .fillColor("#333")
    .text(message, 70, y, { width: 460, align: "justify" });

  // ---------- FOOTER ----------
  const footerY = 700;
  doc
    .moveTo(50, footerY)
    .lineTo(550, footerY)
    .stroke(primaryColor);

  doc
    .fontSize(10)
    .fillColor(gray)
    .text("With gratitude,", 70, footerY + 10)
    .text("Team Ek Paul Foundation", 70, footerY + 25)
    .fillColor(primaryColor)
    .text("Contact: contact@ekpaulfoundation.org", 70, footerY + 45)
    .text("Visit: https://www.ekpaulfoundation.org", 70, footerY + 60)
    .fillColor("#000")
    .text("© 2025 Ek Paul Foundation. All Rights Reserved.", 70, footerY + 80, {
      align: "center",
      width: 460,
    });

  doc.end();

  // ✅ Wait until PDF is written completely
  return new Promise((resolve, reject) => {
    stream.on("finish", () => resolve(filePath));
    stream.on("error", reject);
  });
};
