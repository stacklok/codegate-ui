import { Button } from "./ui/button";
import { Card } from "./ui/card";

export function Certificates() {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/certificates/codegate_ca.crt';
    link.download = 'codegate.crt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-4rem)] overflow-y-auto px-4 pr-6">
      <h1 className="text-3xl font-bold mb-8">Certificate Download</h1>
      
      <Card className="p-6 mb-8 bg-white shadow-lg border-2 border-teal-100">
        <div className="flex items-start gap-6">
          <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div className="flex-grow">
            <h2 className="text-xl font-semibold mb-2">CodeGate SSL Certificate</h2>
            <p className="text-gray-600 mb-4">
              This certificate allows CodeGate to act as a proxy for certain software such as CoPilot.
            </p>
            <Button
              onClick={handleDownload}
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              Download Certificate
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6 mb-8 bg-white shadow-lg border-2 border-teal-100">
        <h2 className="text-xl font-semibold mb-4">Is this certificate safe to install on my machine?</h2>
        <div className="space-y-4">
          <div className="flex gap-3">
            <svg className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-700"><strong>Local Only:</strong> CodeGate runs entirely on your machine within an isolated container, ensuring all data processing stays local without any external transmissions.</p>
          </div>
          
          <div className="flex gap-3">
            <svg className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-700"><strong>Secure Certificate Handling:</strong> This custom CA is locally generated and managed, the developers of CodeGate have no access to it.</p>
          </div>
          
          <div className="flex gap-3">
            <svg className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-700"><strong>No External Communications:</strong> CodeGate is designed with no capability to call home or communicate with external servers, outside of those requested by the IDE or Agent.</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 mb-8 bg-white shadow-lg border-2 border-teal-100">
        <h2 className="text-xl font-semibold mb-4">Installation Instructions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-2">macOS Instructions:</h3>
            <ol className="list-decimal ml-6 space-y-2 text-gray-700">
              <li>Double-click the downloaded certificate file</li>
              <li>Keychain Access will open automatically</li>
              <li>Add the certificate to the System keychain</li>
              <li>Double-click the imported certificate</li>
              <li>Expand the "Trust" section</li>
              <li>Set "When using this certificate" to "Always Trust"</li>
            </ol>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-2">Windows Instructions:</h3>
            <ol className="list-decimal ml-6 space-y-2 text-gray-700">
              <li>Double-click the downloaded certificate file</li>
              <li>Click "Install Certificate"</li>
              <li>Select "Local Machine" and click Next</li>
              <li>Choose "Place all certificates in the following store"</li>
              <li>Click "Browse" and select "Trusted Root Certification Authorities"</li>
              <li>Click "Next" and then "Finish"</li>
            </ol>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Linux Instructions:</h3>
            <ol className="list-decimal ml-6 space-y-2 text-gray-700">
              <li>Copy the certificate to /usr/local/share/ca-certificates/</li>
              <li>Rename it to have a .crt extension</li>
              <li>Run: sudo update-ca-certificates</li>
              <li>Restart your browser</li>
            </ol>
          </div>
        </div>
      </Card>
    </div>
  );
}
