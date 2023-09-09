import React from "react";

import { useRouter } from "next/router";

import {
  useGetGenresMoviesQuery,
  useGetGenresQuery,
} from "@/store/api/restApis";
import MoviesCard from "../MoviesCard";
import { ProgressBar } from "react-loader-spinner";
import Pagination from "../Pagination";
import { useSelector } from "react-redux";

const Genres = () => {
  const router = useRouter();

  const { id } = router.query;

  const { data: moviesGenres } = useGetGenresQuery();

  const pageId = useSelector((state) => state.tabsSlice.tabs);
  const { isLoading, data } = useGetGenresMoviesQuery({ id, pageId });

  console.log(data);

  const genresArray = moviesGenres?.genres;

  const getGenreName = genresArray?.find((item) => item.id == id);

  return (
    <div className=" flex flex-col justify-center items-center px-5 py-6">
      <h1 className="text-white text-3xl font-semibold">
        {getGenreName?.name}
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
          <div className=" grid grid-cols-1 gap-y-3 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4  w-full  md:gap-5 my-7">
            {data?.results?.map((val, idx) => (
              <MoviesCard key={idx} {...val} />
            ))}
          </div>
        )}
      </div>

      <Pagination pages={data?.total_pages} />
    </div>
  );
};

export default Genres;
