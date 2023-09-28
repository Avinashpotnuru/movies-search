//next imports
import { usePathname } from "next/navigation";

//react imports
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { ProgressBar } from "react-loader-spinner";

import {
  useGetMoviesQuery,
  useGetTrendingMoviesQuery,
} from "@/store/api/restApis";

//import components

import MoviesCard from "../MoviesCard";
import Pagination from "../Pagination";
import HeroBanner from "../HeroBanner";
import SimilarMovieCard from "../SimilarMovieCard";

export const tabs = [
  { title: "Now Playing", tab: "now_playing" },
  { title: "Popular", tab: "popular" },
  { title: "Top Rated", tab: "top_rated" },
  { title: "Up Coming", tab: "upcoming" },
];

const Movies = () => {
  const path = usePathname();
  const [tab, setTab] = useState("now_playing");
  const [title, setTitle] = useState("Now Playing");
  const [favorite, setFavorite] = useState([]);
  const [trending, setTrending] = useState("day");

  const handleDropdownChange = (event) => {
    setTab(event.target.value);
    setTitle(event.target.value2);
  };

  const pageId = useSelector((state) => state.tabsSlice.tabs);

  const { data, isLoading } = useGetMoviesQuery({ tab, pageId });

  const { data: trendingMovies } = useGetTrendingMoviesQuery({ trending });

  const moviesData = data?.results;

  return (
    <div className="flex flex-col justify-center items-center space-y-7 min-h-screen w-full   ">
      <HeroBanner pageId={pageId} />
      <h1 className="text-2xl sm:text-4xl text-white font-semibold mb-3 ">
        Movies
      </h1>

      <div className="flex flex-col justify-center sm:justify-start sm:flex-row sm:space-x-14 sm:w-full ">
        <h1 className="text-white font-semibold text-center text-2xl mb-4 sm:mb-0 sm:ml-7">
          Trending
        </h1>
        <div className="space-x-3 rounded-[20px]   sm:flex justify-around items-center border-[1px] border-white  flex-wrap">
          <button
            onClick={() => setTrending("day")}
            className={`rounded-[20px] p-2 hover:shadow-2xl text-white px-4  ${
              trending == "day"
                ? "bg-gradient-to-r from-purple-800 via-violet-900 to-purple-800 border-red-100  "
                : ""
            } `}
          >
            Today
          </button>
          <button
            onClick={() => setTrending("week")}
            className={`rounded-[20px] p-2 hover:shadow-2xl text-white px-4  ${
              trending == "week"
                ? "bg-gradient-to-r from-purple-800 via-violet-900 to-purple-800 border-red-100  "
                : ""
            } `}
          >
            This week
          </button>
        </div>
      </div>

      <div className="flex flex-col  overflow-x-auto w-full p-3">
        <div className="flex  space-x-4  ">
          {trendingMovies?.results?.map((e, idx) => (
            <SimilarMovieCard key={idx} {...e} />
          ))}
        </div>
      </div>

      <div className="space-x-3 rounded-[20px] hidden   sm:flex justify-around items-center border-[1px] border-white  flex-wrap">
        {tabs.map((val, idx) => (
          <button
            onClick={() => {
              setTab(val.tab);
              setTitle(val.title);
              //   dispatch(tabsHandler(val));
            }}
            className={`rounded-[20px] p-2 hover:shadow-2xl text-white px-4  ${
              tab == val.tab
                ? "bg-gradient-to-r from-purple-800 via-violet-900 to-purple-800 border-red-100  "
                : ""
            } `}
            key={idx}
          >
            {val.title}
          </button>
        ))}
      </div>

      <select
        className="border sm:hidden rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={tab}
        onChange={handleDropdownChange}
      >
        {tabs.map((e, idx) => (
          <option key={idx} value={e.tab}>
            {e.title}
          </option>
        ))}
      </select>
      <h1 className="text-3xl text-white font-extrabold mb-3 hidden sm:block ">
        {title}
      </h1>

      <div className="flex justify-center items-center w-full sm:px-5  ">
        {isLoading ? (
          <ProgressBar
            height="80"
            width="80"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor="#F4442E"
            barColor="#51E5FF"
          />
        ) : (
          <div className=" grid grid-cols-1 gap-y-3 sm:grid-cols-2  sm:gap-3 lg:grid-cols-4 xl:grid-cols-5  w-full  md:gap-4 my-7">
            {moviesData?.map((val, idx) => (
              <MoviesCard path={path} key={idx} {...val} />
            ))}
          </div>
        )}
      </div>
      <Pagination pages={data?.total_pages} />
    </div>
  );
};

export default Movies;
