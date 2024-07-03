import React from "react";

import {
  useGetUpComingMoviesQuery,
  useGetMoviesQuery,
} from "@/store/api/restApis";

import { imagePath } from "@/utilities";
import Image from "next/image";

import { tabs } from "../Movies";

const HeroBanner = ({ pageId }) => {
  const randomTab = Math.floor(Math.random() * tabs.length + 1);

  const tab = tabs[randomTab]?.tab;


  const { data, isLoading } = useGetMoviesQuery({
    tab: tab ? tab : "upcoming",
    pageId: Math.floor(Math.random() * 2 + 1),
  });

  const backGroundImg =
    data?.results[Math.floor(Math.random() * 20)]?.backdrop_path;

  return (
    <div className="h-[450px] sm:h-[700px] w-full flex flex-col justify-center items-center relative">
      <div className="opacity-layer z-20"></div>

      {!isLoading && (
        <Image
          className="h-full w-full object-cover  top-0 left-0 opacity-[0.5]   absolute  "
          src={`${imagePath}${backGroundImg}`}
          height={500}
          width={500}
          alt=""
        />
      )}
      <div className="absolute">
        <h1 className="text-white text-3xl md:text-5xl font-bold  leading-tight text-center mb-5 md:mb-10 ">
          Welcome
        </h1>
        <h1 className="text-white tracking-wide text-xl md:text-3xl font-semibold  text-center px-5 ">
          Millions of movies and people to discover. Explore now.
        </h1>
      </div>
    </div>
  );
};

export default HeroBanner;
