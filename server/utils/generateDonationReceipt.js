import PDFDocument from "pdfkit";

/**
 * Generate Donation Receipt as PDF
 * @param {Object} donation
 * @param {string} donation.name
 * @param {string} donation.email
 * @param {number} donation.amount
 * @param {string} donation.transactionId
 * @param {Date|string} donation.date
 * @returns {Promise<Buffer>}
 */
export const generateDonationReceipt = (donation) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const chunks = [];

      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));

      // === HEADER ===
      doc
        .font("Helvetica-Bold")
        .fontSize(20)
        .fillColor("#157347")
        .text("Ek Paul Foundation", { align: "center" });

      doc
        .moveDown(0.3)
        .font("Helvetica")
        .fontSize(12)
        .fillColor("black")
        .text("Registered Non-Profit Organization", { align: "center" })
        .moveDown(0.2)
        .text("Email: contact@ekpaulfoundation.org ", {
          align: "center",
        })
        .moveDown(1);

      doc
        .moveTo(50, doc.y)
        .lineTo(550, doc.y)
        .strokeColor("#157347")
        .stroke();

      // === RECEIPT TITLE ===
      doc
        .moveDown(1)
        .font("Helvetica-Bold")
        .fontSize(16)
        .fillColor("#000000")
        .text("Donation Receipt", { align: "center" })
        .moveDown(0.8);

      // === RECEIPT INFO ===
      const tableTop = doc.y + 10;
      const leftX = 70;
      const rightX = 300;

      const donationDate = donation.date
        ? new Date(donation.date)
        : new Date(donation.createdAt);

      const formattedDate = donationDate.toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      });

      const details = [
        ["Receipt No:", donation.transactionId],
        ["Donor Name:", donation.name],
        ["Email:", donation.email],
        ["Amount Donated:", `₹${donation.amount.toLocaleString("en-IN")}`],
        ["Date:", formattedDate],
        ["Payment Status:", "Successful"],
      ];

      doc.font("Helvetica").fontSize(12).fillColor("black");

      details.forEach(([label, value], i) => {
        const y = tableTop + i * 25;
        doc.text(label, leftX, y);
        doc.text(value, rightX, y);
      });

      // === SEPARATOR LINE ===
      doc
        .moveDown(1.5)
        .moveTo(50, doc.y)
        .lineTo(550, doc.y)
        .strokeColor("#ccc")
        .stroke()
        .moveDown(1);

      // === THANK YOU SECTION ===
      doc
        .font("Helvetica-Oblique")
        .fontSize(13)
        .fillColor("#333")
        .text(
          "Thank you for your kind support. Your contribution will help us bring positive change and empower lives.",
          {
            align: "center",
            lineGap: 5,
          }
        )
        .moveDown(2);

      // === SIGNATURE AREA ===
      doc
        .font("Helvetica")
        .fontSize(12)
        .fillColor("black")
        .text("Authorized Signature:", 70, doc.y)
        .moveDown(1)
        .font("Helvetica-Bold")
        .text("____________________", 70)
        .fontSize(11)
        .text("Ek Paul Foundation", 70)
        .moveDown(3);

      // === FOOTER ===
      doc
        .fontSize(10)
        .fillColor("#777")
        .text(
          "This is a computer-generated receipt. No physical signature required.",
          70,
          doc.page.height - 100,
          { align: "center", width: 460 }
        );

      doc
        .font("Helvetica-Oblique")
        .fontSize(10)
        .fillColor("#999")
        .text(
          "POWERED BY M-31",
          70,
          doc.page.height - 80,
          { align: "center", width: 460 }
        );

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};
