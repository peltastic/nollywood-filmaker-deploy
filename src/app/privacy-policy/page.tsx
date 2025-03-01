import ServiceLayout from "@/components/Layouts/ServiceLayout";
import React from "react";

type Props = {};

const PrivacyPolicy = (props: Props) => {
  return (
    <ServiceLayout>
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Dudutech Privacy Policy
          </h1>
        </header>

        <main>
          {/* Section 1 */}
          <section className="mb-10">
            <p className="text-gray-700 mb-4">
              This privacy policy applies between you, the user of this
              platform, and Dudutech Limited, the owner and provider of this
              webapp. Dudutech Limited takes your privacy seriously. This policy
              governs our use of any data collected by us or provided by you in
              relation to your use of the webapp. Please read this Privacy
              Policy alongside our Terms and Conditions and carefully before
              using the Platform.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
              Definitions and Interpretation
            </h2>
            <p className="text-gray-700 mb-2">
              In this privacy policy, the following definitions apply:
            </p>
            <ul className="list-disc pl-5 text-gray-700">
              <li>
                <strong>Data:</strong> All information that you submit to
                Dudutech Limited via the Nollywood Filmmaker Webapp. This
                includes, where applicable, definitions provided in the Data
                Protection Laws.
              </li>
              <li>
                <strong>Data Protection Laws:</strong> Any applicable law
                related to the processing of personal data, including but not
                limited to the GDPR, and any national implementing laws,
                regulations, and secondary legislation, the Nigerian Data
                Protection Act.
              </li>
              <li>
                <strong>GDPR:</strong> The General Data Protection Regulation
                (EU) 2016/679.
              </li>
              <li>
                <strong>NDPA:</strong> The Nigerian Data Protection Act.
              </li>
              <li>
                <strong>Dudutech Limited, we or us:</strong> Dudutech Limited, a
                company incorporated in Nigeria with registered number RC
                1938806 and registered office at 2 Bolaji Street, off Kudirat
                Abiola Street, Oregun Lagos Nigeria.
              </li>
              <li>
                <strong>User or you:</strong> Any third party accessing the
                webapp who is not employed by Dudutech Limited and acting in the
                course of their employment, or engaged as a consultant or
                providing services to Dudutech Limited.
              </li>
              <li>
                <strong>The Webapp:</strong> The webapp you are currently using,
                Nollywood Filmmaker and any sub-domains of this webapp unless
                expressly excluded by their own terms and conditions.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
              Scope of this Privacy Policy
            </h2>
            <p className="text-gray-700">
              This privacy policy applies only to the actions of Dudutech
              Limited and users concerning this webapp. It does not extend to
              any webapp that can be accessed from this webapp, including, but
              not limited to, any links we may provide to social media websites.
              For purposes of the applicable Data Protection Laws, Dudutech
              Limited is the "data controller," meaning it determines the
              purposes for which and the manner in which your data is processed.
            </p>
          </section>

          {/* Section 2 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Data Collected
            </h2>
            <p className="text-gray-700 mb-2">
              We may collect the following data, including personal data, from
              you:
            </p>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Name</li>
              <li>Gender</li>
              <li>Job title</li>
              <li>Profession</li>
              <li>
                Contact information such as email addresses and telephone
                numbers
              </li>
              <li>
                Valid Identification which could include but not limited to
                international passports, driver's license, BVN, NIN etc.
              </li>
              <li>
                Demographic information such as postcode, preferences, and
                interests
              </li>
              <li>
                Information related to movie productions including but not
                limited to storyline, scripts, movie clips/cuts, music etc.
              </li>
              <li>Legal documentation</li>
              <li>
                Financial information such as budgets, credit/debit card numbers
              </li>
            </ul>
            <p className="text-gray-700 mt-2">
              In each case, in accordance with this privacy policy.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
              How We Collect Data
            </h2>
            <p className="text-gray-700 mb-2">
              We collect data in the following ways:
            </p>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Data is given to us by you</li>
              <li>Data is received from other sources</li>
              <li>Data is collected automatically</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
              Data That is Given to Us by You
            </h2>
            <p className="text-gray-700 mb-2">
              Dudutech Limited will collect your data in several ways, for
              example:
            </p>
            <ul className="list-disc pl-5 text-gray-700">
              <li>
                When you contact us through the webapp, by telephone, post,
                email, or through any other means
              </li>
              <li>
                When you register with us and set up an account to receive our
                products/services
              </li>
              <li>
                When you make payments to us through this webapp or otherwise
              </li>
              <li>When you use our services</li>
            </ul>
            <p className="text-gray-700 mt-2">
              In each case, in accordance with this privacy policy.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
              Data That is Received from Publicly Available Third-Party Sources
            </h2>
            <p className="text-gray-700">
              We will receive data about you from publicly available third-party
              sources which include but not limited to:
            </p>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Analytics and Tracking Services</li>
              <li>Advertising and Marketing Partners</li>
              <li>Social Media Integrations</li>
              <li>Payment Processors</li>
              <li>Cloud Storage and Hosting Services</li>
              <li>Customer Support and Communication Tools</li>
              <li>Identity Verification and Fraud Prevention</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
              Data That is Collected Automatically
            </h2>
            <p className="text-gray-700 mb-2">
              To the extent that you access the webapp, we will collect your
              data automatically, for example:
            </p>
            <ul className="list-disc pl-5 text-gray-700">
              <li>
                We automatically collect some information about your visit to
                the webapp. This information helps us to make improvements to
                webapp content and navigation and includes your IP address, the
                date, times, and frequency with which you access the webapp, and
                the way you use and interact with its content.
              </li>
              <li>
                <strong>Use of Cookies and Tracking Technologies:</strong> We
                use cookies and similar tracking technologies to enhance your
                experience, including:
                <ul className="list-disc pl-5 mt-2">
                  <li>
                    Essential cookies (necessary for webapp functionality)
                  </li>
                  <li>Analytics cookies (to understand user behavior)</li>
                  <li>Marketing cookies (for personalized advertising)</li>
                </ul>
              </li>
              <li>You can control cookie settings via your browser.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
              Our Use of Data
            </h2>
            <p className="text-gray-700 mb-2">
              Any or all of the above data may be required by us from time to
              time to provide you with the best possible service and experience
              when using our webapp. Specifically, data may be used by us for
              but not limited to the following reasons:
            </p>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Internal record keeping</li>
              <li>Improvement of our products/services</li>
              <li>Provision of service as requested by you</li>
              <li>Verification of data and information provided by you</li>
              <li>Recommendation to user and/or consultant</li>
              <li>
                Transmission by email of marketing materials that may be of
                interest to you
              </li>
              <li>
                Contact for market research purposes, which may be done using
                email, telephone, fax, or mail. Such information may be used to
                customise or update the webapp
              </li>
            </ul>
            <p className="text-gray-700 mt-2">
              In each case, in accordance with this privacy policy.
            </p>
          </section>

          {/* Section 4 */}
          <section className="mb-10">
            <p className="text-gray-700 mt-2">
              We may use your data for the above purposes if we deem it
              necessary to do so for our legitimate interests. If you are not
              satisfied with this, you have the right to object in certain
              circumstances (see the section headed "Your Rights" below).
            </p>
            <p className="text-gray-700 mt-2">
              For the delivery of direct marketing to you via email, we'll need
              your consent, whether via an opt-in or soft opt-in:
            </p>
            <ul className="list-disc pl-5 text-gray-700">
              <li>
                Soft opt-in consent is a specific type of consent which applies
                when you have previously engaged with us (for example, you
                contact us to ask for more details about a particular
                product/service, and we are marketing similar
                products/services). Under "soft opt-in" consent, we will take
                your consent as given unless you opt out.
              </li>
              <li>
                For other types of e-marketing, we are required to obtain your
                explicit consent; that is, you need to take positive and
                affirmative action when consenting by, for example, checking a
                tick box that we'll provide.
              </li>
              <li>
                If you are not satisfied with our approach to marketing, you
                have the right to withdraw consent at any time. To find out how
                to withdraw your consent, see the section headed "Your Rights"
                below.
              </li>
            </ul>
            <p className="text-gray-700 mt-2">
              When you register with us and set up an account to receive our
              services, the legal basis for this processing is the performance
              of a contract between you and us and/or taking steps, at your
              request, to enter into such a contract.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
              Who We Share Data With
            </h2>
            <p className="text-gray-700 mb-2">
              We may share your data with the following groups of people for the
              following reasons:
            </p>
            <ul className="list-disc pl-5 text-gray-700">
              <li>
                Our employees, agents, and/or professional advisors - to help us
                provide you with a high-quality service
              </li>
            </ul>
            <p className="text-gray-700 mt-2">
              In each case, in accordance with this privacy policy.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
              Keeping Data Secure
            </h2>
            <p className="text-gray-700 mb-2">
              We will use technical and organizational measures to safeguard
              your data, for example:
            </p>
            <ul className="list-disc pl-5 text-gray-700">
              <li>
                Access to your account is controlled by a password and a
                username that is unique to you.
              </li>
              <li>We store your data on secure servers.</li>
              <li>
                Payment details are encrypted using SSL technology (typically,
                you will see a lock icon or green address bar (or both) in your
                browser when we use this technology).
              </li>
            </ul>
            <p className="text-gray-700 mt-2">
              Technical and organizational measures include measures to deal
              with any suspected data breach. If you suspect any misuse, loss,
              or unauthorized access to your data, please let us know
              immediately by contacting us via this email address:{" "}
              <a
                href="mailto:support@nollywoodfilmmaker.com"
                className="text-blue-600 hover:underline"
              >
                support@nollywoodfilmmaker.com
              </a>
            </p>
          </section>

          {/* Section 5 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
              Data Retention
            </h2>
            <p className="text-gray-700">
              Unless a longer retention period is required or permitted by law,
              we will only hold your data on our systems for the period
              necessary to fulfil the purposes outlined in this privacy policy
              or until you request that the data be deleted. Even if we delete
              your data, it may persist on backup or archival media for legal,
              tax, or regulatory purposes.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
              Your Rights
            </h2>
            <p className="text-gray-700 mb-2">
              You have the following rights concerning your data:
            </p>
            <ul className="list-disc pl-5 text-gray-700">
              <li>
                <strong>Right to access:</strong> the right to request (i)
                copies of the information we hold about you at any time, or (ii)
                that we modify, update, or delete such information. If we
                provide you with access to the information we hold about you, we
                will not charge you for this unless your request is "manifestly
                unfounded or excessive." Where we are legally permitted to do
                so, we may refuse your request. If we refuse your request, we
                will tell you the reasons why.
              </li>
              <li>
                <strong>Right to correct:</strong> the right to have your data
                rectified if it is inaccurate or incomplete.
              </li>
              <li>
                <strong>Right to erase:</strong> the right to request that we
                delete or remove your data from our systems.
              </li>
              <li>
                <strong>Right to restrict our use of your data:</strong> the
                right to "block" us from using your data or limit the way in
                which we can use it.
              </li>
              <li>
                <strong>Right to data portability:</strong> the right to request
                that we move, copy, or transfer your data.
              </li>
              <li>
                <strong>Right to object:</strong> the right to object to our use
                of your data, including where we use it for our legitimate
                interests.
              </li>
            </ul>
            <p className="text-gray-700 mt-2">
              To make inquiries, exercise any of your rights set out above, or
              withdraw your consent to the processing of your data (where
              consent is our legal basis for processing your data), please
              contact us via this email address:{" "}
              <a
                href="mailto:support@nollywoodfilmmaker.com"
                className="text-blue-600 hover:underline"
              >
                support@nollywoodfilmmaker.com
              </a>
            </p>
            <p className="text-gray-700 mt-2">
              If you are not satisfied with the way a complaint you make
              concerning your data is handled by us, you may be able to refer
              your complaint to the relevant data protection authority.
            </p>
            <p className="text-gray-700 mt-2">
              It is important that the data we hold about you is accurate and
              current. Please keep us informed if your data changes during the
              period for which we hold it.
            </p>
          </section>

          {/* Section 6 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
              Links and Recommendations to Other Websites, and/or Service
              Providers
            </h2>
            <p className="text-gray-700">
              This webapp may, from time to time, provide links and/or
              recommendations to other websites and/or service providers. We
              have no control over such websites and/or service providers, and
              are not responsible for their content. This privacy policy does
              not extend to your use of such websites or services. You are
              advised to read the privacy policy or statement of other websites
              or service providers before using them.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
              Changes of Business Ownership and Control
            </h2>
            <p className="text-gray-700">
              Dudutech Limited may, from time to time, expand or reduce our
              business, which may involve the sale and/or the transfer of
              control of all or part of Dudutech Limited. Data provided by users
              will, where it is relevant to any part of our business so
              transferred, be transferred along with that part, and the new
              owner or newly controlling party will be permitted to use the data
              for the purposes for which it was originally supplied to us under
              the terms of this privacy policy.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
              General
            </h2>
            <p className="text-gray-700">
              You may not transfer any of your rights under this privacy policy
              to any other person. We may transfer our rights under this privacy
              policy where we reasonably believe your rights will not be
              affected. If any court or competent authority finds that any
              provision of this privacy policy (or part of any provision) is
              invalid, illegal, or unenforceable, that provision or
              part-provision will, to the extent required, be deemed to be
              deleted, and the validity and enforceability of the other
              provisions of this privacy policy will not be affected. Unless
              otherwise agreed, no delay, act, or omission by a party in
              exercising any right or remedy will be deemed a waiver of that, or
              any other, right or remedy. This Agreement will be governed by and
              interpreted according to the laws of the Federal Republic of
              Nigeria. All disputes arising under the Agreement will be subject
              to the exclusive jurisdiction of the Nigerian courts.
            </p>
          </section>

          {/* Section 7 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
              Changes to this Privacy Policy
            </h2>
            <p className="text-gray-700">
              Dudutech Limited reserves the right to change this privacy policy
              as we may deem necessary from time to time or as may be required
              by law. Any changes will be immediately posted on the Webapp, and
              you are deemed to have accepted the terms of the privacy policy on
              your first use after notification of such changes.
            </p>
          </section>
        </main>
      </div>
    </ServiceLayout>
  );
};

export default PrivacyPolicy;
