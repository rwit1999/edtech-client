import { useGetAllOrdersQuery } from '@/redux/features/orders/orderApi'
import React, { FC, useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { useGetAllUsersQuery } from '@/redux/features/user/userApi'
import { useGetAllCoursesQuery } from '@/redux/features/courses/coursesApi'
import { formatDistanceToNow } from 'date-fns'

type Props = {
  isDashboard?: boolean
}

const mockData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', title: 'Course 1', price: '$100', createdAt: '2023-01-01' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', title: 'Course 2', price: '$200', createdAt: '2023-02-01' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com', title: 'Course 3', price: '$300', createdAt: '2023-03-01' },
  { id: 4, name: 'Bob Brown', email: 'bob@example.com', title: 'Course 4', price: '$400', createdAt: '2023-04-01' },
];

const AllInvoices: FC<Props> = ({ isDashboard }) => {
  const { theme, setTheme } = useTheme()
  const { isLoading, data } = useGetAllOrdersQuery({})
  const { data: usersData } = useGetAllUsersQuery({})
  const { data: coursesData } = useGetAllCoursesQuery({})

  const [orderData, setOrderData] = useState<any>([])

  useEffect(() => {
    if (data) {
      const temp = data.orders.map((item: any) => {
        const user = usersData?.users.find((user: any) => user._id === item.userId)
        const course = coursesData?.courses.find((course: any) => course._id === item.courseId)
        return {
          ...item,
          userName: user?.name,
          userEmail: user?.email,
          title: course?.name,
          price: "Rs " + course?.price,
          createdAt: formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })
        }
      })
      setOrderData(temp)
    }
  }, [data, usersData, coursesData])

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-6 gap-4 bg-gray-100 p-4 font-bold">
        <div>ID</div>
        <div>Name</div>
        {!isDashboard && (<div>Email</div>)}
        <div>Title</div>
        <div>Price</div>
        <div>Created At</div>
      </div>
       {/* {orderData.length > 0 ? orderData.map((item: any) => (
        <div key={item.id} className="grid grid-cols-6 gap-4 border-b p-4">
          <div>{item.id}</div>
          <div>{item.userName}</div>
          <div>{item.userEmail}</div>
          <div>{item.title}</div>
          <div>{item.price}</div>
          <div>{item.createdAt}</div>
        </div>
       ))
        } */}
      {
        mockData.map((item) => ( 
        <div key={item.id} className="grid grid-cols-6 gap-4 border-b p-4">
          <div>{item.id}</div>
          <div>{item.name}</div>
          {!isDashboard && (<div>{item.email}</div>)}
          <div>{item.title}</div>
          <div>{item.price}</div>
          <div>{formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}</div>
        </div>
      ))}
    </div>
  )
}

export default AllInvoices
