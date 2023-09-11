"use client";

//next imports
import Image from "next/image";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

import { useRouter } from "next/router";

//import third party packages
import ReactPlayer from "react-player";

//imports from store
import {
  useGetSimilarMoviesQuery,
  useGetMovieVideosQuery,
  useGetPersonDetailsQuery,
  useAddFavoritesMutation,
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

const MovieDetails = (props) => {
  const [toggle, setToggle] = useState(false);
  const cast = props?.cast;
  const crew = props?.crew;

  const trailerVideos = props?.videos;
  var key;
  if (trailerVideos) {
    key = props?.videos[0]?.key;
  }

  const router = useRouter();

  const { id } = router.query;

  const [addFavorite] = useAddFavoritesMutation();

  const { data } = useGetSimilarMoviesQuery({ id });

  // const { data: reviews } = useGetPersonDetailsQuery({ id });

  const similarMovies = data?.results;

  const { data: videosData } = useGetMovieVideosQuery({ id });

  const videos = videosData?.results;

  const imagePath =
    "https://image.tmdb.org/t/p/w500/https://image.tmdb.org/t/p/w500";

  return (
    <div className="w-full sm:pt-12 md:pt-0  ">
      <div
        className={`w-full md:h-[60vh]  lg:h-[80vh]   ${
          props.backdrop_path && ""
        }    rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10    flex justify-center items-center  relative   `}
      >
        <Image
          src={`${
            props.backdrop_path
              ? `${imagePath}${props.backdrop_path}`
              : "/backgroundImage.jpg"
          }`}
          height={100}
          width={100}
          className="w-full h-full hidden md:block object-cover opacity-40 absolute -z-10  "
          alt="image"
        />
        <div className=" flex flex-col md:flex-row md:justify-around  sm:items-center space-y-4 md:space-y-0  w-full px-4 md:px-10 lg:px-24 xl:px-40 ">
          <div className="flex justify-center items-center ">
            <Image
              height={300}
              width={400}
              src={`${
                props.poster_path
                  ? `${imagePath}${props.poster_path}`
                  : "/noimage.png"
              }`}
              className="w-[300px] h-[380px]  md:h-full md:w-auto sm:hidden"
              alt="image"
            />
            <div className="hidden w-full sm:block">
              {key ? (
                <ReactPlayer
                  controls={true}
                  height={300}
                  width={400}
                  light={
                    <Image
                      height={300}
                      width={400}
                      src={`${imagePath}${props.poster_path}`}
                      className="w-[300px] h-[380px] md:h-[400px] mb-6"
                      alt="image"
                    />
                  }
                  url={`https://youtu.be/${key}`}
                />
              ) : (
                <Image
                  height={300}
                  width={400}
                  src={`${imagePath}${props.poster_path}`}
                  className="w-[300px] h-[340px] mb-6 "
                  alt="image"
                />
              )}
            </div>
          </div>
          <div className="  text-blue-900 md:border md:border-gray-100 md:flex md:flex-col md:justify-around  px-4 space-y-2 md:space-y-0 p-3">
            <div className="flex justify-between items-center">
              <h1 className="text-white text-2xl font-extrabold italic ">
                {props?.title}
              </h1>
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
            <div className="flex flex-wrap">
              <span className="text-white font-bold   text-base">Genres:</span>{" "}
              <div className="  font-semibold  text-green-500 flex flex-wrap ">
                {props?.genres?.map((e, idx) => e.name).join(",")}
              </div>
            </div>

            <div>
              <h1 className="text-white  text-base">
                <span className=" font-bold text-base">Run time : </span>
                {`${Math.floor(props?.runtime / 60)}h ${props?.runtime % 60}m`}
              </h1>
              <h1 className="text-white  text-base">
                <span className=" font-bold text-base">languages : </span>
                {props?.spoken_languages?.map((e) => e.english_name).join(",")}
              </h1>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Overview :</h1>
              <h1 className="text-white text-base">{props?.overview}</h1>
            </div>

            <div className="flex flex-col justify-start items-center space-y-3 sm:space-y-0 sm:flex-row sm:justify-around sm:w-full ">
              <h1 className="text-green-500 font-bold">
                <span className=" text-white font-bold text-base">
                  Release_date :
                </span>{" "}
                {props?.release_date}
              </h1>
              <h1 className=" font-bold text-white ">
                <span className=" text-white font-bold text-base">Rating</span>{" "}
                : {props?.vote_average}
              </h1>
            </div>
            <div className="flex justify-end items-center my-4">
              <Link href={`/images/${id}`}>
                <button className="bg-transparent flex justify-center items-center text-white py-2 px-4 rounded-md  space-x-2 transition duration-300 ease-in-out hover:border-2">
                  More Images
                  <div className="ml-2 my-auto">
                    <AiOutlineRight />
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

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

      <h1 className="font-bold text-white my-3 text-2xl  text-center">Cast</h1>
      <div className="flex flex-col  overflow-x-auto w-full  p-3">
        <div className="flex  space-x-4 pt-4 ">
          {cast?.map((e, idx) => (
            <CastCard key={idx} {...e} />
          ))}
        </div>
      </div>
      <h1 className=" font-bold text-white my-3 text-2xl  text-center">Crew</h1>
      <div className="flex flex-col  overflow-x-auto w-full p-3">
        <div className="flex  space-x-4  ">
          {crew?.map((e, idx) => (
            <CastCard crew_name={"crew"} key={idx} {...e} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
