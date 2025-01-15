"use client";

import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart as LineChartsUI,
  XAxis,
} from "recharts";

import { Card, CardBody, CardHeader, CardTitle } from "@stacklok/ui-kit-mono";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertConversation } from "@/api/generated/types.gen";

const aggregateAlertsByDate = (alerts: { timestamp: string }[]) => {
  const dateMap: Record<string, { date: string; alerts: number }> = {};

  alerts
    .sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
    )
    .reduce((acc, alert) => {
      const timestamp = new Date(alert.timestamp);
      const formattedDate = timestamp.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
      });

      if (!acc[formattedDate]) {
        acc[formattedDate] = { date: formattedDate, alerts: 0 };
      }
      (acc[formattedDate] as { alerts: number }).alerts += 1;

      return acc;
    }, dateMap);

  return Object.values(dateMap);
};

const chartConfig = {
  alerts: {
    label: "Alerts",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function LineChart({
  data,
  loading,
}: {
  data: AlertConversation[];
  loading: boolean;
}) {
  const chartData = aggregateAlertsByDate(data);

  if (loading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Alerts by date</CardTitle>
        </CardHeader>
        <CardBody>
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex w-full items-center justify-around mb-4"
            >
              <Skeleton key={index} className="w-full h-3" />
            </div>
          ))}
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="h-full" data-testid="linechart">
      <CardHeader>
        <CardTitle>Alerts by date</CardTitle>
      </CardHeader>
      <CardBody>
        <ChartContainer config={chartConfig} className="min-h-[10rem]">
          <LineChartsUI
            accessibilityLayer
            data={chartData}
            height={300}
            width={500}
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
      </CardBody>
    </Card>
  );
}
