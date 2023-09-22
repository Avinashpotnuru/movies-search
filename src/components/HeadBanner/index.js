import React from "react";

import { imagePath } from "@/utilities";
import Image from "next/image";
import Link from "next/link";

const HeadBanner = ({ backdrop_path, title, overview, id }) => {
  return (
    <div className="text-white relative h-[350px] md:h-[450px] lg:h-[500px] w-full md:md-[90%] lg:w-[80%] flex justify-start items-end p-10 ">
      <Link href={`/movies/${id}`}>
        <Image
          src={`${imagePath}${backdrop_path}`}
          height={500}
          width={500}
          alt="img"
          className=" absolute w-full lg:w-full h-full top-0 left-0 right-0 mx-auto -z-10 "
        />
        <div className="opacity-layer3 z-20"></div>
        <div className="w-[60%] absolute bottom-5 left-4 z-20">
          <h1 className="text-2xl md:text-3xl font-bold my-3">{title}</h1>
          <p className="text-gray-100  text-base md:text-xl">
            {" "}
            {`${overview?.slice(0, 100)} ....`}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default HeadBanner;
