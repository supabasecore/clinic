import React from "react";
import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { DiaryQuery } from "@/gen/gql";

type Props = {
  data: DiaryQuery;
};

const chartConfig = {
  count: {
    label: "Cantidad",
  },
  status: {
    label: "Estado",
    color: "hsl(var(--chart-1))",
  },
  service: {
    label: "Servicio",
    color: "hsl(var(--chart-2))",
  },
};

// Objeto de mapeo para los estados
const statusMapping = {
  PENDING: "Pend",
  CANCEL: "Susp",
  PROCESSED: "En Curso",
  ATTENDED: "Final",
};

export default function DiaryStatistic(
  { data }: Props = { data: { diary: [] } }
) {
  const statusStats = React.useMemo(() => {
    const stats = {
      Pend: 0,
      Susp: 0,
      "En Curso": 0,
      Final: 0,
    };
    data.diary?.forEach((entry) => {
      const spanishStatus =
        statusMapping[entry.status as keyof typeof statusMapping];
      if (spanishStatus in stats) {
        stats[spanishStatus as keyof typeof stats]++;
      }
    });
    return Object.entries(stats).map(([status, count]) => ({ status, count }));
  }, [data]);

  const serviceStats = React.useMemo(() => {
    const stats: Record<string, number> = {};
    data.diary?.forEach((entry) => {
      const serviceTitle = entry.service.title;
      stats[serviceTitle] = (stats[serviceTitle] || 0) + 1;
    });
    return Object.entries(stats).map(([title, count]) => ({ title, count }));
  }, [data]);

  const totalAppointments = React.useMemo(() => {
    return data.diary?.length || 0;
  }, [data]);
  return (
    <div className="d-flex fd-column text-left">
      <div className="flex--item">
        <CardHeader className="items-center">
          <CardTitle>Servicios Solicitados</CardTitle>
          <CardDescription>
            Mostrando la distribución de servicios
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-0">
          <ChartContainer config={chartConfig} className="h-[120px]">
            <RadarChart data={serviceStats}>
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <PolarAngleAxis dataKey="title" />
              <PolarGrid />
              <Radar
                dataKey="count"
                fill="var(--color-service)"
                fillOpacity={0.6}
                dot={{
                  r: 4,
                  fillOpacity: 1,
                }}
              />
            </RadarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            Total de Citas: {totalAppointments}
          </div>
          <div className="flex items-center gap-2 leading-none text-muted-foreground">
            Enero - Junio 2024
          </div>
        </CardFooter>
      </div>
      <div className="flex--item">
        <CardHeader>
          <CardTitle>Estado de Citas</CardTitle>
          <CardDescription>Enero - Junio 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[120px]">
            <BarChart
              data={statusStats}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="status"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="count" fill="var(--color-status)" radius={8}>
                <LabelList
                  dataKey="count"
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Tendencia al alza del 5.2% este mes{" "}
            <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Mostrando el total de citas por estado
          </div>
        </CardFooter>
      </div>
    </div>
  );
}
