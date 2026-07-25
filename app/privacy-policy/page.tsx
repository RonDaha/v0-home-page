"use client"

import { Shader, Swirl } from "shaders/react"
import { GrainOverlay } from "@/components/grain-overlay"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { useRef, useEffect, useState } from "react"

export default function PrivacyPolicyPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const shaderContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const setShaderHeight = () => {
      if (shaderContainerRef.current && window.innerWidth < 768) {
        shaderContainerRef.current.style.height = `${window.innerHeight * 1.2}px`
      } else if (shaderContainerRef.current) {
        shaderContainerRef.current.style.height = ""
      }
    }
    setShaderHeight()
    window.addEventListener("orientationchange", setShaderHeight)
    return () => window.removeEventListener("orientationchange", setShaderHeight)
  }, [])

  useEffect(() => {
    const checkShaderReady = () => {
      if (shaderContainerRef.current) {
        const canvas = shaderContainerRef.current.querySelector("canvas")
        if (canvas && canvas.width > 0 && canvas.height > 0) {
          setIsLoaded(true)
          return true
        }
      }
      return false
    }

    if (checkShaderReady()) return

    const intervalId = setInterval(() => {
      if (checkShaderReady()) {
        clearInterval(intervalId)
      }
    }, 100)

    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 1500)

    return () => {
      clearInterval(intervalId)
      clearTimeout(fallbackTimer)
    }
  }, [])

  return (
    <main className="relative min-h-screen w-full bg-background">
      <GrainOverlay />

      <div
        ref={shaderContainerRef}
        className={`shader-fixed-height fixed inset-0 z-0 transition-opacity duration-700 pointer-events-none ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ contain: "strict" }}
      >
        <Shader className="h-full w-full">
          <Swirl
            colorA="#71b6ee"
            colorB="#ee6464"
            speed={0.8}
            detail={0.8}
            blend={50}
            coarseX={40}
            coarseY={40}
            mediumX={40}
            mediumY={40}
            fineX={40}
            fineY={40}
          />
        </Shader>
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <Header isLoaded={isLoaded} currentSection={0} />

      <div
        className={`relative z-10 flex flex-col w-full transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <article className="mx-auto w-full max-w-4xl px-4 py-24 md:px-12 md:py-32 lg:px-16">
          <h1 className="mb-6 font-sans text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Upspring Privacy Policy
          </h1>
          <p className="mb-12 font-mono text-sm text-foreground/60">Last Updated: Jul 25, 2026</p>

          <div className="prose prose-invert max-w-none space-y-8 text-foreground/80">
            <p>
              Spring AI Tech Ltd. (doing business as Upspring) is committed to protecting your privacy. This Privacy
              Policy explains what information we collect from users of our website and services (collectively, the
              "Service" or "Upspring"), how we use and share that information, and the choices you have regarding your
              information. This policy applies to all personal information collected or processed by Upspring in
              connection with the operation of our platform, whether you are a direct user of Upspring or interacting
              with us in other ways (such as visiting our marketing website or contacting us for support).
            </p>
            <p>
              By using Upspring, you agree to the collection and use of information in accordance with this Privacy
              Policy. If you do not agree with this policy, you should not use our Service.
            </p>

            {/* Section 1 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground md:text-3xl">1. Information We Collect</h2>
              <p>
                We collect various types of information from or about you (and, in some cases, from your customers or
                end-users if you integrate Upspring with your systems). This includes:
              </p>

              <h3 className="text-xl font-semibold text-foreground">1.1 Information You Provide Directly</h3>
              <p>
                <strong>Account Registration Information:</strong> When you sign up for Upspring, we may collect
                personal details such as your name, business or company name, email address, phone number, job title,
                and a password. If you register using a third-party account (for example, signing in via Google or
                another service), we will receive basic profile information from those accounts as needed (such as your
                name and email).
              </p>
              <p>
                <strong>Profile and Organization Data:</strong> If you create a user profile or provide additional
                information within the platform, we collect that data. This may include a profile photo, timezone, roles
                or team affiliations, and any preferences you set.
              </p>
              <p>
                <strong>Payment and Billing Information:</strong> If you subscribe to a paid plan, our payment processor
                (a third-party service) will collect your payment card details or other billing information. We may also
                collect billing contact name, billing address, and tax identification (e.g., VAT number) if relevant.
                Note: Upspring itself does not store your full credit card information; that is handled by our
                PCI-compliant payment processor.
              </p>
              <p>
                <strong>Communications with Us:</strong> If you contact Upspring support or communicate with us via
                email, chat, or phone, we will collect the information you provide in those communications. This can
                include your contact details and the content of your inquiry or feedback.
              </p>
              <p>
                <strong>Survey, Contest, or Feedback Information:</strong> If you participate in a survey, contest, user
                research, or respond to our request for feedback, we collect any information you choose to provide,
                which might include your email, opinions, or testimonial.
              </p>

              <h3 className="text-xl font-semibold text-foreground">
                1.2 Information We Collect from Your Use of the Service
              </h3>
              <p>
                <strong>Store and Marketing Data (User-Provided Integration Data):</strong> Upspring is designed to
                integrate with your e-commerce platforms, advertising accounts, and other marketing tools to gather data
                and automate campaigns. When you connect these services (such as connecting your Shopify store,
                Facebook/Meta Ads account, Google Analytics, email marketing platform, etc.), we collect data from those
                sources as needed to provide our Service. This may include:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>E-commerce Data:</strong> Product information, inventory levels, sales and order data,
                  customer purchase history, and other store performance metrics.
                </li>
                <li>
                  <strong>Advertising and Campaign Data:</strong> Information about your advertising campaigns and
                  marketing activities, such as ads run, budgets, impressions, clicks, conversions, and associated
                  performance metrics.
                </li>
                <li>
                  <strong>Customer Engagement Data:</strong> If you use Upspring to manage customer communications, we
                  will process relevant customer contact info and engagement data.
                </li>
                <li>
                  <strong>Inspiration & Competitor Data:</strong> If you utilize features like the Inspiration Library
                  or Competitor Analysis, we may collect or store data related to ads or content from third-party
                  libraries or public sources.
                </li>
              </ul>
              <p>
                <strong>Usage Data:</strong> We automatically collect information about how you and your users interact
                with Upspring. This includes log data (IP address, date and time of access, pages viewed, actions
                taken), device and software data (operating system, browser type, device identifiers), and any errors
                encountered.
              </p>
              <p>
                <strong>Cookies and Similar Technologies:</strong> We and our service providers use cookies, web
                beacons, pixels, and similar tracking technologies on our website and within the app to collect
                information about your usage and to recognize you across different services and devices.
              </p>
              <p>
                <strong>Analytics Data:</strong> We use internal and third-party analytics tools to collect information
                about user behavior and demographics to help us improve the user experience and the Service's
                functionality. This does not include data obtained from Google APIs, which is processed separately in accordance with Google's Limited Use requirements.
              </p>
              <p>
                <strong>AI Recommendation Data:</strong> When Upspring's AI features analyze your store data to provide
                proactive campaign suggestions or performance insights, we collect the input data and the output for
                your use.
              </p>

              <h3 className="text-xl font-semibold text-foreground">1.3 Information from Third Parties</h3>
              <p>
                <strong>Third-Party Integrations:</strong> If you link or integrate third-party services with Upspring,
                those services may send us information about you or your end-customers.
              </p>
              <p>
                <strong>Partners and Referrals:</strong> We may receive your information from business partners or
                referral programs.
              </p>
              <p>
                <strong>Publicly Available Sources:</strong> We might collect business contact information from public
                sources for outreach and marketing purposes in compliance with applicable laws.
              </p>

              <h3 className="text-xl font-semibold text-foreground">1.4 Children's Data</h3>
              <p>
                Upspring is not intended for use by individuals under the age of 18. We do not knowingly collect
                personal information from children under 18. If you are under 18, please do not use the Service or send
                us any personal information. If we learn that we have inadvertently collected personal data from a child
                under 18, we will take steps to delete such information promptly. (If you believe we might have any
                information from or about a minor, please contact us at info@upspring.ai.)
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground md:text-3xl">2. How We Use Your Information</h2>
              <p>
                Upspring uses the collected information for various purposes in order to provide, maintain, and improve
                our Service, and to support our business operations. The main uses of information are:
              </p>

              <h3 className="text-xl font-semibold text-foreground">2.1 To Provide and Maintain the Service</h3>
              <p>
                <strong>Operate the Platform:</strong> We use your information to allow you to log in, use the features,
                and generally to perform the contract with you.
              </p>
              <p>
                <strong>Personalize Your Experience:</strong> We use data to customize the Service for you, such as
                remembering your dashboard layout, recommending content relevant to your industry, or pre-filling
                settings based on your past usage.
              </p>
              <p>
                <strong>Processing Transactions:</strong> For paid users, we use billing information to process
                subscription payments and any other transactions, and to manage your subscription.
              </p>
              <p>
                <strong>Account Management:</strong> We may use your information to send you important account
                notifications, such as registration confirmation, subscription renewal, payment issues, or security
                updates.
              </p>

              <h3 className="text-xl font-semibold text-foreground">2.2 To Improve and Develop the Service</h3>
              <p>
                <strong>Service Improvement:</strong> We analyze usage data and feedback to understand how our product
                is being used and how it can be improved.
              </p>
              <p>
                <strong>New Features and AI Training:</strong> We may use aggregated and anonymized data that does not include data obtained from Google APIs to develop new features or improve our AI algorithms. If we ever use your data for
                machine learning training that goes beyond providing the Service to you, we will do so either with your
                consent or in a manner that ensures personal or proprietary identifiers are removed.
              </p>
              <p>
                <strong>Research and Analytics:</strong> We might use certain data for internal research, such as
                evaluating the effectiveness of a new feature or understanding the demographics of our user base.
              </p>

              <h3 className="text-xl font-semibold text-foreground">2.3 To Communicate with You</h3>
              <p>
                <strong>Service and Account Communications:</strong> We will contact you to send transactional or
                relationship messages, such as welcoming you to Upspring, informing you of important account
                information, notifying you of product updates, and responding to your inquiries.
              </p>
              <p>
                <strong>User Guides and Tips:</strong> We might send emails or in-app messages to help you better use
                Upspring.
              </p>
              <p>
                <strong>Marketing and Promotional Communications:</strong> If you have subscribed to our newsletter or
                agreed to receive marketing communications, we will send you emails about new features, special offers,
                webinars, newsletters, or events. You will always have the option to opt out.
              </p>
              <p>
                <strong>Push Notifications:</strong> With your consent, we may send push notifications or alerts to your
                device. You can control these via your device or app settings.
              </p>

              <h3 className="text-xl font-semibold text-foreground">
                2.4 To Facilitate Marketing Campaigns on Your Behalf
              </h3>
              <p>
                <strong>Campaign Content and Automation:</strong> We use the store data and customer data you provide to
                create and execute marketing campaigns as directed by you.
              </p>
              <p>
                <strong>Personalization:</strong> Our AI and automation features may personalize communications to your
                end-customers using their purchase history or browsing behavior.
              </p>
              <p>
                <strong>Ad Management:</strong> If you connect advertising accounts, we use the data from those accounts
                to inform campaign strategies and may assist in creating or adjusting ad campaigns with your
                instruction.
              </p>

              <h3 className="text-xl font-semibold text-foreground">2.5 For Security and Legal Compliance</h3>
              <p>
                <strong>Security and Fraud Detection:</strong> We use information to monitor for suspicious or
                fraudulent activity on our platform, to detect potential threats, and to verify accounts.
              </p>
              <p>
                <strong>Enforcing Terms and Policies:</strong> Information may be used to investigate and enforce our
                Terms of Service and other legal terms.
              </p>
              <p>
                <strong>Legal Obligations:</strong> We may process personal data to comply with applicable laws or
                regulations.
              </p>
              <p>
                <strong>Protecting Rights and Interests:</strong> We may use or disclose information as we believe
                necessary to protect the rights, property, or safety of Upspring, our users, or others.
              </p>

              <h3 className="text-xl font-semibold text-foreground">2.6 Other Purposes with Consent</h3>
              <p>
                If we intend to use your personal information for a purpose that is not covered in this Privacy Policy
                or that is materially different from the purposes we collected it for, we will seek your consent.
              </p>
            </section>

            {/* Section 3 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground md:text-3xl">3. How We Share Your Information</h2>
              <p>
                We do not sell your personal information to third parties. We only share your information in limited
                circumstances, described below, and always with appropriate safeguards and only as necessary.
              </p>

              <h3 className="text-xl font-semibold text-foreground">3.1 Service Providers and Partners</h3>
              <p>
                We employ trusted third-party companies and individuals to help us provide, analyze, and improve the
                Service. These service providers include:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>Hosting and Infrastructure:</strong> Cloud hosting providers (such as AWS, Google Cloud, or
                  Azure) to store data and run our application.
                </li>
                <li>
                  <strong>Payment Processors:</strong> Third-party payment gateways (like Stripe, PayPal) to handle
                  billing securely.
                </li>
                <li>
                  <strong>Email and Communication Tools:</strong> Services to send emails, app notifications, or chat
                  communications.
                </li>
                <li>
                  <strong>Analytics and Monitoring:</strong> Analytics providers (e.g., Google Analytics) and
                  error-tracking tools to maintain service quality.
                </li>
                <li>
                  <strong>Customer Support Systems:</strong> CRM or support platform partners to handle support
                  requests.
                </li>
                <li>
                  <strong>Marketing and Advertising Partners:</strong> Partners to help promote Upspring in a
                  privacy-conscious way.
                </li>
              </ul>
              <p>
                Data obtained from Google APIs is not shared with third-party analytics, marketing, or advertising providers.
              </p>

              <h3 className="text-xl font-semibold text-foreground">3.2 Within Our Corporate Group</h3>
              <p>
                If Spring AI Tech Ltd. has affiliates, subsidiaries, or parent companies, we may share your information
                within that corporate group. Any such entity will follow this Privacy Policy.
              </p>

              <h3 className="text-xl font-semibold text-foreground">3.3 Business Transfers</h3>
              <p>
                If Upspring is involved in a merger, acquisition, financing due diligence, reorganization, bankruptcy,
                or sale of company assets, your information may be transferred as part of that transaction. We would
                contractually require the new owner to continue honoring this Privacy Policy.
              </p>

              <h3 className="text-xl font-semibold text-foreground">3.4 Legal Compliance and Protection</h3>
              <p>
                We may disclose your information if required to do so by law or if we have a good faith belief that such
                action is necessary to:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Comply with legal obligations (subpoenas, warrants, court orders)</li>
                <li>Regulatory compliance</li>
                <li>Protect rights and safety of our company, users, or the public</li>
                <li>Enforce our agreements</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground">3.5 Your Sharing and Directions</h3>
              <p>
                <strong>With Other Users at Your Direction:</strong> If you invite team members or connect multiple user
                accounts under an organization, certain information will be shared among those users.
              </p>
              <p>
                <strong>Third-Party Integrations at Your Request:</strong> When you integrate or share data between
                Upspring and third-party services, you are directing us to share certain information with that service.
              </p>
              <p>
                <strong>Social Media or Public Posting:</strong> If you choose to link Upspring with a social media
                account or publish content publicly, that information will be viewable by those networks or the public.
              </p>

              <h3 className="text-xl font-semibold text-foreground">3.6 Aggregated or De-Identified Data</h3>
              <p>
                We may share information that has been aggregated or anonymized in such a way that it cannot reasonably
                be used to identify you. This data will not include anything that could be linked back to any individual
                person or a specific organization.
              </p>
            </section>

            {/* Section 4 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground md:text-3xl">
                4. Cookies and Tracking Technologies
              </h2>
              <p>
                Cookies are small data files stored on your browser or device. Upspring and our analytics or advertising
                partners use cookies and similar technologies (like pixels, web beacons, and local storage) to provide
                our Service and gather information.
              </p>

              <h3 className="text-xl font-semibold text-foreground">4.1 How We Use Cookies</h3>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>Essential Cookies:</strong> Necessary for the website or app to function (login sessions, form
                  inputs).
                </li>
                <li>
                  <strong>Performance and Analytics Cookies:</strong> Collect information about how users interact with
                  our Service to improve performance and design.
                </li>
                <li>
                  <strong>Functionality Cookies:</strong> Remember preferences you set and improve your experience.
                </li>
                <li>
                  <strong>Advertising and Marketing Cookies:</strong> Help us measure the effectiveness of our ads and
                  reach interested people. Advertising and marketing cookies relate only to Upspring's website and marketing activities and do not involve data obtained from Google APIs.
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground">4.2 Third-Party Tracking</h3>
              <p>
                Some third-party services that integrate with our site may set their own cookies. We do not have control
                over those cookies except to choose which partners we implement.
              </p>

              <h3 className="text-xl font-semibold text-foreground">4.3 Your Choices Regarding Cookies</h3>
              <p>
                <strong>Browser Controls:</strong> Most web browsers allow you to modify settings to decline cookies or
                clear existing cookies. Disabling cookies may affect the functionality of our Service.
              </p>
              <p>
                <strong>Do Not Track Signals:</strong> Our site currently does not respond to "Do Not Track" (DNT)
                signals from browsers because there is not yet a common standard for interpreting them.
              </p>
              <p>
                <strong>Analytics Opt-Out:</strong> For Google Analytics, you can install the Google Analytics Opt-out
                Browser Add-on.
              </p>
              <p>
                <strong>Advertising Choices:</strong> You can opt-out of some third-party vendors' cookies via the
                Digital Advertising Alliance's opt-out page or the Network Advertising Initiative.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground md:text-3xl">5. Data Retention and Security</h2>

              <h3 className="text-xl font-semibold text-foreground">5.1 Data Retention</h3>
              <p>
                We retain personal information for as long as reasonably necessary to fulfill the purposes for which it
                was collected, as described in this policy, or for as long as required by law or legitimate business
                purposes.
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>Account Data:</strong> We keep your account information while your account is active and for a
                  reasonable period thereafter.
                </li>
                <li>
                  <strong>Content and Campaign Data:</strong> Removed content may remain in backups for a short period
                  until cycled.
                </li>
                <li>
                  <strong>Legal and Compliance:</strong> We may retain information as needed to comply with legal
                  obligations, resolve disputes, and enforce agreements.
                </li>
                <li>
                  <strong>Aggregated/Anonymized Data:</strong> May be retained indefinitely for analytics purposes.
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground">5.2 Data Security</h3>
              <p>We implement a variety of security measures to protect your personal information:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>Encryption:</strong> All data is encrypted in transit using HTTPS/TLS protocols and at rest
                  for sensitive data.
                </li>
                <li>
                  <strong>Access Controls:</strong> Personal data is accessible only to those who need access to perform
                  their job functions with strict confidentiality obligations.
                </li>
                <li>
                  <strong>Network Security:</strong> Infrastructure protected by firewalls, network monitoring,
                  intrusion detection and prevention systems.
                </li>
                <li>
                  <strong>Testing and Assessments:</strong> Periodic security audits, vulnerability assessments, and
                  penetration testing.
                </li>
                <li>
                  <strong>Training:</strong> Team members are trained on data security and privacy best practices.
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground">5.3 Data Breach Procedures</h3>
              <p>
                In the event of a data breach that involves your personal information, Upspring will act promptly to
                identify, contain, and mitigate the incident. We will notify affected users and relevant authorities as
                required by law, outlining the nature of the breach, what data might be involved, steps taken, and
                recommended precautions.
              </p>
            </section>

            {/* Section 6 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground md:text-3xl">6. Your Rights and Choices</h2>
              <p>
                Depending on your jurisdiction and as provided by applicable data protection laws (such as the GDPR for
                EU/EEA residents or the CCPA/CPRA for California residents), you have certain rights regarding your
                personal information.
              </p>

              <h3 className="text-xl font-semibold text-foreground">6.1 General Rights for Users (including GDPR)</h3>
              <p>
                If you are located in the European Economic Area (EEA), United Kingdom, Switzerland or another
                jurisdiction with similar data rights, you have the following rights:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>Right to Access:</strong> Request a copy of the personal data we hold about you.
                </li>
                <li>
                  <strong>Right to Rectification:</strong> Ask us to correct inaccurate or incomplete information.
                </li>
                <li>
                  <strong>Right to Erasure (Right to be Forgotten):</strong> Request deletion of your personal data
                  under certain circumstances.
                </li>
                <li>
                  <strong>Right to Restrict Processing:</strong> Request that we limit processing of your data.
                </li>
                <li>
                  <strong>Right to Data Portability:</strong> Receive your personal data in a structured, commonly used,
                  and machine-readable format.
                </li>
                <li>
                  <strong>Right to Object:</strong> Object to our processing of your personal data in certain cases.
                </li>
                <li>
                  <strong>Right not to be subject to Automated Decision-Making:</strong> Right not to be subject to a
                  decision based solely on automated processing which produces legal or similarly significant effects.
                </li>
              </ul>
              <p>
                To exercise any of these rights, contact us at info@upspring.ai. We will respond within the timeframes
                required by law (typically within 30 days for GDPR).
              </p>

              <h3 className="text-xl font-semibold text-foreground">
                6.2 Additional Rights for California Residents (CCPA/CPRA)
              </h3>
              <p>
                If you are a resident of California, USA, you have specific privacy rights under the California Consumer
                Privacy Act (CCPA) as amended by the California Privacy Rights Act (CPRA):
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>Right to Know:</strong> Request disclosure of categories and specific pieces of personal
                  information collected.
                </li>
                <li>
                  <strong>Right to Delete:</strong> Request deletion of personal information with certain exceptions.
                </li>
                <li>
                  <strong>Right to Correct:</strong> Request correction of inaccurate personal information.
                </li>
                <li>
                  <strong>Right to Opt-Out of Sale or Share:</strong> Opt out of the "sale" or "sharing" of personal
                  information. Note: Upspring does not sell your personal information for money.
                </li>
                <li>
                  <strong>Right to Limit Use of Sensitive Personal Information:</strong> Request to limit use of
                  sensitive personal information beyond what's allowed by law.
                </li>
                <li>
                  <strong>Non-Discrimination:</strong> We will not discriminate against you for exercising any of your
                  CCPA rights.
                </li>
              </ul>
              <p>
                To submit a request under CCPA/CPRA, contact us at info@upspring.ai with the subject line "CCPA
                Request".
              </p>

              <h3 className="text-xl font-semibold text-foreground">6.3 Communication Preferences and Opt-Out</h3>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>Opt-Out of Marketing Emails:</strong> Unsubscribe via the link at the bottom of promotional
                  emails or adjust your email preferences in account settings.
                </li>
                <li>
                  <strong>Opt-Out of Push Notifications:</strong> Turn off in your device settings or browser settings.
                </li>
                <li>
                  <strong>Opt-Out of Interest-Based Advertising:</strong> Use browser and device mechanisms to block
                  cookies, use industry opt-out tools (DAA, NAI websites), or contact us.
                </li>
                <li>
                  <strong>Analytics:</strong> Use the Google opt-out browser add-on or similar mechanisms.
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground">6.4 Accessing and Updating Your Information</h3>
              <p>
                You can review and update certain personal information within Upspring by logging into your account and
                editing your profile or settings. For assistance with information not editable through the platform,
                contact support.
              </p>
            </section>

            {/* Section 7 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground md:text-3xl">7. International Data Transfers</h2>
              <p>
                Upspring is based in Israel (with certain operations possibly in the United States) and we operate a
                global service. This means your personal information may be transferred to, processed, and stored in
                countries other than your own. Servers or databases for Upspring may be located in the United States,
                the European Union, or other jurisdictions.
              </p>
              <p>
                Israel is recognized by the European Commission as providing an adequate level of data protection. When
                we transfer personal data from the EEA/UK to other countries that are not deemed adequate, we rely on
                lawful transfer mechanisms:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>Standard Contractual Clauses (SCCs):</strong> We have in place standard data protection
                  clauses as approved by the EU Commission.
                </li>
                <li>
                  <strong>International Agreements:</strong> Where applicable, we may rely on the UK International Data
                  Transfer Agreement or similar frameworks.
                </li>
                <li>
                  <strong>Other Safeguards:</strong> We may rely on your consent for cross-border transfers in certain
                  cases.
                </li>
              </ul>
              <p>
                If you have questions about our international data handling or want more information about transfer
                safeguards, contact us at info@upspring.ai.
              </p>
            </section>

            {/* Section 8 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground md:text-3xl">
                8. Third-Party Websites and Services
              </h2>
              <p>
                Our Service may contain links to other websites, or you may engage with third-party services in
                connection with Upspring (such as logging in via a third-party, or using plugins). This Privacy Policy
                does not apply to information processed by third-party websites or services. We are not responsible for
                the privacy practices of those third parties.
              </p>
              <p>For example:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  If you click a link to a blog or article on our site that leads to another company's site, any data
                  you provide to that site is governed by their policies.
                </li>
                <li>
                  If you use a third-party integration through Upspring, the information is handled by that third party
                  under their policies once it leaves Upspring.
                </li>
                <li>
                  Our site might include social media features. Interacting with those features might allow the
                  third-party social media platform to collect information.
                </li>
              </ul>
              <p>
                We encourage you to review the privacy policies of any third-party services or sites that you interact
                with.
              </p>
            </section>

            {/* Section 9 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground md:text-3xl">9. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices, technologies,
                legal requirements, or other factors. When we do update it, we will:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Post the revised policy on our website with a new "Last Updated" date.</li>
                <li>
                  If the changes are significant, we will also provide a more prominent notice, such as an email
                  notification or a banner on the site/app.
                </li>
              </ul>
              <p>
                We encourage you to review this Privacy Policy periodically. If you continue to use Upspring after any
                Privacy Policy changes take effect, you will be deemed to have accepted the updated policy.
              </p>
              <p>
                If you do not agree with the changes, you should deactivate your account or reach out to us with any
                concerns before the changes take effect.
              </p>
            </section>

            {/* Section 10 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground md:text-3xl">10. Use of Google User Data</h2>
              <p>
                Upspring's use of information received from Google APIs will adhere to the{" "}
                <a 
                  href="https://developers.google.com/terms/api-services-user-data-policy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-foreground underline hover:text-foreground/70"
                >
                  Google API Services User Data Policy
                </a>, including the Limited Use requirements.
              </p>
              <p>Specifically:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  Upspring only accesses and uses Google Ads data to provide and improve user-facing functionality within the platform, such as analytics, reporting, and insights.
                </li>
                <li>
                  Upspring does not use Google user data for advertising, marketing, or targeting purposes.
                </li>
                <li>
                  Upspring does not sell or share Google user data with third parties.
                </li>
                <li>
                  Upspring does not use Google user data to create user profiles unrelated to the core functionality of the Service.
                </li>
                <li>
                  Upspring does not use Google user data to train generalized artificial intelligence (AI) or machine learning models.
                </li>
                <li>
                  Google Ads data is processed securely within Upspring's infrastructure and is not transmitted to third-party analytics, tracking, or advertising platforms.
                </li>
                <li>
                  Any use of Google user data is strictly limited to what is necessary to operate and improve the functionality of the Upspring Service for the user.
                </li>
              </ul>
            </section>

            {/* Section 11 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground md:text-3xl">
                11. AI Assistant Integrations and Developer API
              </h2>
              <p>
                Upspring can be connected to third-party AI assistants — including Anthropic's Claude, via our official
                connector — and offers a developer API for programmatic access. This section explains what data those
                surfaces involve.
              </p>

              <h3 className="text-xl font-semibold text-foreground">
                11.1 The Upspring Connector for Claude (and similar AI assistants)
              </h3>
              <p>When you connect your Upspring account to an AI assistant such as Claude:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>Authentication:</strong> You authenticate with your Upspring credentials through an OAuth
                  authorization flow and approve access on a consent screen. We issue access tokens scoped to your
                  account; we never share your Upspring password with the assistant provider. Disconnecting the
                  integration (in the assistant's settings or by contacting us) revokes these tokens.
                </li>
                <li>
                  <strong>What we receive:</strong> We receive only the tool requests the assistant makes on your behalf
                  — the name of the requested capability and its structured parameters (for example, a search filter or
                  an advertiser identifier). We do not receive, store, or have any access to your conversations with the
                  assistant.
                </li>
                <li>
                  <strong>What we return:</strong> In response to those requests, we return data your account is already
                  entitled to in the Upspring platform — our advertising-intelligence corpus, and, where your workspace
                  has connected ad accounts, your own advertising data (as described in Section 1.2). The same access
                  controls that govern the Upspring app govern the connector.
                </li>
                <li>
                  <strong>What we log:</strong> For security, reliability, and abuse prevention, we log usage metadata
                  about connector requests (which capability was called, parameters, timing, and success/failure),
                  associated with your account.
                </li>
                <li>
                  <strong>The assistant provider:</strong> Your conversations with the assistant, and the assistant
                  provider's handling of any data you or the assistant submit to it, are governed by that provider's own
                  privacy policy (for Claude, Anthropic's privacy policy) — not this one. As described in Section 8,
                  this Privacy Policy does not apply to third-party services.
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground">11.2 Developer API</h3>
              <p>Where we issue API keys for programmatic access to Upspring data:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  API keys are stored only in cryptographically hashed form; the plaintext key is shown once at issuance
                  and cannot be retrieved by us afterward.
                </li>
                <li>
                  We log API usage metadata per key (endpoint, request parameters, response status, timing) for
                  security, reliability, rate limiting, support, and service planning.
                </li>
                <li>
                  API responses contain data from our advertising-intelligence corpus and do not include other
                  customers' personal or account data.
                </li>
              </ul>
            </section>

            {/* Section 12 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground md:text-3xl">12. Contact Us</h2>
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices,
                you can contact us using the information below:
              </p>
              <p className="space-y-1">
                <strong>Spring AI Tech Ltd. (Upspring)</strong>
                <br />
                Email:{" "}
                <a href="mailto:info@upspring.ai" className="text-foreground underline hover:text-foreground/70">
                  info@upspring.ai
                </a>
                <br />
                Mailing Address: Hatashah 2 Street, Floor 4, Tel Aviv, Israel.
                <br />
                Data Protection Officer (DPO): If required by applicable law, you may also reach our designated Data
                Protection Officer at info@upspring.ai.
              </p>
            </section>
          </div>
        </article>

        <Footer id="contact" />
      </div>
    </main>
  )
}
