"use client";
import {
  LineChart,
  ResponsiveContainer,
  XAxis,
  Tooltip,
  YAxis,
  CartesianGrid,
  Legend,
  Line,
} from "recharts";
import Loader from "../../Loader/Loader";
import React, { FC } from "react";
import { useGetOrdersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";

type Props = {
  isDashboard?: boolean;
};

const OrderAnalytics: FC<Props> = ({ isDashboard }) => {
  const { data, isLoading, error } = useGetOrdersAnalyticsQuery({});
  
  const minValue = 0;
  const anaylyticsData: any = [];

  data &&
    data.orders.last12Months.forEach((item: any) => {
      anaylyticsData.push({ name: item.month, uv: item.count });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={'h-[100%] w-[100%]'}>
          
          <div className='mt-12 flex justify-center flex-col items-center mb-6'>
            <h1 className='px-5 text-start text-xl font-extrabold'>
              Order analytics
            </h1>
            <p className='px-5 flex items-center justify-center'>
              Last 12 months analytics data{" "}
            </p>
          </div>

          <div className={`w-full ${isDashboard ? 'h-full' : 'h-[90%]'} flex items-center justify-center`}>
            <ResponsiveContainer width="80%" height="80%">
              <LineChart
                width={isDashboard ? 300 : 500}
                height={isDashboard ? 200 : 300}
                data={anaylyticsData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 55,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                {/* <Legend /> */}
                <Line
                  type="monotone"
                  dataKey="uv"
                  stroke="#01461b"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderAnalytics;
