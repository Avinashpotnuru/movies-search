import React from "react";
import Navbar from "../Navbar";
import Nav from "../Nav";

//  import components

const Layout = ({ children }) => {
  return (
    <div className="  h-screen w-full  ">
      <Navbar />

      <main className="pt-[200px] sm:pt-24 md:pt-40   ">{children}</main>
    </div>
  );
};

export default Layout;
