"use client";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  Label,
  Tooltip,
  YAxis,
  LabelList,
  AreaChart,
  CartesianGrid,
  Area,
} from "recharts";
import Loader from "../../Loader/Loader";
import { useGetCoursesAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import React, { FC } from "react";


type Props = {  
  isDashBoard?:boolean
};

const CourseAnalytics:FC<Props> = () => {
  const { data, isLoading, error } = useGetCoursesAnalyticsQuery({});
  // console.log(data);

  const minValue = 0;
  const anaylyticsData: any = [];

  data &&
    data.courses.last12Months.forEach((item: any) => {
      anaylyticsData.push({ name: item.month, uv: item.count });
    });

  return (
    <>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <div className="h-[100%] w-[100%]">
          <div className="mt-[50px]">
            <h1 className="px-5 text-start font-extrabold text-xl flex items-center justify-center">Courses analytics</h1>
            <p className="px-5 flex items-center justify-center">Last 12 months analytics data </p>
          </div>
          <div className="w-full h-[90%] flex items-center justify-center">
            <ResponsiveContainer width="70%" height="70%">
              <AreaChart
                width={500}
                height={400}
                data={anaylyticsData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseAnalytics;
