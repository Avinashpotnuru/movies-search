import React from "react";
import Navbar from "../Navbar";

//  import components

const Layout = ({ children }) => {
  return (
    <div className=" overflow-y-auto h-screen  ">
      <Navbar />
      <main className="pt-[200px] sm:pt-24 md:pt-40  ">{children}</main>
    </div>
  );
};

export default Layout;
