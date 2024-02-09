"use client";

import { Card } from "@/components/ui/card";
import { formatNumberWithCommas } from "@/lib/functions";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
type Props = {
  data: {
    title: string;
    total: number;
  }[];
};
const Chart = ({ data }: Props) => {
  return (
    <Card>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis
            dataKey="title"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => formatNumberWithCommas(value) ?? ""}
          />
          <Bar dataKey="total" fill="#0369a1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default Chart;
