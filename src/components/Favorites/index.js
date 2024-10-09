//hooks
import React, { useRef } from "react";

//next imports
import { usePathname } from "next/navigation";

//import components
import MoviesCard from "../MoviesCard";

//import from store
import { useGetFavoriteMoviesQuery } from "@/store/api/restApis";
import Link from "next/link";
import { GrHomeRounded } from "react-icons/gr";
import { ProgressBar } from "react-loader-spinner";

const Favorites = () => {
  const componentEle = useRef();

  const path = usePathname();

  const { data, isLoading } = useGetFavoriteMoviesQuery();

  const delFav = (e) => {};

  return (
    <div
      ref={componentEle}
      className="flex flex-col justify-start items-center  relative min-h-[70vh]"
    >
      <Link href="/">
        <div className="absolute top-7 left-7 h-[30px] w-[30px] md:h-[50px] md:w-[50px] bg-white hover:bg-slate-300 flex justify-center items-center">
          <GrHomeRounded />
        </div>
      </Link>

      <h1 className=" text-2xl sm:text-4xl text-white font-bold mb-3 ">
        Favorites Movies
      </h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-[80vh]">
          <ProgressBar
            height="80"
            width="80"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor="#F4442E"
            barColor="#51E5FF"
          />
        </div>
      ) : (
        <>
          {data?.results.length ? (
            <div className=" grid grid-cols-1 gap-y-3 sm:grid-cols-2  sm:gap-3 lg:grid-cols-4 xl:grid-cols-5  w-full  md:gap-4 my-7 px-5 lg:px-10">
              {data?.results.map((val, idx) => (
                <MoviesCard
                  addFav={() => {}}
                  delFav={delFav}
                  path={path}
                  key={idx}
                  {...val}
                />
              ))}
            </div>
          ) : (
            <h1 className="text-red-500 text-2xl text-center h-1/2 mt-28  font-semibold">
              No movies in Favorite
            </h1>
          )}
        </>
      )}
    </div>
  );
};

export default Favorites;
