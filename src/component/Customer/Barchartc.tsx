


import { Chart, GoogleChartOptions } from "react-google-charts";

interface BarChartcProps {
  dailyVisits: { [key: string]: number };
}

export const BarChartc: React.FC<BarChartcProps> = ({ dailyVisits }) => {
  // Explicitly define the type for data
  const data: (string | number)[][] = [["Date", ""]];

  const sortedDates = Object.keys(dailyVisits).sort((a, b) => {
    const dateA = new Date(a).getTime();
    const dateB = new Date(b).getTime();
    return dateA - dateB;
  });

  sortedDates.forEach((date) => {
    data.push([date, dailyVisits[date]]);
  });

  const options: GoogleChartOptions = {
    title: "",
    is3D: false,
    colors: ["#004AAD"],
    backgroundColor: "#F1F7FF",
    chartArea: {
      backgroundColor: "#F1F7FF",
    },
  };

  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="300px"
      data={data}
      options={options}
    />
  );
};