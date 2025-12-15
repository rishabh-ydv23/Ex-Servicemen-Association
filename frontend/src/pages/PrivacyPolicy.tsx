import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy to-navyDark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-white text-4xl md:text-5xl mb-2 font-bold font-serif">Privacy Policy</h1>
          <p className="text-lg text-white/90">Your privacy is important to us</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="card p-8">
          <div className="prose max-w-none">
            <p className="text-gray-700 mb-6">
              This Privacy Policy describes how Ex-Servicemen Service Foundation ("we", "us", or "our") collects, uses, and shares your personal information when you visit our website or use our services.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4 font-serif mt-8">Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-navy mb-3">Personal Information</h3>
            <p className="text-gray-700 mb-4">
              When you register for an account or use our services, we may collect:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>Name and contact information (email address, phone number, mailing address)</li>
              <li>Account credentials (username, password)</li>
              <li>Service details (branch, rank, dates of service)</li>
              <li>Demographic information</li>
              <li>Payment information (if applicable)</li>
            </ul>

            <h3 className="text-xl font-semibold text-navy mb-3">Automatically Collected Information</h3>
            <p className="text-gray-700 mb-4">
              When you access our website, we automatically collect certain information:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>IP address and device information</li>
              <li>Browsing activity and usage data</li>
              <li>Cookies and similar tracking technologies</li>
              <li>Referring URLs and exit pages</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mb-4 font-serif mt-8">How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">
              We use the collected information for various purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>To provide, maintain, and improve our services</li>
              <li>To communicate with you, including sending updates and notifications</li>
              <li>To process transactions and send related information</li>
              <li>To verify your identity and prevent fraud</li>
              <li>To comply with legal obligations</li>
              <li>To analyze usage patterns and improve user experience</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mb-4 font-serif mt-8">Information Sharing</h2>
            <p className="text-gray-700 mb-4">
              We may share your information in the following situations:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>With service providers who assist us in operating our website and services</li>
              <li>With law enforcement or regulatory authorities when required by law</li>
              <li>In connection with a merger, acquisition, or sale of assets</li>
              <li>With your consent or at your direction</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mb-4 font-serif mt-8">Data Security</h2>
            <p className="text-gray-700 mb-6">
              We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4 font-serif mt-8">Data Retention</h2>
            <p className="text-gray-700 mb-6">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4 font-serif mt-8">Your Rights</h2>
            <p className="text-gray-700 mb-4">
              Depending on your location, you may have certain rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>The right to access, update, or delete your personal information</li>
              <li>The right to object to processing of your personal information</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mb-4 font-serif mt-8">Cookies</h2>
            <p className="text-gray-700 mb-6">
              We use cookies and similar tracking technologies to enhance your browsing experience. You can control cookies through your browser settings.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4 font-serif mt-8">Children's Privacy</h2>
            <p className="text-gray-700 mb-6">
              Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4 font-serif mt-8">Changes to This Policy</h2>
            <p className="text-gray-700 mb-6">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the effective date.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4 font-serif mt-8">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy, please contact us:
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