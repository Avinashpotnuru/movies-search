import "@/styles/globals.css";
import { Provider } from "react-redux";

import { store } from "@/store/store";
import Layout from "@/components/Layout";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Movies-Search </title>
        <link
          rel="icon"
          href="/movielogo.jpg"
          type="image/x-icon"
          sizes="any"
        />
        <meta
          name="description"
          content="It is a movie-search app where users can see details about movies and know about movie casting and crew  details. And also search movies in this app. Users can see the popular, top-rated rated, and trending movies."
        />
      </Head>
      <Provider store={store}>
        <div className="overflow-x-container">
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </div>
      </Provider>
    </>
  );
}
