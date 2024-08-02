'use client'
import React, { useState } from 'react'
import { Header } from '../components/Header'
import About from '../components/About/About'

type Props = {}

const Page = (props: Props) => {
    const [open,setOpen]=useState(false)
    const [activeItem,setActiveItem]=useState(5)
    const [route,setRoute]=useState("login")

  return (
    <div>
        <Header
            open={open}
            setOpen={setOpen}
            route={route}
            setRoute={setRoute}
            activeItem={activeItem}
        />
        <About/>
    </div>
  )
}

export default Page