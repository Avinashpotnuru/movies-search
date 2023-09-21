"use client";

import Link from "next/link";
//import components

import SearchMovieCard from "../SearchMovieCard";
import { GrHomeRounded } from "react-icons/gr";

const MoviesSearch = ({ searchRes }) => {
  return (
    <div className="w-full flex flex-col justify-center items-center relative">
      <Link href="/">
        {" "}
        <div className="absolute top-7 left-7 h-[30px] w-[30px] md:h-[50px] md:w-[50px] bg-white hover:bg-slate-300 flex justify-center items-center">
          <GrHomeRounded />
        </div>
      </Link>
      <h1 className="text-4xl mt-3  text-white font-extrabold mb-3 ">
        Results
      </h1>
      <div>
        {searchRes?.map((val, idx) => (
          <SearchMovieCard key={idx} {...val} />
        ))}
      </div>
    </div>
  );
};

export default MoviesSearch;
