import React from "react";
import Navbar from "../Navbar";

//  import components

const Layout = ({ children }) => {
  return (
    <div className=" overflow-y-auto h-screen  ">
      <Navbar />
      <main className="pt-40 sm:pt-24">{children}</main>
    </div>
  );
};

export default Layout;
