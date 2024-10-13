import React from "react";
import { BarChart } from "@mantine/charts";

type data<T, K extends keyof T> = {
  [P in K]: T[P];
};

type Props = {
  chart_data: any[];
  chart_series: {
    name: string;
    color?: string;
  }[];
};

const Bar = (props: Props) => {
  return (
    <BarChart
      h={300}
      data={props.chart_data}
      dataKey="month"
      unit="$"
      barProps={{ radius: 8 }}
      valueFormatter={(value) => new Intl.NumberFormat("en-US").format(value)}
      series={props.chart_series}
    />
  );
};

export default Bar;
