import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-3xl font-extrabold text-green-700 mb-2 text-center">
          Privacy Policy
        </h1>
        <p className="text-center text-gray-600 mb-6">
          This Privacy Policy explains how <strong>Ek Paul Foundation</strong> ("we", "us") collects and uses personal information
          when you use our website <strong>ekpaulfoundation.org</strong>.
        </p>

        <section className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">1. Information We Collect</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Contact info you provide (name, email)</li>
            <li>Donation details (amount, transaction id) required to process donations</li>
            <li>Automatically collected technical data (IP address, browser)</li>
          </ul>
        </section>

        <section className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">2. How We Use Your Information</h2>
          <p className="text-gray-700">
            We use the information you provide to:
          </p>
          <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
            <li>Process and verify donations (payments are processed securely via Razorpay).</li>
            <li>Send donation confirmations and receipts (Razorpay also sends official receipts).</li>
            <li>Send occasional updates about our work — only if you opt in or where required to maintain the service.</li>
          </ul>
        </section>

        <section className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">3. Sharing & Third Parties</h2>
          <p className="text-gray-700">
            We do not sell your personal data. We may share necessary information with trusted third parties to:
          </p>
          <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
            <li>Process payments (Razorpay) and deliver transactional emails (e.g., using Resend).</li>
            <li>Comply with legal obligations if required by law.</li>
          </ul>
        </section>

        <section className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">4. Data Retention & Security</h2>
          <p className="text-gray-700">
            We retain donation records for accounting and legal purposes. We take reasonable measures to protect your data, but no
            system is 100% secure — please contact us if you suspect any misuse.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">5. Your Rights</h2>
          <p className="text-gray-700">
            You can request access to your personal data, ask for corrections, or request deletion where applicable. To exercise these
            rights, contact us at:
          </p>
          <p className="mt-2">
            <a href="mailto:contact@ekpaulfoundation.org" className="text-green-600 underline">
              contact@ekpaulfoundation.org
            </a>
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">6. Contact & Office</h2>
          <p className="text-gray-700">
            <strong>Ek Paul Foundation</strong><br />
            Office: Jalgaon, Maharashtra, India<br />
            Website: <a href="https://www.ekpaulfoundation.org" className="text-green-600 underline">ekpaulfoundation.org</a>
          </p>
        </section>

        <p className="text-sm text-gray-500 mt-6">
          NOTE: This policy applies to <strong>ekpaulfoundation.org</strong>. We may update this policy from time to time; please
          revisit this page for changes.
        </p>
      </div>
    </div>
  );
}
