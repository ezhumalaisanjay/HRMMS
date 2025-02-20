"use client"

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Dept1",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Dept2",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Dept3",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Dept4",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Dept5",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Dept6",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Dept7",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Dept8",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Dept9",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Dept10",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
]

const chartConfig = {
  name: {
    label: "Name",
    color: "#25632b"
  },
  total: {
    label: "Employees",
    color: "#25632b"
  }
} satisfies ChartConfig

export default function HeadCount() {
  return (
    <ChartContainer config={chartConfig} className="2xl:h-[600px] 2xl:w-full">
      <BarChart data={data}>
        <XAxis
          dataKey="name"
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
          tickFormatter={(value) => `${value}`}
        />
          <ChartTooltip content={<ChartTooltipContent />} />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ChartContainer>
  )
}