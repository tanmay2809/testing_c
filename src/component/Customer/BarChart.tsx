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
  width?: number;
  height?: number;
}

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

const BarChart: React.FC<BarChartProps> = (props) => {
  return (
    <div className=" w-full h-fit relative">
      <Bar className="w-full h-full absolute"
        data={props.data}
        options={props.options}
        width={props.width}
        height={props.height}
      ></Bar>
    </div>
  );
};

export default BarChart;
