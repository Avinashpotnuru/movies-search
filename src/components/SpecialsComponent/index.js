import React from "react";
import { useRouter } from "next/router";
import { ProgressBar } from "react-loader-spinner";
import MoviesCard from "../MoviesCard";
import Pagination from "../Pagination";
import { useSelector } from "react-redux";

import { useGetSpecialMoviesQuery } from "@/store/api/restApis";

import { specials } from "../Navbar";
import { usePathname } from "next/navigation";

const Specials = () => {
  const router = useRouter();
  const { page } = router.query;
  // console.log(page);

  const pageId = useSelector((state) => state.tabsSlice.tabs);

  // console.log(pageId);
  const path = usePathname();

  const languageObject = specials?.find((item) => item.page === page);

  // console.log(languageObject);

  const name = languageObject?.name;

  const code = languageObject?.code;

  const { isLoading, data } = useGetSpecialMoviesQuery({
    pageId,
    code,
  });

  return (
    <div className=" flex flex-col justify-center items-center px-5 py-6">
      <h1 className="text-white text-3xl font-semibold">{name}</h1>

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
          <div className=" grid grid-cols-1 gap-y-3 sm:grid-cols-2   lg:grid-cols-4 xl:grid-cols-5   w-full  md:gap-5 my-7">
            {data?.results?.map((val, idx) => (
              <MoviesCard path={path} key={idx} {...val} />
            ))}
          </div>
        )}
      </div>

      <Pagination pages={data?.total_pages} />
    </div>
  );
};

export default Specials;
