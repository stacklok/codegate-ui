import * as React from "react";
import { Label, Pie, PieChart as PieChartUI } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { MaliciousPkgType } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

const generateTypeColors = (data: MaliciousPkgType[]) => {
  const uniqueTypes = Array.from(new Set(data.map((pkg) => pkg.type)));
  return uniqueTypes.reduce<Record<string, string>>((acc, type, index) => {
    acc[type] = `hsl(var(--chart-${index + 1}))`;
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
    fill: typeColors[type] || "hsl(var(--chart-default))",
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
        <CardContent className="flex justify-center">
          <div className="w-[220px] h-[220px] flex justify-center">
            <Skeleton className="h-40 w-40 rounded-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card className="h-full" data-testid="malicious-piechart">
        <CardHeader>
          <CardTitle>Malicious packages by type</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="bg-gray-100 rounded-full flex items-center justify-center h-40 w-40 font-bold text-lg">
            N/A
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full" data-testid="malicious-piechart">
      <CardHeader className="items-center pb-0">
        <CardTitle>Malicious packages by type</CardTitle>
      </CardHeader>
      <CardContent className="mt-[-1em]">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[240px]"
        >
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
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalMalicious}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Packages
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChartUI>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
