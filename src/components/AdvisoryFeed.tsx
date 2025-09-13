import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { useState } from "react";

interface Advisory {
  id: string;
  type: 'conflict' | 'delay' | 'maintenance' | 'info';
  title: string;
  description: string;
  rationale: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
  applied: boolean;
}

const advisories: Advisory[] = [
  {
    id: "A001",
    type: "conflict",
    title: "Platform conflict at Thane Junction",
    description: "Trains T003 and T006 scheduled for same platform",
    rationale: "Redirect T006 to Platform 3 to avoid 4-minute delay",
    timestamp: "14:23:12",
    priority: "high",
    applied: false
  },
  {
    id: "A002", 
    type: "delay",
    title: "Signal delay at Kurla",
    description: "Local 002 experiencing signal hold",
    rationale: "Fast 001 given priority, delay minimized to 3 minutes",
    timestamp: "14:22:45",
    priority: "medium",
    applied: false
  },
  {
    id: "A003",
    type: "maintenance",
    title: "Track maintenance window",
    description: "Scheduled maintenance at Kalyan-Ulhasnagar section",
    rationale: "Single line operation for 20 minutes during low traffic",
    timestamp: "14:20:33",
    priority: "low",
    applied: true
  },
  {
    id: "A004",
    type: "info",
    title: "Weather update",
    description: "Light rain expected in next 30 minutes",
    rationale: "Monitor braking distances, reduce speed if necessary",
    timestamp: "14:19:15",
    priority: "low",
    applied: false
  }
];

const getIconForType = (type: string) => {
  switch (type) {
    case 'conflict': return AlertTriangle;
    case 'delay': return Clock;
    case 'maintenance': return Info;
    default: return Info;
  }
};

const getVariantForPriority = (priority: string) => {
  switch (priority) {
    case 'high': return 'destructive';
    case 'medium': return 'default';
    default: return 'secondary';
  }
};

export const AdvisoryFeed = () => {
  const [advisoryList, setAdvisoryList] = useState(advisories);

  const applyAdvisory = (id: string) => {
    setAdvisoryList(prev => 
      prev.map(advisory => 
        advisory.id === id 
          ? { ...advisory, applied: true }
          : advisory
      )
    );
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse-soft"></div>
          Live Advisories
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-80 overflow-y-auto">
        {advisoryList.map((advisory) => {
          const Icon = getIconForType(advisory.type);
          
          return (
            <div
              key={advisory.id}
              className={`
                p-3 rounded-md border transition-all duration-200 animate-slide-in
                ${advisory.applied 
                  ? 'bg-success/10 border-success/20' 
                  : 'bg-card border-border hover:border-primary/50'
                }
              `}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <Icon className={`
                    h-4 w-4 mt-0.5 shrink-0
                    ${advisory.priority === 'high' ? 'text-destructive' : 
                      advisory.priority === 'medium' ? 'text-warning' : 'text-muted-foreground'}
                  `} />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-medium">{advisory.title}</h4>
                      <Badge 
                        variant={getVariantForPriority(advisory.priority) as any}
                        className="text-xs"
                      >
                        {advisory.priority}
                      </Badge>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-2">
                      {advisory.description}
                    </p>
                    
                    <p className="text-xs text-foreground/80 italic">
                      {advisory.rationale}
                    </p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground font-mono">
                        {advisory.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="shrink-0">
                  {advisory.applied ? (
                    <div className="flex items-center text-success text-xs gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Applied
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 px-2 text-xs"
                      onClick={() => applyAdvisory(advisory.id)}
                    >
                      Apply
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};