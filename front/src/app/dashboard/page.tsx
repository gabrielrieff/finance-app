'use client';

import Chart from 'react-google-charts';
import { ResumeFinance } from '~/components/ResumeFinance';

export default function dashboard() {
  return (
    <main className="flex min-w-screen flex-col items-center justify-center gap-[20px]">
      <ResumeFinance />
      <div className="max-w-[1120px] w-[95%] shadow-xl">
        <Chart
          chartType="LineChart"
          width="100%"
          height="400px"
          data={data}
          options={options}
        />
      </div>
    </main>
  );
}
const data = [
  ['Month', 'Sales'],
  ['Jan', 1000],
  ['Fev', 1170],
  ['Mar', 660],
  ['Abr', 1030]
];

const options = {
  title: 'Resumo Anual de gastos',
  curveType: 'function',
  legend: { position: 'bottom' }
};
