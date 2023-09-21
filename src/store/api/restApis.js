//redux imports

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASEURL;
const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjI1NjI4MzQ5ZDEyYTM2NjBlOGU2MzEyOGY3YWFhNCIsInN1YiI6IjY0YzhlMzc1MWZhMWM4MDEwZjRkY2M5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GnxYB_a56IRwIqbctVsCAFOnuMa3aMrE01vLubawd-o";

const restApi = createApi({
  reducerPath: "restApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,

    prepareHeaders: (headers) => {
      headers.set("authorization", `Bearer ${API_KEY}`);

      return headers;
    },
  }),

  tagTypes: ["Movies"],

  endpoints: (builder) => ({
    addFavorites: builder.mutation({
      query: (data) => ({
        url: `account/20236627/favorite`,
        method: "POST",

        body: data,
      }),
      invalidatesTags: ["Movies"],
    }),

    getMovies: builder.query({
      query: (data) => `movie/${data.tab}?page=${data.pageId}`,
      providesTags: ["Movies"],
    }),
    getMovieById: builder.query({
      query: (data) => `movie/${data.id}`,
      providesTags: ["Movies"],
    }),

    getMovieFullDetailsById: builder.query({
      query: (data) =>
        `movie/${data.id}?append_to_response=credits,similar,videos`,
      providesTags: ["Movies"],
    }),

    getMovieDetailsCast: builder.query({
      query: (data) => `movie/${data.id}/credits`,
      providesTags: ["Movies"],
    }),
    getMovieVideos: builder.query({
      query: (data) => `movie/${data.id}/videos`,
      providesTags: ["Movies"],
    }),
    getSearchMovies: builder.query({
      query: (data) => `search/movie?query=${data.searchInput}`,
      providesTags: ["Movies"],
    }),
    getSimilarMovies: builder.query({
      query: (data) => `movie/${data.id}/similar`,
      providesTags: ["Movies"],
    }),
    getMovieReview: builder.query({
      query: (data) => `movie/${data.id}/watch/providers`,
      providesTags: ["Movies"],
    }),
    getMovieImages: builder.query({
      query: (data) => `movie/${data.id}/images`,
      providesTags: ["Movies"],
    }),
    getPersonDetails: builder.query({
      query: (data) => `person/${data.id}`,
      providesTags: ["Movies"],
    }),
    getPersonImages: builder.query({
      query: (data) => `person/${data.id}/images`,
      providesTags: ["Movies"],
    }),
    getHeroMovies: builder.query({
      query: (data) => `person/${data.id}/combined_credits`,
      providesTags: ["Movies"],
    }),
    getFavoriteMovies: builder.query({
      query: (data) => `account/20236627/favorite/movies`,
      providesTags: ["Movies"],
    }),
    getGenres: builder.query({
      query: (data) => `genre/movie/list`,
      providesTags: ["Movies"],
    }),
    getGenresMovies: builder.query({
      query: (data) =>
        `discover/movie?include_adult=false&include_video=false&language=en-US&page=${data.pageId}&sort_by=popularity.desc&with_genres=${data.id}`,
      providesTags: ["Movies"],
    }),
    getSpecialMovies: builder.query({
      query: (data) =>
        `discover/movie?include_adult=false&include_video=false&language=en-US&page=${data.pageId}&sort_by=popularity.desc&with_origin_country=IN&with_original_language=${data.code}`,
      providesTags: ["Movies"],
    }),
    getUpComingMovies: builder.query({
      query: (data) => `movie/upcoming`,
      providesTags: ["Movies"],
    }),
  }),
});

export const {
  useAddFavoritesMutation,
  useGetMoviesQuery,
  useGetMovieByIdQuery,
  useGetMovieDetailsCastQuery,
  useGetMovieVideosQuery,
  useGetSearchMoviesQuery,
  useGetSimilarMoviesQuery,
  useGetMovieReviewQuery,
  useGetPersonDetailsQuery,
  useGetPersonImagesQuery,
  useGetMovieImagesQuery,
  useGetFavoriteMoviesQuery,
  useGetHeroMoviesQuery,
  useGetGenresQuery,
  useGetGenresMoviesQuery,
  useGetSpecialMoviesQuery,
  useGetUpComingMoviesQuery,
  useGetMovieFullDetailsByIdQuery,
} = restApi;

export default restApi;
