import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KPI {
  id: string;
  label: string;
  value: string;
  unit: string;
  trend: 'up' | 'down' | 'neutral';
  change: string;
  target?: string;
}

const kpis: KPI[] = [
  {
    id: "platform-util",
    label: "Platform Utilization",
    value: "78",
    unit: "%",
    trend: "up",
    change: "+2.3%",
    target: "85%"
  },
  {
    id: "ontime-perf",
    label: "On-time Performance",
    value: "94.2",
    unit: "%",
    trend: "down",
    change: "-1.1%",
    target: "95%"
  },
  {
    id: "conflicts",
    label: "Conflict Resolutions",
    value: "12",
    unit: "",
    trend: "neutral",
    change: "0",
    target: "<15"
  },
  {
    id: "passenger-impact",
    label: "Passenger Impact",
    value: "2.4",
    unit: "k",
    trend: "down",
    change: "-0.8k",
    target: "<3k"
  }
];

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'up': return TrendingUp;
    case 'down': return TrendingDown;
    default: return Minus;
  }
};

const getTrendColor = (trend: string, isGoodTrend: boolean) => {
  if (trend === 'neutral') return 'text-muted-foreground';
  
  const isPositive = (trend === 'up' && isGoodTrend) || (trend === 'down' && !isGoodTrend);
  return isPositive ? 'text-success' : 'text-destructive';
};

export const KPICards = () => {
  return (
    <div className="grid grid-cols-4 gap-4 h-full">
      {kpis.map((kpi) => {
        const TrendIcon = getTrendIcon(kpi.trend);
        // Platform util and on-time perf: up is good, conflicts and passenger impact: down is good
        const isGoodTrend = kpi.id === 'platform-util' || kpi.id === 'ontime-perf';
        const trendColor = getTrendColor(kpi.trend, isGoodTrend);
        
        return (
          <Card key={kpi.id} className="bg-gradient-surface hover:bg-accent/50 transition-colors duration-200">
            <CardContent className="p-4 h-full flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-1">{kpi.label}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-foreground">{kpi.value}</span>
                    <span className="text-sm text-muted-foreground">{kpi.unit}</span>
                  </div>
                </div>
                
                <div className={`flex items-center gap-1 ${trendColor}`}>
                  <TrendIcon className="h-3 w-3" />
                  <span className="text-xs font-medium">{kpi.change}</span>
                </div>
              </div>
              
              {kpi.target && (
                <div className="text-xs text-muted-foreground pt-2 border-t border-border/50">
                  Target: {kpi.target}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};