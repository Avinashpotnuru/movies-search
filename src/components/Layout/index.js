import React from "react";
import Navbar from "../Navbar";

//  import components

const Layout = ({ children }) => {
  return (
    <div className="  h-screen w-full  ">
      <Navbar />

      <main className="pt-[80px]">{children}</main>
    </div>
  );
};

export default Layout;
