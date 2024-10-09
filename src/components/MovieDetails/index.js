//next imports

import { useRouter } from "next/router";

import { ProgressBar } from "react-loader-spinner";

//imports from store
import { useGetMovieFullDetailsByIdQuery } from "@/store/api/restApis";

import Link from "next/link";

//import components

import { GrHomeRounded } from "react-icons/gr";
import MoviesInfo from "../MovieInfo";
import MovieVideos from "../MovieVideos";
import SimilarMovies from "../SimilarMovies";
import MovieCast from "../MovieCast";
import MovieCrew from "../MovieCrew";

const MovieDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useGetMovieFullDetailsByIdQuery({ id });
  const similarMovies = data?.similar?.results;
  const cast = data?.credits?.cast;
  const crew = data?.credits?.crew;
  const videos = data?.videos?.results;
  const trailer = videos?.find((video) => video.type === "Trailer");
  const key = trailer?.key || null;

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
    <div className="w-full pt-16 md:pt-0 relative">
      <Link href="/">
        <div className="absolute top-7 left-7 z-10 h-[30px] w-[30px] md:h-[50px] md:w-[50px] bg-white hover:bg-slate-300 flex justify-center items-center">
          <GrHomeRounded />
        </div>
      </Link>
      <MoviesInfo data={data} id={id} trailer={trailer} key={key} />
      <div className="sm:px-7 lg:px-10 xl:px-20 py-6">
        <MovieVideos videos={videos} />
        <SimilarMovies similarMovies={similarMovies} />
        <MovieCast cast={cast} />
        <MovieCrew crew={crew} />
      </div>
    </div>
  );
};

export default MovieDetails;
