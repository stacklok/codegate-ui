import { BreadcrumbHome } from '@/components/BreadcrumbHome'
import { PageHeading } from '@/components/heading'
import { PageContainer } from '@/components/page-container'
import { Breadcrumb, Breadcrumbs, Card, CardBody } from '@stacklok/ui-kit'

const SecurityShieldIcon = () => (
  <svg viewBox="0 0 24 24" className="size-16 text-brand-700">
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
)

const KeySecurityIcon = () => (
  <svg viewBox="0 0 24 24" className="size-16 text-brand-700">
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"
    />
  </svg>
)

const OpenSourceIcon = () => (
  <svg viewBox="0 0 24 24" className="size-16 text-brand-700">
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
)

export function RouteCertificateSecurity() {
  return (
    <PageContainer className="max-w-4xl">
      <Breadcrumbs>
        <BreadcrumbHome />
        <Breadcrumb>Certificate Security</Breadcrumb>
      </Breadcrumbs>

      <PageHeading title="Certificate Security" level={1} />

      <Card className="mb-8">
        <CardBody>
          <div className="mb-4 flex justify-center">
            <SecurityShieldIcon />
          </div>
          <h2 className="mb-4 text-xl font-semibold">
            Robust Certificate Security
          </h2>
          <p className="mb-4 text-secondary">
            Security is a top priority for us. We have designed CodeGate's local
            certificate management with security in mind, balanced against ease
            of use.
          </p>
          <p className="text-secondary">
            We always seek to improve and balance security, privacy, and
            usability.
          </p>
        </CardBody>
      </Card>

      <Card className="mb-8">
        <CardBody>
          <div className="mb-4 flex justify-center">
            <KeySecurityIcon />
          </div>
          <h2 className="mb-4 text-xl font-semibold">Key security features</h2>
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-lg font-semibold">
                Per-domain certificate generation
              </h3>
              <p className="mb-2 text-secondary">
                Instead of using wildcard certificates, CodeGate generates a
                unique certificate for each domain. This approach minimizes
                security risks by limiting the impact of any single certificate
                compromise.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">
                High-strength encryption with 4096-bit RSA keys
              </h3>
              <p className="mb-2 text-secondary">
                CodeGate utilizes 4096-bit RSA keys for certificate authority
                operations, providing enhanced security compared to standard
                2048-bit keys. The increased key length significantly reduces
                the risk of brute-force attacks, ensuring long-term protection
                for your data. To balance performance, 2048-bit keys are used
                for server certificates.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">
                Secure SSL/TLS configuration
              </h3>
              <p className="mb-2 text-secondary">
                CodeGate's SSL context is configured to enforce the latest
                security standards, including strong cipher suites and disabling
                outdated protocols. This ensures secure and efficient encrypted
                communications.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">
                Certificate caching and management
              </h3>
              <p className="mb-2 text-secondary">
                Certificates are cached efficiently to optimize performance
                without compromising security. Additionally, mechanisms are in
                place to manage certificate lifecycle and prevent resource
                exhaustion.
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card className="mb-8">
        <CardBody>
          <div className="mb-4 flex justify-center">
            <OpenSourceIcon />
          </div>
          <h2 className="mb-4 text-xl font-semibold">
            Open source and community engagement
          </h2>
          <div className="space-y-4">
            <p className="text-secondary">
              Security has been a fundamental consideration throughout the
              development of CodeGate. Our comprehensive approach ensures that
              your development environment remains secure without sacrificing
              functionality or performance.
            </p>
            <p className="text-secondary">
              We believe in transparency and continuous improvement. By making
              our code open source, we invite the global security community to
              review, audit, and contribute to enhancing our security measures.
            </p>
            <p className="text-secondary">
              If you discover a security vulnerability or have suggestions for
              improvement, please reach out to us at{' '}
              <a
                href="mailto:security@stacklok.com"
                className="text-brand-600 underline hover:text-brand-800"
              >
                security@stacklok.com
              </a>
              . Your contributions help us maintain the highest security
              standards.
            </p>
            <p className="text-secondary">
              Explore our codebase on{' '}
              <a
                href="https://github.com/stacklok/codegate"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 underline hover:text-brand-800"
              >
                GitHub
              </a>{' '}
              and join our community to help ensure CodeGate is secure and
              reliable for everyone.
            </p>
          </div>
        </CardBody>
      </Card>
    </PageContainer>
  )
}
