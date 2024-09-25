import React, { ReactNode } from "react";

type Props = {
  body: {
    title: string;
    content: string;
  }[];

  title: string;
  image: ReactNode;
};

const ServiceLeft = ({ body, title, image }: Props) => {
  return (
    <section className="bg-gray-bg-3 w-[45%] py-[5rem] min-h-screen">
      <div className="bg-black-3 h-[3.8rem] flex justify-center items-center mx-auto w-[3.8rem] rounded-full">
        <p className="text-[1.5rem] font-bold text-white">NA</p>
      </div>
      <div className="text-center text-black-3 mt-2">
        <h1 className="text-[1.13rem] font-bold">Niyi Akinmolayan</h1>
        <h2 className="text-[0.88rem]">Niyi@gmail.com</h2>
      </div>
      <div className="bg-white w-[70%] mt-7 rounded-md px-7 py-6 mx-auto">
        <div className="bg-black-3 mb-3 py-3 px-4 rounded-md flex items-center justify-between">
          <p className="text-white font-bold">{title}</p>
          <div className="">{image}</div>
        </div>
        {body.map((el) => (
          <div
            className="text-[0.88rem] border-t border-t-stroke-4 py-4"
            key={el.title}
          >
            <h1 className="text-black-2 font-bold">{el.title}</h1>
            <p className="mt-2">{el.content || "..."}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceLeft;
