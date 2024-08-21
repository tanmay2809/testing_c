
import { Chart } from "react-google-charts";

export const data = [
  [".", ""],
  ["😐  ", 1000],
  ["😍  ", 1170],
  ["😊  ", 660],
  ["😍  ", 1030],
  ["😍  ",456]
];

export const options = {
  chart: {
    title: "-",
    subtitle: "",
    
  },
  colors: ["#FFC700"], 
 
  
};

export function Barchart1() {
  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="350px"
      data={data}
      options={options}
    />
  );
}
