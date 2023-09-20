"use client";
//hooks
import React, { useEffect, useRef } from "react";

//next imports
import { usePathname } from "next/navigation";

//import components
import MoviesCard from "../MoviesCard";

//import from store
import { useGetFavoriteMoviesQuery } from "@/store/api/restApis";

const Favorites = () => {
  const componentEle = useRef();

  // console.log(componentEle.current);
  const path = usePathname();

  const { data } = useGetFavoriteMoviesQuery();

  // console.log(data);

  const delFav = (e) => {};

  // useEffect(() => {
  //   window.location.reload();
  // }, []);

  return (
    <div
      ref={componentEle}
      className="flex flex-col justify-start items-center h-screen"
    >
      <h1 className=" text-2xl sm:text-4xl text-white font-bold mb-3 ">
        Favorites Movies
      </h1>

      {data?.results.length ? (
        <div className="grid grid-cols-1 gap-y-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5  w-full  md:gap-5 my-7">
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
        <h1 className="text-white text-2xl text-center h-1/2 mt-28  font-semibold">
          No movies in Favorite
        </h1>
      )}
    </div>
  );
};

export default Favorites;
