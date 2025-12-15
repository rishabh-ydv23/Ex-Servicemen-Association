import { Link } from 'react-router-dom';

export default function TermsOfService() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy to-navyDark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-white text-4xl md:text-5xl mb-2 font-bold font-serif">Terms of Service</h1>
          <p className="text-lg text-white/90">Please read these terms carefully</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="card p-8">
          <div className="prose max-w-none">
            <p className="text-gray-700 mb-6">
              These Terms of Service ("Terms") govern your access to and use of the Ex-Servicemen Service Foundation website and services. By accessing or using our services, you agree to be bound by these Terms.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4 font-serif mt-8">Acceptance of Terms</h2>
            <p className="text-gray-700 mb-6">
              By accessing or using our services, you confirm that you are at least 18 years old and have the authority to enter into these Terms. If you do not agree to these Terms, you must not access or use our services.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4 font-serif mt-8">Services Description</h2>
            <p className="text-gray-700 mb-6">
              Ex-Servicemen Service Foundation provides a platform for Indian Armed Forces veterans to connect, participate in community activities, and access various services. Our services include event organization, notifications, gallery, and member coordination.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4 font-serif mt-8">User Accounts</h2>
            <p className="text-gray-700 mb-4">
              When you create an account with us, you must provide accurate and complete information. You are responsible for:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>Maintaining the security of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use of your account</li>
              <li>Ensuring that you are eligible to use our services</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mb-4 font-serif mt-8">User Responsibilities</h2>
            <p className="text-gray-700 mb-4">
              As a user, you agree not to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>Provide false or misleading information</li>
              <li>Impersonate any person or entity</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Interfere with or disrupt our services</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Upload or transmit viruses or malicious code</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mb-4 font-serif mt-8">Intellectual Property</h2>
            <p className="text-gray-700 mb-6">
              All content, features, and functionality on our website are owned by Ex-Servicemen Service Foundation and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4 font-serif mt-8">User Content</h2>
            <p className="text-gray-700 mb-4">
              You retain ownership of any content you submit to our services. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>Use, reproduce, and display your content in connection with our services</li>
              <li>Modify your content for technical formatting purposes</li>
              <li>Distribute your content as part of our services</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mb-4 font-serif mt-8">Privacy</h2>
            <p className="text-gray-700 mb-6">
              Your privacy is important to us. Please review our Privacy Policy, which explains how we collect, use, and share your personal information.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4 font-serif mt-8">Disclaimer of Warranties</h2>
            <p className="text-gray-700 mb-6">
              Our services are provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that our services will be uninterrupted, secure, or error-free.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4 font-serif mt-8">Limitation of Liability</h2>
            <p className="text-gray-700 mb-6">
              To the fullest extent permitted by law, Ex-Servicemen Service Foundation shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4 font-serif mt-8">Indemnification</h2>
            <p className="text-gray-700 mb-6">
              You agree to indemnify, defend, and hold harmless Ex-Servicemen Service Foundation and its affiliates from any claims, liabilities, damages, losses, and expenses arising out of your use of our services.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4 font-serif mt-8">Termination</h2>
            <p className="text-gray-700 mb-6">
              We may terminate or suspend your access to our services immediately, without prior notice, for any reason, including breach of these Terms.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4 font-serif mt-8">Governing Law</h2>
            <p className="text-gray-700 mb-6">
              These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4 font-serif mt-8">Changes to Terms</h2>
            <p className="text-gray-700 mb-6">
              We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page and updating the effective date.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4 font-serif mt-8">Contact Information</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms, please contact us:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>By email: exservicmenasso.india@gmail.com</li>
              <li>By phone: +91 82994 71336</li>
              <li>By mail: 913/1, Adarsh Nagar, Hiran Nagar, Unnao, Uttar Pradesh 209801</li>
            </ul>

            <div className="border-t border-gray-200 pt-6 mt-8">
              <p className="text-gray-600">
                <strong>Effective Date:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}