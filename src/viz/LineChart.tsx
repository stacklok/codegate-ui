"use client";

import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart as LineChartsUI,
  XAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Alert } from "@/types";

const aggregateAlertsByDate = (alerts: { timestamp: string }[]) => {
  const dateMap: Record<string, { date: string; alerts: number }> = {};

  alerts.reduce((acc, alert) => {
    const timestamp = new Date(alert.timestamp);
    const formattedDate = timestamp.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    });

    if (!acc[formattedDate]) {
      acc[formattedDate] = { date: formattedDate, alerts: 0 };
    }
    acc[formattedDate].alerts += 1;

    return acc;
  }, dateMap);

  return Object.values(dateMap).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
};

const chartConfig = {
  alerts: {
    label: "Alerts",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function LineChart({ alerts }: { alerts: Alert[] }) {
  const chartData = aggregateAlertsByDate(alerts);
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Alerts by date</CardTitle>
      </CardHeader>
      <CardContent className="h-full">
        <ChartContainer config={chartConfig}>
          <LineChartsUI
            accessibilityLayer
            data={chartData}
            height={300}
            margin={{
              top: 20,
              left: 12,
              right: 12,
              bottom: 40,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              angle={-90}
              textAnchor="end"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="alerts"
              type="natural"
              stroke="var(--color-alerts)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-alerts)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChartsUI>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
