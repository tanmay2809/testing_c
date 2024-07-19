// SemiCircleProgress.tsx

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

interface SemiCircleProgressProps {
  percentage: number;
}

const Chart1: React.FC<SemiCircleProgressProps> = ({ percentage }) => {
  const data = {
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: ['#FF9F40', '#E0E0E0'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    rotation: -90,
    circumference: 180,
    cutout: '70%',
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className='w-full h-[250px]  flex  justify-center  relative' >
      <Doughnut data={data} options={options} className=' w-[200px]  left-0' />
      <div 
        style={{
          position: 'absolute',
          top: '52%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '40px',
          fontWeight: 'bold',
          color: '#FF9F40',
        }}
      >
        {percentage}%
      </div>
    </div>
  );
};

export default Chart1;