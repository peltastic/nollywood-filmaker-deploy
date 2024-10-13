import React from "react";

type Props = {};

const expertise = ["Producer", "Director", "Composer"];

const ConsultantProfileRight = (props: Props) => {
  return (
    <div className="">
      <div className="bg-white rounded-2xl pb-6 pt-2 px-6 border shadow-md border-stroke-5 shadow-[#1018280F]">
        <div className="py-4 border-b border-b-stroke-6">
          <h1 className="font-medium text-[1.13rem]">About</h1>
        </div>
        <div className="mt-6">
          <h1 className="font-bold mb-2">Profile Bio</h1>
          <div className="text-black-2">
            <p>
              I am based in Miami, Florida USA and am a Business Entrepreneur
              with proven talent for driving website traffic along with a
              superior quality deliverable.A keen acumen and web building spirit
              help me in providing impeccable customer service for your personal
              or business website.
            </p>
            <p className="mt-4">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 bg-white rounded-2xl pb-6 pt-2 px-6 border shadow-md border-stroke-5 shadow-[#1018280F]">
        <div className="py-4 border-b border-b-stroke-6">
          <h1 className="font-medium text-[1.13rem]">Skills/Expertise</h1>
        </div>
        <div className="xs:grid-cols-2 md:grid-cols-4 grid mt-8 gap-x-6 gap-y-6">
          {expertise.map((el) => (
            <div
              className={
                "border border-stroke-2 transition-all cursor-pointer text-[0.88rem] font-medium  flex items-center justify-center rounded-md  text-black-2 px-[3rem] h-[3.62rem]"
              }
              key={el}
            >
              {el}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 bg-white rounded-2xl pb-6 pt-2 px-6 border shadow-md border-stroke-5 shadow-[#1018280F]">
        <div className="py-4 border-b border-b-stroke-6">
          <h1 className="font-medium text-[1.13rem]">Contact</h1>
        </div>
        <div className="grid mid:grid-cols-3 mt-8">
          <div className="mb-4 mid:mb-0">
            <h1 className="font-bold">Phone</h1>
            <p>+861 555 669 6985</p>
          </div>
          <div className="mb-4 mid:mb-0">
            <h1 className="font-bold">Email</h1>
            <p>niyi@gmail.com</p>
          </div>
          <div className="mb-4 mid:mb-0">
            <h1 className="font-bold">Website</h1>
            <p>www.anthillstudios.com</p>
          </div>
        </div>
      </div>
      <div className="mt-4 bg-white rounded-2xl pb-6 pt-2 px-6 border shadow-md border-stroke-5 shadow-[#1018280F]">
        <div className="py-4 border-b border-b-stroke-6">
          <h1 className="font-medium text-[1.13rem]">Location</h1>
        </div>
        <div className="grid mid:grid-cols-3 mt-8">
          <div className="mb-4 mid:mb-0">
            <h1 className="font-bold">City</h1>
            <p>+861 555 669 6985</p>
          </div>
          <div className="mb-4 mid:mb-0">
            <h1 className="font-bold">Country</h1>
            <p>niyi@gmail.com</p>
          </div>
          <div className="mb-4 mid:mb-0">
            <h1 className="font-bold">Postal code</h1>
            <p>+234</p>
          </div>
        </div>
      </div>
      <div className="mt-4 bg-white rounded-2xl pb-6 pt-2 px-6 border shadow-md border-stroke-5 shadow-[#1018280F]">
        <div className="py-4 border-b border-b-stroke-6">
          <h1 className="font-medium text-[1.13rem]">Availability</h1>
        </div>
        <div className="mt-6">
            <h1 className="font-bold">Monday</h1>
            <p>9:00AM - 5:00PM</p>
          </div>
      </div>
    </div>
  );
};

export default ConsultantProfileRight;
