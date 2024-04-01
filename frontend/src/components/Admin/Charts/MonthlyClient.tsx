import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { IStats } from "../../../interfaces/Dashboard";

interface IProps {
  data?: IStats;
}

export default function MonthlyClients(props: IProps) {
  const { data } = props;
  const currentYear = new Date().getFullYear();

  const totalCount: number[] = [];

  const totalMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  totalMonths.forEach((month) => {
    totalCount.push(data?.monthlyclientCounts[currentYear][month] || 0);
  });

  const options = {
    chart: {
      type: "column",
      marginTop: 100,
    },
    title: {
      text: "Monthly Gained Clients",
      align: "left",
    },
    subtitle: {
        text: `For the year ${currentYear}`,
        align: "left",
    },
    xAxis: {
      categories: totalMonths,
      crosshair: true,
      accessibility: {
        description: "Months",
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Number Of Users",
      },
    },
    tooltip: {
      valueSuffix: " Users",
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "Month",
        data: totalCount,
      },
    ],
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
