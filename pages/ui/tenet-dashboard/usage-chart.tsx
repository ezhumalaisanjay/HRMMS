"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { day: "Monday", api_calls: 186, data_storage: 80, active_users: 15, },
  { day: "Tuesday", api_calls: 305, data_storage: 200, active_users: 35, },
  { day: "Wednesday", api_calls: 237, data_storage: 120, active_users: 111, },
  { day: "Thursday", api_calls: 73, data_storage: 190, active_users: 80, },
  { day: "Friday", api_calls: 209, data_storage: 130, active_users: 121, },
  { day: "Saturday", api_calls: 214, data_storage: 140, active_users: 90, },
]

const chartConfig = {
  api_calls: {
    label: "API Calls",
    color: "hsl(var(--chart-1))",
  },
  data_storage: {
    label: "Data Storage",
    color: "hsl(var(--chart-2))",
  },
  active_users: {
    label: "Active Users",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export default function UsageChart() {
  return (
    <div>
      <div>
        <ChartContainer config={chartConfig} >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: -25,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="api_calls"
              type="monotone"
              stroke="var(--color-api_calls)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="data_storage"
              type="monotone"
              stroke="var(--color-data_storage)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="active_users"
              type="monotone"
              stroke="var(--color-active_users)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  )
}
