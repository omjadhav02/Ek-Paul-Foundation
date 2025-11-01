import React from "react";

export default function TermsAndConditions() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-3xl font-extrabold text-green-700 mb-2 text-center">
          Terms & Conditions
        </h1>
        <p className="text-center text-gray-600 mb-6">
          These terms govern your use of the Ek Paul Foundation website and donation services. Please read them carefully.
        </p>

        <section className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">1. Acceptance</h2>
          <p className="text-gray-700">
            By using <strong>ekpaulfoundation.org</strong> and making donations, you agree to these Terms & Conditions.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">2. Donations</h2>
          <p className="text-gray-700">
            Donations are processed via Razorpay. All payments are subject to Razorpay's terms and confirmation by their payment gateway.
            We will update your donation record once payment is verified.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">3. Refunds & Cancellations</h2>
          <p className="text-gray-700">
            Donations are generally non-refundable. If you believe a payment was made in error, please contact us at
            <a href="mailto:contact@ekpaulfoundation.org" className="text-green-600 underline"> contact@ekpaulfoundation.org</a> with details.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">4. Intellectual Property</h2>
          <p className="text-gray-700">
            Content on this site (text, images, logos) is owned by Ek Paul Foundation unless otherwise stated. You may not reuse
            content without permission.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">5. Limitation of Liability</h2>
          <p className="text-gray-700">
            We strive for accuracy but are not liable for indirect or incidental damages arising from using the site. Our total liability
            for any claim is limited to the amount you donated (if applicable).
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">6. Governing Law</h2>
          <p className="text-gray-700">
            These terms are governed by the laws of India.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">7. Contact</h2>
          <p className="text-gray-700">
            <strong>Ek Paul Foundation</strong><br />
            Email: <a href="mailto:contact@ekpaulfoundation.org" className="text-green-600 underline">contact@ekpaulfoundation.org</a><br />
            Office: Jalgaon, Maharashtra, India
          </p>
        </section>

        <p className="text-sm text-gray-500 mt-6">
          If you have questions about these Terms & Conditions, please contact us using the email above.
        </p>
      </div>
    </div>
  );
}
