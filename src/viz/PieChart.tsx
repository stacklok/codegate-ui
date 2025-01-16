import * as React from "react";
import { Label, Pie, PieChart as PieChartUI } from "recharts";

import { Card, CardBody, CardHeader, CardTitle } from "@stacklok/ui-kit";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { MaliciousPkgType } from "@/types";
import { Skeleton } from "@stacklok/ui-kit";

const COLORS = [
  "var(--brand-700)",
  "var(--brand-800)",
  "var(--brand-900)",
  "var(--brand-950)",
] as const;

const generateTypeColors = (data: MaliciousPkgType[]) => {
  const uniqueTypes = Array.from(new Set(data.map((pkg) => pkg.type)));
  return uniqueTypes.reduce<Record<string, string>>((acc, type, index) => {
    const colorIndex = index > COLORS.length - 1 ? COLORS.length - 1 : index;
    acc[type] = COLORS[colorIndex] as string;
    return acc;
  }, {});
};

const getChartData = (
  data: MaliciousPkgType[],
  typeColors: Record<string, string>,
) => {
  const typeCounts: Record<string, number> = {};
  data.forEach((pkg) => {
    typeCounts[pkg.type] = (typeCounts[pkg.type] || 0) + 1;
  });

  return Object.entries(typeCounts).map(([type, count]) => ({
    name: type,
    value: count,
    fill: typeColors[type] || "hsl(var(--brand-700))",
  }));
};

const getChartConfig = (typeColors: Record<string, string>) => {
  const config: ChartConfig = {};
  Object.entries(typeColors).forEach(([type, color]) => {
    config[type] = {
      label: type.charAt(0).toUpperCase() + type.slice(1),
      color,
    };
  });
  return config;
};

type PieChartProps = {
  data: MaliciousPkgType[];
  loading: boolean;
};

export function PieChart({ data, loading }: PieChartProps) {
  const typeColors = React.useMemo(() => generateTypeColors(data), [data]);
  const chartConfig = React.useMemo(
    () => getChartConfig(typeColors),
    [typeColors],
  );
  const chartData = React.useMemo(
    () => getChartData(data, typeColors),
    [data, typeColors],
  );
  const totalMalicious = React.useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.value, 0),
    [chartData],
  );

  if (loading) {
    return (
      <Card className="h-full" data-testid="malicious-piechart">
        <CardHeader>
          <CardTitle>Malicious packages by type</CardTitle>
        </CardHeader>
        <CardBody className="flex justify-center">
          <div className="flex justify-center text-sm">
            <Skeleton className="size-40 rounded-full" />
          </div>
        </CardBody>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card className="h-full" data-testid="malicious-piechart">
        <CardHeader>
          <CardTitle>Malicious packages by type</CardTitle>
        </CardHeader>
        <CardBody className="flex justify-center">
          <div className="bg-gray-100 rounded-full flex items-center justify-center size-40 font-bold text-lg">
            N/A
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="h-full" data-testid="malicious-piechart">
      <CardHeader className="items-center">
        <CardTitle>Malicious packages by type</CardTitle>
      </CardHeader>
      <CardBody>
        <ChartContainer config={chartConfig} className="mx-auto">
          <PieChartUI width={400} height={300}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={80}
              strokeWidth={5}
              fill="red"
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-gray-900 text-3xl font-bold"
                        >
                          {totalMalicious}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-gray-900"
                        >
                          {totalMalicious > 1 ? "packages" : "package"}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChartUI>
        </ChartContainer>
      </CardBody>
    </Card>
  );
}
