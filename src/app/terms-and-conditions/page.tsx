import ServiceLayout from "@/components/Layouts/ServiceLayout";
import React from "react";

type Props = {};

const TermsAndConditions = (props: Props) => {
  return (
    <ServiceLayout>
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">
          Nollywood Filmmaker Terms of Service
        </h1>
        <div className=" p-4 border border-gray-300 rounded-lg">
          <h2 className="text-xl font-semibold mt-4">Introduction</h2>
          <p>
            Welcome to Nollywood Filmmaker (the "Platform"), owned and operated
            by Dudutech Limited...
          </p>

          <h2 className="text-xl font-semibold mt-4">Eligibility</h2>
          <p>
            To use the Nollywood Filmmaker platform and access its services, you
            must meet the following eligibility requirements...
          </p>

          <h2 className="text-xl font-semibold mt-4">
            Account Registration & Security
          </h2>
          <p>
            To access certain features of the Nollywood Filmmaker platform,
            users must create an account...
          </p>

          <h2 className="text-xl font-semibold mt-4">Services Offered</h2>
          <p>
            Nollywood Filmmaker is a comprehensive digital platform designed to
            serve as a hub for professionals...
          </p>

          <h2 className="text-xl font-semibold mt-4">User Responsibilities</h2>
          <p>
            By accessing and using the Nollywood Filmmaker platform, users agree
            to comply with the following responsibilities...
          </p>

          <h2 className="text-xl font-semibold mt-4">
            Content Ownership & Intellectual Property
          </h2>
          <p>
            Users retain full ownership rights to any content they upload, post,
            or share on the platform...
          </p>

          <h2 className="text-xl font-semibold mt-4">Prohibited Activities</h2>
          <p>
            To maintain a safe and secure environment, users are strictly
            prohibited from engaging in the following activities...
          </p>

          <h2 className="text-xl font-semibold mt-4">Payment & Transactions</h2>
          <p>
            To ensure a secure and transparent payment process, the following
            terms apply to all financial transactions...
          </p>

          <h2 className="text-xl font-semibold mt-4">
            Third-Party Services & Links
          </h2>
          <p>
            The platform may contain links to third-party websites,
            applications, and services...
          </p>

          <h2 className="text-xl font-semibold mt-4">
            Disclaimer of Warranties
          </h2>
          <p>
            The platform is provided on an "as is" and "as available" basis
            without warranties of any kind...
          </p>

          <h2 className="text-xl font-semibold mt-4">
            Governing Law & Dispute Resolution
          </h2>
          <p>
            These Terms shall be governed by and construed in accordance with
            the laws of the Federal Republic of Nigeria...
          </p>
        </div>
      </div>
    </ServiceLayout>
  );
};

export default TermsAndConditions;
