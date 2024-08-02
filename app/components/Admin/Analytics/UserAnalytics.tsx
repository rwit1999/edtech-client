'use client'
import React from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Label, LabelList } from 'recharts';
import Loader from '../../Loader/Loader';
import { useGetUsersAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';

type Props = {
  isDashboard?: boolean;
};

const UserAnalytics: React.FC<Props> = ({ isDashboard }) => {
  const { data, isLoading, error } = useGetUsersAnalyticsQuery({});

  if (isLoading) {
    return <Loader />;
  }

  // Ensure data is available and has the expected structure
  if (!data || !data.users || !data.users.last12Months) {
    return <p>No data available</p>;
  }

  const analyticsData = data.users.last12Months.map((item: any) => ({
    name: item.month,
    uv: item.count,
  }));

  const minValue = 0;

  return (
    <div className="h-[90%] w-[80%]">
      <div className="mt-12 flex justify-center flex-col items-center mb-7">
        <h1 className="px-5 text-start text-xl font-extrabold">Users analytics</h1>
        <p className="px-5">Last 12 months analytics data</p>
      </div>
      <div className="w-full h-[100%] flex items-center justify-center">
        <ResponsiveContainer width="80%" height="80%">
          <BarChart data={analyticsData}>
            <XAxis dataKey="name">
              <Label offset={0} position="insideBottom" />
            </XAxis>
            <YAxis domain={[minValue, 'auto']} />
            <Bar dataKey="uv" fill="#3faf82">
              <LabelList dataKey="uv" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserAnalytics;
