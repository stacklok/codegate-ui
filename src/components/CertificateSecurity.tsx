import { Card } from "./ui/card";

export function CertificateSecurity() {
  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-4rem)] overflow-y-auto px-4 pr-6">
      <h1 className="text-3xl font-bold mb-8">Certificate Security</h1>

      <Card className="p-6 mb-8 bg-white shadow-lg border-2 border-teal-100">
        <h2 className="text-xl font-semibold mb-4">Understanding Certificate Security</h2>
        <p className="text-gray-700 mb-4">
          CodeGate uses a locally generated certificate authority (CA) to secure communications between your IDE and various development tools. Here's what you need to know about how it works and why it's safe.
        </p>
      </Card>

      <Card className="p-6 mb-8 bg-white shadow-lg border-2 border-teal-100">
        <h2 className="text-xl font-semibold mb-4">How It Works</h2>
        <div className="space-y-4">
          <p className="text-gray-700">The certificate works by creating a secure, encrypted tunnel for your development traffic. Here's an example of how it's used:</p>
          
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <code>{`# Example of secure connection flow
1. IDE makes request to development tool
2. CodeGate intercepts request
3. Request is encrypted using local certificate
4. Secure communication established`}</code>
          </pre>
        </div>
      </Card>

      <Card className="p-6 mb-8 bg-white shadow-lg border-2 border-teal-100">
        <h2 className="text-xl font-semibold mb-4">Security Features</h2>
        <div className="space-y-4">
          <div className="mb-4">
            <h3 className="font-semibold text-lg mb-2">Local Generation</h3>
            <p className="text-gray-700">The certificate is generated locally on your machine:</p>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <code>{`# Certificate generation process
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
└── Generates a new 4096-bit RSA key pair
└── Creates a self-signed X.509 certificate
└── Valid for one year
└── No password protection required`}</code>
            </pre>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-lg mb-2">Isolation</h3>
            <p className="text-gray-700">The certificate operates in an isolated environment:</p>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <code>{`# Security boundaries
container_process {
    certificates: {
        scope: "local_only",
        access: "isolated",
        external_connections: "blocked"
    }
}`}</code>
            </pre>
          </div>
        </div>
      </Card>

      <Card className="p-6 mb-8 bg-white shadow-lg border-2 border-teal-100">
        <h2 className="text-xl font-semibold mb-4">Best Practices</h2>
        <div className="space-y-4">
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>Only install certificates from trusted sources</li>
            <li>Regularly check certificate expiration dates</li>
            <li>Remove certificates when they're no longer needed</li>
            <li>Keep your system's certificate store clean and organized</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
