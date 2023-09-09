import React from "react";

import { useRouter } from "next/router";

const Genres = () => {
  const router = useRouter();

  const { id } = router.query;
  return <div>Genres {id}</div>;
};

export default Genres;
