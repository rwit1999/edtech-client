'use client'
import React, { FC, useState } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import { Header } from "../components/Header";
import Profile from "../components/Profile/Profile";
import Footer from "../components/Footer/Footer";

type Props = {};

const Page:FC<Props> = (props: Props) => {
    const [open,setOpen]=useState(false)
    const [activeItem,setActiveItem]=useState(0)
    const [route,setRoute]=useState("Login")

  return (
    <div>
      <Protected>
        <Header
          open={open} // for modal open or not
          activeItem={activeItem} // the item in navitem which is currently clicked
          setOpen={setOpen}
          setRoute={setRoute}
          route={route}
        />
        <Profile/>
        <Footer/>
      </Protected>
    </div>
  );
};

export default Page;
