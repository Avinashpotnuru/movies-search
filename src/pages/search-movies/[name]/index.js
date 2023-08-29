//next imports

import { useParams } from "next/navigation";

import { useGetSearchMoviesQuery } from "@/store/api/restApis";

//import components

import MoviesSearch from "@/components/MovieSearch";
import { useRouter } from "next/router";

const SearchMovies = () => {
  // const params = useParams();

  // const searchInput = params.name;
  const router = useRouter();
  // const { id } = router.query;

  const { name: searchInput } = router.query;

  const { data } = useGetSearchMoviesQuery({ searchInput });

  const searchRes = data?.results;

  return (
    <div>
      <MoviesSearch searchRes={searchRes} />
    </div>
  );
};

export default SearchMovies;
