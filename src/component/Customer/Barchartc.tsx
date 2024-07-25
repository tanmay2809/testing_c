
import { Chart ,GoogleChartOptions} from "react-google-charts";


export const data = [
  ["month", "Sales"],
  ["1 jan", 1000],
  ["2 jan", 1170],
  ["3 jan", 660],
  ["4 jan", 1030],
  ["5 jan", 1000],
  ["6 jan", 1170],
  ["7 jan", 660],
  ["8 jan", 1030],
  ["9 jan", 1000],
  ["10 jan", 1170],
  ["11 jan", 660],
  ["12 jan", 1030],
  ["13 jan", 1000],
  ["14 jan", 1170],
  ["15 jan", 660],
  ["16 jan", 1030],
  ["17 jan", 1000],
  ["18 jan", 1170],
  ["19 jan", 660],
  ["20 jan", 1030],
  ["21 jan", 1000],
  ["22 jan", 1170],
  ["23 jan", 660],
  ["24 jan", 1030],
  ["25 jan", 660],
  ["26 jan", 1030],
  ["27 jan", 1000],
  ["28 jan", 1170],
  ["29 jan", 660],
  ["30 jan", 1030],
];

export const options: GoogleChartOptions = {
  title: "",
  is3D: false,
  colors: ['#004AAD'],
  backgroundColor: '#F1F7FF',
  chartArea: {
    backgroundColor: '#F1F7FF'
  }
};

export function BarChartc() {
  return (
    
      <Chart
        className=""
        chartType="Bar"
        width="108%"
        height="300px"
        data={data}
        options={options}
      />
    
  );
}
