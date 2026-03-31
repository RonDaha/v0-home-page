"use client"

import { Shader, Swirl } from "shaders/react"
import { GrainOverlay } from "@/components/grain-overlay"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { useRef, useEffect, useState } from "react"

export default function TermsOfUsePage() {
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
            Terms of Use
          </h1>
          <p className="mb-12 font-mono text-sm text-foreground/60">Last Updated: June 4, 2025</p>

          <div className="prose prose-invert max-w-none space-y-8 text-foreground/80">
            <p>
              Welcome to Upspring, an AI-powered marketing automation and analytics platform owned and operated by
              Spring AI Tech Ltd. ("Upspring", "Company", "we", or "us"). These Terms of Service ("Terms") govern your
              access to and use of Upspring's website, application, and services (collectively, the "Service"). By
              accessing or using our Service, you agree to be bound by these Terms. If you do not agree to these Terms,
              you must not use the Service.
            </p>

            {/* In Short Section */}
            <section>
              <h2 className="mb-4 font-sans text-2xl font-semibold text-foreground">In Short</h2>
              <h3 className="mb-3 font-sans text-xl font-medium text-foreground">Key Takeaways</h3>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>Eligibility:</strong> You must be at least 18 years old (and a legally capable adult) or a
                  valid business entity to use Upspring. You may need active accounts on supported third-party platforms
                  (e.g. Meta, Shopify) to fully utilize our features.
                </li>
                <li>
                  <strong>Account & Security:</strong> You are responsible for maintaining the confidentiality of your
                  account credentials and all activities under your account.
                </li>
                <li>
                  <strong>Fees & Subscriptions:</strong> Upspring operates on subscription plans with applicable fees.
                  Charges are billed according to your plan (e.g. monthly or annually) and renew automatically unless
                  cancelled. Our refund policy applies to any cancellations or disputes.
                </li>
                <li>
                  <strong>Privacy:</strong> We respect your privacy. Our use of personal data is outlined in our Privacy
                  Policy, and by using Upspring you consent to those practices. If you integrate Upspring with your
                  e-commerce or ad platforms, you must ensure you have rights to share that data with us.
                </li>
                <li>
                  <strong>Intellectual Property:</strong> We own all rights to the Upspring platform and technology. You
                  retain ownership of your content and data, but you give us a license to use it as needed to provide
                  the Service.
                </li>
                <li>
                  <strong>Acceptable Use:</strong> You agree to use Upspring only for lawful purposes. Misuse, reverse
                  engineering, or using Upspring to infringe on others' rights is prohibited. We may suspend or
                  terminate accounts that violate these Terms.
                </li>
                <li>
                  <strong>Service Provided "As-Is":</strong> Upspring is provided on an "as is" basis. We strive for
                  reliability but do not guarantee uninterrupted or error-free service or specific results.
                </li>
                <li>
                  <strong>Liability Limit:</strong> To the maximum extent allowed by law, our liability to you is
                  limited (we cap damages and disclaim warranties).
                </li>
                <li>
                  <strong>Termination:</strong> You can cancel at any time. We can suspend or terminate your access if
                  these Terms are breached or if necessary to protect our platform or other users.
                </li>
                <li>
                  <strong>Governing Law:</strong> These Terms are governed by the laws of Israel. Any disputes will be
                  resolved in the courts of Tel Aviv, and class action lawsuits are waived.
                </li>
              </ul>
              <p className="mt-4">
                Please read the full Terms below for more detailed information on each of these points.
              </p>
            </section>

            {/* 1. Definitions */}
            <section>
              <h2 className="mb-4 font-sans text-2xl font-semibold text-foreground">1. Definitions</h2>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>"Service"</strong> – The Upspring platform, including all web applications, software,
                  dashboards, analytics reports, integrations, and related services provided by Company.
                </li>
                <li>
                  <strong>"User" or "Customer"</strong> – An individual or entity that has registered for or uses the
                  Service. "You" may refer to an individual using Upspring on their own behalf or as an authorized
                  representative of a company or organization.
                </li>
                <li>
                  <strong>"Account"</strong> – The user account created to access the Service.
                </li>
                <li>
                  <strong>"Content"</strong> – Any text, images, files, data, or other materials that you upload,
                  submit, or store within the Service (for example, your creative assets, campaign materials, or
                  business data).
                </li>
                <li>
                  <strong>"Subscription"</strong> – The plan or license under which you access the Service, which may be
                  free (trial) or paid, and which is subject to applicable fees and limitations.
                </li>
                <li>
                  <strong>"Third-Party Services"</strong> – External platforms or services that Upspring integrates with
                  or that you choose to connect to Upspring (such as e-commerce platforms, social media networks,
                  advertising networks, or payment processors).
                </li>
              </ul>
            </section>

            {/* 2. Acceptance of Terms and Eligibility */}
            <section>
              <h2 className="mb-4 font-sans text-2xl font-semibold text-foreground">
                2. Acceptance of Terms and Eligibility
              </h2>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">2.1. Authority and Minimum Age:</h3>
              <p className="mb-4">
                By creating an Account or using the Service, you represent that you are at least 18 years of age (or the
                age of majority in your jurisdiction) and capable of entering into a legally binding contract. If you
                are using the Service on behalf of a company or organization, you represent that you have authority to
                bind that entity to these Terms, and in that case "you" refers to the entity.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">2.2. Compliance with Laws:</h3>
              <p className="mb-4">
                You may use the Service only in compliance with these Terms and all applicable laws and regulations. You
                are responsible for ensuring that your use of the Service (including any analyses, communications, or
                campaigns you run through Upspring) complies with laws such as marketing, privacy, and data protection
                regulations relevant to your jurisdiction and your industry.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">2.3. Account Registration:</h3>
              <p className="mb-4">
                To access certain features, you must create an Upspring account. You agree to provide accurate, current,
                and complete information during registration and to keep your account information updated. We reserve
                the right to suspend or terminate accounts with inaccurate or incomplete information or that are
                suspected of unauthorized use.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">2.4. Account Security:</h3>
              <p className="mb-4">
                You are responsible for maintaining the security of your Account login credentials. Do not share your
                username or password with others, and notify us immediately at info@upspring.ai if you suspect any
                unauthorized access to or use of your Account. Upspring is not liable for any loss or damage arising
                from your failure to safeguard your credentials.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">2.5. Restrictions:</h3>
              <p>
                The Service is intended for business and professional use (particularly by direct-to-consumer brands and
                their teams). You must not use the Service if you are barred from doing so under the laws of any
                applicable jurisdiction or have previously been banned from the Service by us. Competitors and
                individuals developing similar or competing services are prohibited from accessing the Service without
                our prior written consent.
              </p>
            </section>

            {/* 3. Services and License */}
            <section>
              <h2 className="mb-4 font-sans text-2xl font-semibold text-foreground">3. Services and License</h2>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">3.1. Provision of Service:</h3>
              <p className="mb-4">
                Subject to your compliance with these Terms and payment of applicable fees, Upspring grants you a
                limited, non-exclusive, non-transferable, revocable license to access and use the Service during the
                term of your Subscription. This license is for the sole purpose of enabling you to use and enjoy the
                benefit of the Service for your internal business purposes, in the manner permitted by these Terms.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">3.2. Features and Updates:</h3>
              <p className="mb-4">
                Upspring's platform includes features such as creative performance analytics, reports, competitor ad
                insights, inspiration libraries, asset management, AI-driven recommendations, and other tools as
                described on our website. We continually improve and evolve our Service; as such, specific features or
                functionality may be added, changed, or removed from time to time. We will endeavor to notify you of any
                major changes. All new features are subject to these Terms.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">3.3. Integrations:</h3>
              <p className="mb-4">
                Upspring may offer integrations or the ability to connect the Service with Third-Party Services (for
                example, connecting your Upspring account with your Shopify store, Facebook/Meta advertising account,
                Google Ads, or other marketing platforms). If you choose to integrate or connect a Third-Party Service:
              </p>
              <ul className="list-disc space-y-2 pl-6 mb-4">
                <li>
                  You grant us permission to access and interact with the integrated service and any data from that
                  service as necessary to provide our Service to you.
                </li>
                <li>
                  You are responsible for complying with the terms and policies of any Third-Party Service you connect
                  to Upspring and ensuring that the connection and data transfer is permitted by those terms.
                </li>
                <li>
                  Upspring does not guarantee the continued availability of any integration and may disable integrations
                  temporarily or permanently if required by the third party or due to technical or legal constraints.
                </li>
                <li>
                  We are not responsible for Third-Party Services or their actions/data. Your use of Third-Party
                  Services is at your own risk, and Upspring is not liable for any issues arising from data provided by
                  or sent to such services.
                </li>
              </ul>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">3.4. Free Trial:</h3>
              <p>
                We may offer a free or trial version of the Service for a limited period or with limited features. Any
                such trial is solely for you to evaluate the Service. We reserve the right to modify or terminate a free
                trial at any time. If you do not upgrade to a paid Subscription before the trial ends, your access may
                be terminated or downgraded automatically. Data you input during a free trial may be deleted or become
                inaccessible if you do not convert to a paid plan. We are not responsible for any loss of data from a
                lapsed trial period. During any free trial, the Service is provided "as is" without warranties or
                guarantees, to the extent permitted by law.
              </p>
            </section>

            {/* 4. Fees, Payments, and Refunds */}
            <section>
              <h2 className="mb-4 font-sans text-2xl font-semibold text-foreground">4. Fees, Payments, and Refunds</h2>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">4.1. Subscription Plans:</h3>
              <p className="mb-4">
                Upspring is offered on a subscription basis. You must select a plan and agree to pay the subscription
                fees associated with that plan. Pricing and available plans are posted on our website or order form. We
                may update our fees and plans from time to time, but any changes to pricing will not apply to your
                current Subscription term until it renews.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">4.2. Billing and Payment:</h3>
              <p className="mb-4">
                By subscribing, you authorize us (or our designated third-party payment processor) to charge your
                provided payment method for all applicable fees, including recurring subscription fees, taxes, and any
                additional charges. Subscription fees are typically billed in advance on a recurring cycle (monthly or
                annually) and are non-refundable except as required by law or explicitly stated in our refund policy.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">4.3. Auto-Renewal:</h3>
              <p className="mb-4">
                Subscriptions automatically renew at the end of each billing cycle unless you cancel beforehand. You
                will be charged the then-current subscription fee for the renewal term. You can disable auto-renewal or
                cancel your Subscription at any time through your account settings or by contacting us.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">4.4. Changes to Subscription:</h3>
              <p className="mb-4">
                You may upgrade or downgrade your plan, and the fee changes will apply either immediately or in the next
                billing cycle according to our policies. Some changes might result in pro-rated charges or credits.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">4.5. Late Payments:</h3>
              <p className="mb-4">
                It is your responsibility to ensure timely payment. If we cannot charge your payment method or your
                account becomes past due, we reserve the right to suspend or terminate your access to the Service.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">4.6. Refunds:</h3>
              <p className="mb-4">
                All fees are generally non-refundable. We may make exceptions or offer refunds or credits in our sole
                discretion. Any disputes about charges must be raised within 30 days of the charge by contacting our
                support.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">4.7. Taxes:</h3>
              <p>
                Subscription fees are exclusive of any taxes, levies, or duties applicable to your purchase. You are
                responsible for any such taxes that are required by your jurisdiction.
              </p>
            </section>

            {/* 5. User Content and Data */}
            <section>
              <h2 className="mb-4 font-sans text-2xl font-semibold text-foreground">5. User Content and Data</h2>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">5.1. Your Content:</h3>
              <p className="mb-4">
                In using Upspring, you may upload, import, or generate Content. You retain all rights and ownership of
                your Content. Upspring does not claim ownership of your Content.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">5.2. License to Upspring:</h3>
              <p className="mb-4">
                You grant Upspring a worldwide, non-exclusive, royalty-free license to host, store, transfer, display,
                analyze, and otherwise use your Content solely for the purpose of operating and improving the Service
                and as otherwise instructed by you.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">
                5.3. Representations and Warranties for User Content:
              </h3>
              <p className="mb-4">
                You are solely responsible for all Content you provide or that is provided via your Account. You
                represent and warrant that you have all necessary rights, licenses, and permissions to upload or share
                the Content and to grant Upspring the license described above.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">5.4. Prohibited Content:</h3>
              <p className="mb-4">
                You agree not to use the Service to store, transmit, or distribute any Content that is unlawful,
                harmful, defamatory, obscene, contains unauthorized advertising or spam, violates any person's rights,
                or contains sensitive personal data without proper authorization.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">5.5. Data Privacy:</h3>
              <p>
                You understand that personal information you provide to Upspring will be handled in accordance with our
                Privacy Policy. If you collect or input personal data of third parties into Upspring, you are the data
                controller for such data and Upspring is a data processor/service provider.
              </p>
            </section>

            {/* 6. Acceptable Use and Conduct */}
            <section>
              <h2 className="mb-4 font-sans text-2xl font-semibold text-foreground">6. Acceptable Use and Conduct</h2>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">6.1. Lawful Use:</h3>
              <p className="mb-4">
                You agree to use Upspring only for lawful purposes. You will not use the Service to violate any law,
                regulation, or ordinance.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">6.2. Prohibited Actions:</h3>
              <p className="mb-4">You will not, and will not permit any third party to:</p>
              <ul className="list-disc space-y-2 pl-6 mb-4">
                <li>Interfere with the Service or disrupt, overburden, damage, or impair its functioning</li>
                <li>Reverse engineer, disassemble, decompile, or copy any portion of the Service</li>
                <li>Attempt to gain unauthorized access to the Service or its related systems</li>
                <li>Use bots, scrapers, or automated methods to access or extract data without permission</li>
                <li>Use the Service to transmit unlawful, harmful, or harassing content</li>
                <li>Impersonate any person or entity</li>
              </ul>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">6.3. Usage Limits:</h3>
              <p className="mb-4">
                If your Subscription plan imposes usage limits, you agree to abide by those limits. We may monitor your
                usage and require an upgrade or apply additional fees if you exceed your plan's limits.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">6.4. Feedback:</h3>
              <p className="mb-4">
                If you choose to provide Feedback, you agree that we are free to use it without any restriction or
                compensation to you.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">6.5. Enforcement:</h3>
              <p>
                We reserve the right to investigate any violation of this Section and may suspend or terminate your
                Account or take other appropriate action if we believe you have violated these Terms.
              </p>
            </section>

            {/* 7. Intellectual Property Rights */}
            <section>
              <h2 className="mb-4 font-sans text-2xl font-semibold text-foreground">7. Intellectual Property Rights</h2>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">
                7.1. Upspring's Intellectual Property:
              </h3>
              <p className="mb-4">
                All rights, title, and interest in and to the Service, including all software, code, technology,
                algorithms, models, designs, user interfaces, know-how, databases, compilations of data, and content
                provided by us are and will remain the property of Spring AI Tech Ltd. and its licensors.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">7.2. Restrictions:</h3>
              <p className="mb-4">
                You shall not remove, alter, or obscure any copyright, trademark, service mark or other proprietary
                rights notices incorporated in or accompanying the Service.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">7.3. Your Intellectual Property:</h3>
              <p className="mb-4">
                You retain ownership of your Content and any intellectual property rights you hold in your own brands,
                data, and materials you provide.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">
                7.4. Generated Insights and Analytics:
              </h3>
              <p className="mb-4">
                Upspring may provide you with analytics, reports, or AI-generated suggestions based on your data. You
                may use these outputs freely for your internal business purposes.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">
                7.5. Third-Party Intellectual Property:
              </h3>
              <p className="mb-4">
                If Upspring's features allow you to access or use third-party content, you acknowledge that such content
                may be protected by others' intellectual property rights and agree not to use it in a manner that
                infringes those rights.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">7.6. DMCA/Copyright Complaints:</h3>
              <p>
                If you believe that any content available on the Service infringes your copyright or other intellectual
                property rights, please notify us at info@upspring.ai with the subject "Copyright Complaint".
              </p>
            </section>

            {/* 8. Confidentiality */}
            <section>
              <h2 className="mb-4 font-sans text-2xl font-semibold text-foreground">8. Confidentiality</h2>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">
                8.1. Definition of Confidential Information:
              </h3>
              <p className="mb-4">
                "Confidential Information" means any non-public or proprietary information disclosed by one party to the
                other in connection with the use of the Service, which is designated as confidential or which should
                reasonably be understood to be confidential.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">8.2. Exclusions:</h3>
              <p className="mb-4">
                Confidential Information does not include information that is publicly available, was known prior to
                disclosure, is received from a third party, or is independently developed.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">8.3. Mutual Obligations:</h3>
              <p className="mb-4">
                Both you and Upspring agree to use the other's Confidential Information only for the purposes of
                fulfilling our respective obligations under these Terms and to protect it with reasonable care.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">8.4. Compelled Disclosure:</h3>
              <p className="mb-4">
                If required by law to disclose Confidential Information, the receiving party must give prompt written
                notice to the disclosing party when legally permitted.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">8.5. Return or Destruction:</h3>
              <p>
                Upon termination of your account or upon request, each party will return or destroy the other's
                Confidential Information, except to the extent retention is required by law.
              </p>
            </section>

            {/* 9. Service Performance and Support */}
            <section>
              <h2 className="mb-4 font-sans text-2xl font-semibold text-foreground">
                9. Service Performance and Support
              </h2>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">9.1. Availability:</h3>
              <p className="mb-4">
                Upspring aims to provide a reliable and highly available Service, but we do not guarantee 100% uptime.
                There may be occasional downtime for maintenance, updates, or unforeseen technical issues.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">9.2. Support:</h3>
              <p className="mb-4">
                We offer customer support through our website and via email at info@upspring.ai. Support is generally
                available during our business hours.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">
                9.3. Updates and Functional Changes:
              </h3>
              <p className="mb-4">
                We may periodically update the Service. By using Upspring, you consent to receiving such updates.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">9.4. Data Backups:</h3>
              <p className="mb-4">
                We perform regular backups of user data for disaster recovery purposes. However, you are responsible for
                keeping copies or backups of your own content and data.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">9.5. Beta Features:</h3>
              <p>
                If we offer any beta or trial features, those features are provided as-is and as-available, for
                evaluation only, and without any warranties or support obligations.
              </p>
            </section>

            {/* 10. Termination and Suspension */}
            <section>
              <h2 className="mb-4 font-sans text-2xl font-semibold text-foreground">10. Termination and Suspension</h2>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">10.1. Your Right to Terminate:</h3>
              <p className="mb-4">
                You may stop using the Service at any time. You may also cancel your Subscription at any time through
                your Account settings or by contacting us.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">
                10.2. Our Right to Suspend or Terminate:
              </h3>
              <p className="mb-4">
                We reserve the right to suspend or terminate your access to the Service if you materially breach these
                Terms, for non-payment, or if we are legally required to do so.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">10.3. Effect of Termination:</h3>
              <p className="mb-4">
                Upon termination, your right to access or use the Service will immediately cease. We recommend that you
                export or download any data you need before cancellation.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">
                10.4. No Liability for Termination:
              </h3>
              <p>
                Upspring shall not be liable to you or any third party for termination of your account or access in
                accordance with these Terms.
              </p>
            </section>

            {/* 11. Data Protection and Security */}
            <section>
              <h2 className="mb-4 font-sans text-2xl font-semibold text-foreground">
                11. Data Protection and Security
              </h2>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">11.1. Privacy Policy:</h3>
              <p className="mb-4">
                Your use of the Service is subject to our Privacy Policy, which is hereby incorporated into these Terms.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">11.2. Data Processing:</h3>
              <p className="mb-4">
                If you are in a jurisdiction that requires a data processing agreement, we are willing to provide and
                abide by a Data Processing Addendum (DPA).
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">11.3. Security Measures:</h3>
              <p className="mb-4">
                We implement technical and organizational measures intended to secure your data from accidental loss and
                unauthorized access or disclosure. These measures include encryption of data in transit, access
                controls, and regular security assessments.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">11.4. Incident Response:</h3>
              <p>
                In the event of a security breach that affects your data, we will notify you as required by applicable
                law and cooperate with you to address the breach.
              </p>
            </section>

            {/* 12. Disclaimers of Warranties */}
            <section>
              <h2 className="mb-4 font-sans text-2xl font-semibold text-foreground">12. Disclaimers of Warranties</h2>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">12.1. "As Is" Basis:</h3>
              <p className="mb-4">
                Upspring is provided "AS IS" and "AS AVAILABLE". To the fullest extent permitted by law, the Company and
                its affiliates, suppliers, and partners disclaim all warranties, express or implied, in connection with
                the Service.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">12.2. No Guarantee of Results:</h3>
              <p className="mb-4">
                We specifically do not guarantee that using Upspring will result in any particular outcome for your
                business.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">12.3. Implied Warranties:</h3>
              <p className="mb-4">
                We disclaim any implied warranties of merchantability, fitness for a particular purpose, and
                non-infringement.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">12.4. Accuracy of Data:</h3>
              <p className="mb-4">
                While Upspring strives to provide accurate and useful data and analyses, we do not warrant the accuracy,
                completeness, or reliability of any data, reports, or insights obtained through the Service.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">
                12.5. Third-Party Services and Content:
              </h3>
              <p className="mb-4">
                We make no warranty regarding any third-party services, content, or data that you access through
                Upspring.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">12.6. Beta Features:</h3>
              <p className="mb-4">
                Any beta or experimental features are provided without any warranties whatsoever and solely at your
                risk.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">12.7. Legal Compliance:</h3>
              <p className="mb-4">
                We do not guarantee that your use of the Service will comply with any laws or regulations. You are
                responsible for understanding and complying with your legal obligations.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">12.8. Exceptions:</h3>
              <p>
                If any law does not allow the exclusion of certain warranties, then those warranties are limited in
                duration to the minimum period permitted.
              </p>
            </section>

            {/* 13. Limitation of Liability */}
            <section>
              <h2 className="mb-4 font-sans text-2xl font-semibold text-foreground">13. Limitation of Liability</h2>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">13.1. Indirect Damages:</h3>
              <p className="mb-4">
                To the maximum extent permitted by law, Upspring will not be liable for any indirect, incidental,
                special, consequential, exemplary, or punitive damages, including damages for lost profits or revenues,
                loss of data, loss of business opportunity, service interruption, or computer damage.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">13.2. Cap on Liability:</h3>
              <p className="mb-4">
                Upspring's total cumulative liability to you for any claims arising out of or related to these Terms or
                the Service will not exceed the amount actually paid by you to Upspring in the six (6) months
                immediately preceding the event giving rise to such liability.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">13.3. Basis of Bargain:</h3>
              <p className="mb-4">
                You acknowledge and agree that Upspring has offered the Service and set its prices in reliance on the
                disclaimers of warranty and the limitations of liability set forth herein, and that these form an
                essential basis of the bargain between you and us.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">13.4. Exceptions:</h3>
              <p className="mb-4">
                Some jurisdictions do not allow the exclusion or limitation of certain damages. In such cases,
                Upspring's liability will be limited to the fullest extent permitted by applicable law.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">13.5. Release:</h3>
              <p>
                To the extent permitted by law, you release Upspring and its affiliates from all liability for you
                having acquired or not acquired content or information through the Service.
              </p>
            </section>

            {/* 14. Indemnification */}
            <section>
              <h2 className="mb-4 font-sans text-2xl font-semibold text-foreground">14. Indemnification</h2>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">14.1. Your Indemnity:</h3>
              <p className="mb-4">
                You agree to indemnify, defend, and hold harmless Upspring and its officers, directors, employees, and
                agents from and against any and all third-party claims, liabilities, damages, losses, and expenses that
                arise out of or are connected to your use of the Service, your Content, your breach of these Terms, or
                any fraud, gross negligence, or willful misconduct by you.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">14.2. Indemnification Procedure:</h3>
              <p className="mb-4">
                If we seek indemnification from you, we will promptly notify you in writing of any claim or suit. We
                will give you control of the defense and settlement of the claim, provided that you do not settle in a
                manner that admits fault or liability of Upspring without our prior written consent.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">14.3. Company's Indemnity:</h3>
              <p>
                At this time, Upspring does not provide a general indemnification to users, except as may be required by
                law. The Service is provided "as is," and our liability is limited as stated in Section 13.
              </p>
            </section>

            {/* 15. Governing Law and Dispute Resolution */}
            <section>
              <h2 className="mb-4 font-sans text-2xl font-semibold text-foreground">
                15. Governing Law and Dispute Resolution
              </h2>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">15.1. Governing Law:</h3>
              <p className="mb-4">
                These Terms and any dispute arising out of or related to them or the Service will be governed by the
                laws of the State of Israel, without regard to its conflict of laws principles.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">15.2. Jurisdiction and Venue:</h3>
              <p className="mb-4">
                You and Upspring agree that any judicial proceeding to resolve claims relating to these Terms or the
                Service will be brought in the competent courts of Tel Aviv, Israel.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">
                15.3. Dispute Resolution and Arbitration:
              </h3>
              <p className="mb-4">
                We encourage you to contact our support team first if any issue arises. For business users, any dispute
                that cannot be resolved informally shall be finally settled by arbitration in Tel Aviv, Israel.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">15.4. Class Action Waiver:</h3>
              <p className="mb-4">
                You and Upspring each agree that any proceedings to resolve or litigate any dispute will be conducted
                solely on an individual basis. Class arbitrations, class actions, and consolidation with other
                arbitrations are not allowed.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">15.5. Injunctive Relief:</h3>
              <p className="mb-4">
                Either party may seek interim or injunctive relief in any court of competent jurisdiction to protect its
                intellectual property or confidential information.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">15.6. Time Limitations:</h3>
              <p>
                To the extent permitted by law, any claim or cause of action arising out of or related to use of the
                Service or these Terms must be filed within one (1) year after such claim arose, or be forever barred.
              </p>
            </section>

            {/* 16. Changes to the Terms */}
            <section>
              <h2 className="mb-4 font-sans text-2xl font-semibold text-foreground">16. Changes to the Terms</h2>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">16.1. Updates to Terms:</h3>
              <p className="mb-4">
                Upspring may modify or update these Terms from time to time. If we make material changes, we will
                provide notice to you by email or by prominently posting a notice on our website.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">16.2. Acceptance of Changes:</h3>
              <p className="mb-4">
                Any modifications to the Terms will become effective on the date indicated in the notice, but no sooner
                than 14 days after notice. If you do not agree to the revised Terms, you should stop using the Service
                before they take effect.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">16.3. Entire Agreement:</h3>
              <p>
                These Terms (including any order forms, the Privacy Policy, and other policies referenced herein)
                constitute the entire agreement between you and Upspring regarding the Service and supersede all prior
                agreements, proposals or representations.
              </p>
            </section>

            {/* 17. Miscellaneous */}
            <section>
              <h2 className="mb-4 font-sans text-2xl font-semibold text-foreground">17. Miscellaneous</h2>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">17.1. Assignment:</h3>
              <p className="mb-4">
                You may not assign or transfer these Terms or any rights or obligations under them without our prior
                written consent. Upspring may freely assign or transfer these Terms to an affiliate or in connection
                with a merger, acquisition, or sale of assets.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">17.2. Relationship of Parties:</h3>
              <p className="mb-4">
                You and Upspring are independent contractors, and these Terms do not create any partnership, joint
                venture, employment, franchise, or agency relationship between us.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">17.3. No Waiver:</h3>
              <p className="mb-4">
                Our failure to enforce any provision of these Terms will not be deemed a waiver of our right to enforce
                such provision thereafter.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">17.4. Severability:</h3>
              <p className="mb-4">
                If any provision of these Terms is held to be invalid, illegal, or unenforceable, that provision will be
                enforced to the maximum extent permissible and the remaining provisions will remain in full force and
                effect.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">17.5. Notices:</h3>
              <p className="mb-4">
                Upspring may send you notices by email, regular mail, or postings within the Service. Notices to
                Upspring should be sent to info@upspring.ai.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">17.6. Force Majeure:</h3>
              <p className="mb-4">
                Neither party will be liable for any delay or failure to perform due to unforeseen events beyond
                reasonable control, such as natural disasters, war, or failure of telecommunications services.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">17.7. Language:</h3>
              <p className="mb-4">
                These Terms are written in English. If we provide a translation, the English text shall govern.
              </p>

              <h3 className="mb-2 font-sans text-lg font-medium text-foreground">17.8. Contact Information:</h3>
              <p className="mb-4">
                If you have any questions, concerns, or comments about these Terms or the Service, you can contact us
                at:
              </p>
              <p className="mb-2">
                <strong>Spring AI Tech Ltd. (Upspring)</strong>
              </p>
              <p className="mb-2">Email: info@upspring.ai</p>
              <p>Mailing Address: Hatashah 2., Floor 4, Tel Aviv, Israel</p>
            </section>

            <p className="mt-8 border-t border-foreground/20 pt-8">
              By using the Upspring Service, you acknowledge that you have read, understood, and agree to these Terms of
              Use. Thank you for choosing Upspring to help grow your business with AI-powered marketing insights!
            </p>
          </div>
        </article>

        <Footer id="contact" />
      </div>
    </main>
  )
}
