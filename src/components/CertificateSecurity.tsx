import { Card } from "./ui/card";

const SecurityShieldIcon = () => (
  <svg viewBox="0 0 24 24" className="w-16 h-16 text-teal-600">
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
    />
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4"
    />
  </svg>
);

const KeySecurityIcon = () => (
  <svg viewBox="0 0 24 24" className="w-16 h-16 text-teal-600">
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"
    />
  </svg>
);

const OpenSourceIcon = () => (
  <svg viewBox="0 0 24 24" className="w-16 h-16 text-teal-600">
    <circle
      cx="12"
      cy="12"
      r="10"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v12m-6-6h12"
    />
  </svg>
);

export function CertificateSecurity() {
  return (
    <div className="flex flex-col h-full">
      <div className="max-w-4xl mx-auto mb-4">
        <h1 className="text-3xl font-bold mb-8">Certificate Security</h1>

        <Card className="p-6 mb-8 bg-white shadow-lg border-2 border-gray-100">
          <div className="flex justify-center mb-4">
            <SecurityShieldIcon />
          </div>
          <h2 className="text-xl font-semibold mb-4">
            Robust Certificate Security
          </h2>
          <p className="text-gray-700 mb-4">
            Security is a top priority for us. We have designed CodeGate's local
            certificate management with security in mind, balanced against ease
            of use.
          </p>
          <p className="text-gray-700">
            We always seek to improve and balance security, privacy, and
            usability.
          </p>
        </Card>

        <Card className="p-6 mb-8 bg-white shadow-lg border-2 border-gray-100">
          <div className="flex justify-center mb-4">
            <KeySecurityIcon />
          </div>
          <h2 className="text-xl font-semibold mb-4">Key security features</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">
                Per-domain certificate generation
              </h3>
              <p className="text-gray-700 mb-2">
                Instead of using wildcard certificates, CodeGate generates a
                unique certificate for each domain. This approach minimizes
                security risks by limiting the impact of any single certificate
                compromise.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">
                High-strength encryption with 4096-bit RSA keys
              </h3>
              <p className="text-gray-700 mb-2">
                CodeGate utilizes 4096-bit RSA keys for certificate authority
                operations, providing enhanced security compared to standard
                2048-bit keys. The increased key length significantly reduces
                the risk of brute-force attacks, ensuring long-term protection
                for your data. To balance performance, 2048-bit keys are used
                for server certificates.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">
                Secure SSL/TLS configuration
              </h3>
              <p className="text-gray-700 mb-2">
                CodeGate's SSL context is configured to enforce the latest
                security standards, including strong cipher suites and disabling
                outdated protocols. This ensures secure and efficient encrypted
                communications.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">
                Certificate caching and management
              </h3>
              <p className="text-gray-700 mb-2">
                Certificates are cached efficiently to optimize performance
                without compromising security. Additionally, mechanisms are in
                place to manage certificate lifecycle and prevent resource
                exhaustion.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 mb-8 bg-white shadow-lg border-2 border-gray-100">
          <div className="flex justify-center mb-4">
            <OpenSourceIcon />
          </div>
          <h2 className="text-xl font-semibold mb-4">
            Open source and community engagement
          </h2>
          <div className="space-y-4">
            <p className="text-gray-700">
              Security has been a fundamental consideration throughout the
              development of CodeGate. Our comprehensive approach ensures that
              your development environment remains secure without sacrificing
              functionality or performance.
            </p>
            <p className="text-gray-700">
              We believe in transparency and continuous improvement. By making
              our code open source, we invite the global security community to
              review, audit, and contribute to enhancing our security measures.
            </p>
            <p className="text-gray-700">
              If you discover a security vulnerability or have suggestions for
              improvement, please reach out to us at{" "}
              <a
                href="mailto:security@stacklok.com"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                security@stacklok.com
              </a>
              . Your contributions help us maintain the highest security
              standards.
            </p>
            <p className="text-gray-700">
              Explore our codebase on{" "}
              <a
                href="https://github.com/stacklok/codegate"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                GitHub
              </a>{" "}
              and join our community to help ensure CodeGate is secure and
              reliable for everyone.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
