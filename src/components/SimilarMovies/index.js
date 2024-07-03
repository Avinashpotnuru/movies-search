import React from 'react'
import SimilarMovieCard from '../SimilarMovieCard';

const SimilarMovies = ({ similarMovies }) => {
  return (
    <>
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
    </>
  );
};

export default SimilarMovies
