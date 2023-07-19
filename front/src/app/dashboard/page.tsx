/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { useContext } from 'react';
import { Chart } from 'react-google-charts';
import { ResumeFinance } from '~/components/ResumeFinance';
import { AuthContext } from '~/context/auth/AuthContext';
import { transformArrayToChartData } from './transformArrayToChartData';

export default function dashboard() {
  const { allAccount } = useContext(AuthContext);
  const chartData = transformArrayToChartData(allAccount);

  return (
    <div className="flex min-w-screen flex-col items-center justify-center gap-[20px]">
      <ResumeFinance />
      <div className="max-w-[1120px] w-[95%] shadow-xl p-5 mb-14">
        <Chart
          chartType="LineChart"
          width="100%"
          height="400px"
          className=""
          data={chartData}
          options={options}
        />
      </div>
    </div>
  );
}

const options = {
  curveType: 'function',
  hAxis: {
    title: 'Month'
  },
  vAxis: {
    format: 'currency',
    formatOptions: {
      prefix: 'R',
      fractionDigits: 0
    },
    title: 'Sales',
    minValue: 0
  },
  chartArea: {
    width: '80%',
    height: '70%'
  }
};
