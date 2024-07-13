import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  ChartData,
  ChartOptions,
} from "chart.js";

interface BarChartProps {
  data: ChartData<"bar">;
  options: ChartOptions<"bar">;
}

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

const BarChart: React.FC<BarChartProps> = (props) => {
  return (
    <div>
      <Bar data={props.data} options={props.options}></Bar>
    </div>
  );
};

export default BarChart;
