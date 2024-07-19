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
        backgroundColor: ['#004AAD', '#A4CBFF'],
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
    <div className='w-full h-[300px]  flex  justify-center  relative' >
      <Doughnut data={data} options={options} className=' w-[250px]  ' />
      <div 
        style={{
          position: 'absolute',
          top: '55%',
          left: '55%',
          transform: 'translate(-50%, -50%)',
          fontSize: '50px',
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