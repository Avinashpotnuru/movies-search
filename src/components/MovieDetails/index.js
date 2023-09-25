//next imports
import Image from "next/image";

import dynamic from "next/dynamic";

import { useRouter } from "next/router";

import { ProgressBar } from "react-loader-spinner";

//import third party packages
import ReactPlayer from "react-player/youtube";

//imports from store
import {
  useAddFavoritesMutation,
  useGetMovieFullDetailsByIdQuery,
} from "@/store/api/restApis";

import Link from "next/link";

//import components
import CastCard from "../CastCard";

const VideoCard = dynamic(() => import("../VideoCard"), {
  ssr: false,
});
import SimilarMovieCard from "../SimilarMovieCard";

import { MdOutlineFavorite } from "react-icons/md";
import { useState } from "react";
import { AiOutlineRight } from "react-icons/ai";

import { BsFillPlayFill } from "react-icons/bs";

import { imagePath } from "@/utilities";
import CircleRating from "../CircleRating";
import { GrHomeRounded } from "react-icons/gr";

const MovieDetails = () => {
  const [toggle, setToggle] = useState(false);

  const router = useRouter();

  const { id } = router.query;

  // console.log("id", id);

  const [addFavorite] = useAddFavoritesMutation();

  const { data, isLoading } = useGetMovieFullDetailsByIdQuery({ id });

  // console.log(data);

  const similarMovies = data?.similar?.results;

  const cast = data?.credits?.cast;

  const crew = data?.credits?.crew;

  const videos = data?.videos?.results;

  const trailer = data?.videos?.results?.filter((e) => e.type == "Trailer");
  let key = null;
  if (trailer?.length > 0) {
    const trailerKey = trailer[0];

    key = trailerKey?.key;

    // console.log(trailerKey);
  }

  // console.log(trailer);

  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
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
    <div className="w-full pt-16  md:pt-0 relative  ">
      <Link href="/">
        {" "}
        <div className="absolute top-7 left-7  z-10 h-[30px] w-[30px] md:h-[50px] md:w-[50px] bg-white hover:bg-slate-300 flex justify-center items-center">
          <GrHomeRounded />
        </div>
      </Link>
      <div
        className={`w-full md:h-[60vh]  lg:h-[80vh]   ${
          data.backdrop_path && ""
        }    rounded-md    flex justify-center items-center  relative`}
      >
        <div className="opacity-layer1 h-[20px] md:h-[1px] lg:h-[100px]"></div>
        <Image
          src={`${
            data.backdrop_path
              ? `${imagePath}${data.backdrop_path}`
              : "/backgroundImage.jpg"
          }`}
          height={100}
          width={100}
          className="w-full h-full hidden md:block object-cover  absolute -z-10    opacity-30"
          alt="image"
        />
        <div className=" flex flex-col md:flex-row md:justify-around  sm:items-center space-y-4 md:space-y-0  w-full px-4 md:px-5 lg:px-24 xl:px-40 ">
          <div className="flex justify-center items-center ">
            <Image
              height={300}
              width={400}
              src={`${
                data.poster_path
                  ? `${imagePath}${data.poster_path}`
                  : "/noimage.png"
              }`}
              className="w-[300px] h-[380px]  md:min-h-full  sm:hidden"
              alt="image"
            />
            <div className="hidden w-full sm:flex  md:flex justify-center items-center  ">
              <Image
                height={300}
                width={400}
                src={`${
                  data.poster_path
                    ? `${imagePath}${data.poster_path}`
                    : "/noimage.png"
                }`}
                className="w-[300px] h-[450px]  md:min-w-[380px]  lg:min-h-[500px] lg:min-w-[410px]   mb-6 "
                alt="image"
              />
            </div>
          </div>
          <div className="  text-blue-900  md:flex md:flex-col md:justify-around  px-4  p-3 md:px-8 lg:px-14 xl:px-24 ">
            <div className="flex justify-between items-center my-2 sm:my-4">
              <div>
                <h1 className="text-white text-2xl font-extrabold ">
                  {data?.title}
                </h1>
                <h1 className="text-white text-lg font-semibold ">
                  {data?.tagline}
                </h1>
              </div>

              <div
                onClick={() => {
                  setToggle((prev) => !prev);
                  addFavorite({
                    media_type: "movie",
                    media_id: id,
                    favorite: true,
                  });
                }}
                className="mr-8"
              >
                <MdOutlineFavorite color={`${toggle ? "red" : "white"}`} />
              </div>
            </div>

            <div>
              <h1 className="text-white text-base">{data?.overview}</h1>
            </div>
            <div className="flex flex-wrap space-x-2  my-5">
              {data?.genres?.map((item, idx) => (
                <button
                  className=" text-black font-semibold mb-2 px-2 bg-gradient-to-r from-teal-200 to-teal-500"
                  key={idx}
                >
                  {item.name}
                </button>
              ))}
            </div>

            <div className="flex   justify-between items-center">
              <div className="space-y-2">
                <h1 className="text-white  text-base">
                  <span className=" font-bold text-base">Run time : </span>
                  {`${Math.floor(data?.runtime / 60)}h ${data?.runtime % 60}m`}
                </h1>
                <h1 className="text-white  text-base">
                  <span className=" font-bold text-base">Languages : </span>
                  {data?.spoken_languages?.map((e) => e.english_name).join(",")}
                </h1>

                <h1 className="text-green-500 font-bold">
                  <span className=" text-white font-bold text-base">
                    Release Date :
                  </span>{" "}
                  {data?.release_date}
                </h1>
                <h1 className="text-green-500 font-bold">
                  <span className=" text-white font-bold text-base">
                    Status :
                  </span>{" "}
                  {data?.status}
                </h1>
              </div>
              <div className="h-[60px] w-[60px]">
                <CircleRating rating={data?.vote_average?.toFixed(1)} />
              </div>
            </div>

            <div className="flex flex-col justify-center sm:flex-row sm:justify-between space-y-4 sm:space-y-0 items-center my-4 ">
              <Link href={`/images/${id}`}>
                <button className="bg-transparent flex justify-center items-center  text-white py-2 px-4 rounded-md  space-x-2 transition duration-300 ease-in-out border-2 hover:border-green-400 hover:text-green-500 ">
                  More Images
                  <div className="ml-2 my-auto ">
                    <AiOutlineRight />
                  </div>
                </button>
              </Link>
              {trailer.length > 0 && (
                <a
                  href={`https://www.youtube.com/watch?v=${key}`}
                  target="_blank"
                >
                  <button className="bg-transparent flex justify-center items-center text-white py-2 px-4 rounded-md  space-x-2 transition duration-300 ease-in-out border-2 hover:border-green-400 hover:text-green-500  ">
                    <div className="ml-2 my-auto ">
                      <BsFillPlayFill />
                    </div>
                    Watch Trailer
                  </button>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="sm:px-7 lg:px-10 xl:px-20 py-6">
        {videos?.length && (
          <>
            <h1 className=" font-bold text-white my-3 text-2xl  text-center">
              Videos
            </h1>
            <div className="flex flex-col  overflow-x-auto w-full p-3">
              <div className="flex  space-x-4  ">
                {videos?.slice(0, 10).map((e, idx) => (
                  <VideoCard key={idx} videos={e} />
                ))}
              </div>
            </div>
          </>
        )}

        {similarMovies?.length && (
          <>
            <h1 className=" font-bold text-white my-3 text-2xl  text-center">
              Similar Movies
            </h1>
            <div className="flex flex-col  overflow-x-auto w-full p-3">
              <div className="flex  space-x-4  ">
                {similarMovies?.map((e, idx) => (
                  <SimilarMovieCard key={idx} {...e} />
                ))}
              </div>
            </div>
          </>
        )}

        {cast?.length > 0 && (
          <>
            <h1 className="font-bold text-white my-3 text-2xl  text-center">
              Cast
            </h1>
            <div className="flex flex-col  overflow-x-auto w-full  p-3">
              <div className="flex  space-x-4 pt-4 ">
                {cast?.map((e, idx) => (
                  <CastCard key={idx} {...e} />
                ))}
              </div>
            </div>
          </>
        )}

        {crew?.length > 0 && (
          <>
            <h1 className=" font-bold text-white my-3 text-2xl  text-center">
              Crew
            </h1>
            <div className="flex flex-col  overflow-x-auto w-full p-3">
              <div className="flex  space-x-4  ">
                {crew?.map((e, idx) => (
                  <CastCard crew_name={"crew"} key={idx} {...e} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
