import Ratings from '@/app/utils/Ratings'
import Image from 'next/image'
import React, { FC } from 'react'

type Props = {
    item: any
}

const ReviewCard: FC<Props> = ({ item }) => {
    return (
        <div className="w-full h-max p-4 border border-gray-300 rounded-lg shadow-md bg-white">
            <div className="flex items-center space-x-4">
                <Image
                    alt={item.name}
                    src={item.avatar}
                    width={50}
                    height={50}
                    className="w-[50px] h-[50px] rounded-full object-cover"
                />
                <div className="flex flex-col">
                    <h5 className="text-lg font-semibold">{item.name}</h5>
                    <h6 className="text-sm text-gray-600">{item.comment}</h6>
                </div>
            </div>
            <div className="mt-2">
                <Ratings rating={item.ratings} />
            </div>
        </div>
    )
}

export default ReviewCard
