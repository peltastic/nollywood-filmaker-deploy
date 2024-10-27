import { AreaChart, AreaChartSeries, LineChart } from "@mantine/charts";
import React from "react";

type Props = {
  line_data: any[];
  line_series: AreaChartSeries[]
};

const Area = (props: Props) => {
  return (
    <AreaChart
    h={300}
      data={props.line_data}
      series={props.line_series}
      dataKey="month"
      withYAxis={false}
      curveType="natural"
      valueFormatter={(value) => `₦ ${new Intl.NumberFormat('en-US').format(value)}`}
    //   gridAxis="none"
    strokeDasharray="15 1"
    // unit=" ₦"
    />
  );
};

export default Area;
