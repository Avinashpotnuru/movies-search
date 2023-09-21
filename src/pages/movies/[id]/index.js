//next imports

import dynamic from "next/dynamic";

//import components
const MovieDetails = dynamic(() => import("@/components/MovieDetails"), {
  ssr: false,
});

const MoviesDetailsPage = () => {
  return (
    <div>
      <MovieDetails />
    </div>
  );
};

export default MoviesDetailsPage;
