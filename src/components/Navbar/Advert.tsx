import Link from "next/link";
import React from "react";

type Props = {};

const Advert = (props: Props) => {
  return (
    <div className="bg-black-8 py-4">
      <Link href={"https://www.youtube.com/playlist?list=PL9Rc2I3KoJiiNUO3zv9o161C3u-rDd5cp"} target="_blank">
      <p className="text-sm text-center text-white text-[0.79rem]"><span className="text-yellow-1 hover:text-white hover:underline">Watch a tutorial on how our service works</span></p>
      </Link>
    </div>
  );
};

export default Advert;
