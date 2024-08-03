
import { Chart, GoogleChartOptions } from "react-google-charts";

interface ChartProps {
  male: number;
  female: number;
  other: number;
}

export const options: GoogleChartOptions = {
  title: "",
  pieHole: 0.5,
  is3D: false,
  colors: ['#34C759','#F9AB35','#F93535'],
  backgroundColor: '',
};

export default function Charts({ male = 0, female = 0, other = 0 }: ChartProps) {
  const data = [
    ["Gender", "Count"],
    ["Female", female],
    ["Male", male],
    ["Other", other],
  ];

  return (
    <Chart
      className=""
      chartType="PieChart"
      width="1500px"
      height="450px"
      data={data}
      options={options}
    />
  );
}
