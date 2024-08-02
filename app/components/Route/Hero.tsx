import React, { FC, useState } from 'react';
import Image from 'next/image';
import { BiSearch } from 'react-icons/bi';
import { useRouter } from 'next/navigation';

type Props = {};

export const Hero: FC<Props> = (Props) => {

    const [search,setSearch]=useState("")
    const router=useRouter()

    const handleSearch=()=>{
        if(search==="")return
        router.push(`/courses?title=${search}`)
    }

    return (
        <div className="w-full flex flex-col lg:flex-row items-center bg-gray-100 dark:bg-gray-800 p-10">
            <div className="flex-1 space-y-4 lg:-mt-80 mt-10">
                <div>
                    <h1 className="text-2xl lg:text-4xl font-bold text-gray-800 dark:text-gray-100 text-center lg:text-left">
                        Learn new skills online with top educators
                    </h1>
                    <h3 className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 text-center lg:text-left">
                    Discover New Skills Online with Leading Educators
                    </h3>
                    <div className="mt-4 flex items-center justify-center lg:justify-start">
                        <input
                            type="search"
                            placeholder="What do you want to learn?"
                            value={search}
                            onChange={(e)=>setSearch(e.target.value)}
                            className="w-[80%] lg:w-[70%] p-3 border rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"
                        />
                        <button onClick={handleSearch} className="p-3 bg-blue-500 text-white rounded-r-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-blue-700 dark:hover:bg-blue-600">
                            <BiSearch size={24} />
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex-1 mt-10 lg:mt-0 ">
                <Image
                    src={require('../../../public/main.jpg')}
                    alt=""
                    className="w-full h-auto rounded-lg shadow-lg"
                />
            </div>
        </div>
    );
};

export default Hero;
