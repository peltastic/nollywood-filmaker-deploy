import React from "react";
import { BarChart, BarChartType } from "@mantine/charts";

type data<T, K extends keyof T> = {
  [P in K]: T[P];
};

type Props = {
  chart_data: any[];
  chart_series: {
    name: string;
    color?: string;
  }[];
  type?: BarChartType
  noradius?: boolean
};

const Bar = (props: Props) => {
  return (
    <BarChart
      h={300}
      data={props.chart_data}
      // unit="$"
      type={props.type}
      dataKey="month"
      barProps={{ radius:props.noradius ? 0 : 8 }}
      valueFormatter={(value) =>
        `$${new Intl.NumberFormat("en-US").format(value)}`
      }
      series={props.chart_series}
    />
  );
};

export default Bar;
