import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TimelineItem {
  id: string;
  trainName: string;
  plannedTime: string;
  actualTime: string;
  status: 'ontime' | 'delayed' | 'early' | 'conflict';
  delay: number; // minutes, negative for early
  station: string;
  platform?: string;
}

const timelineData: TimelineItem[] = [
  { id: "T001-1", trainName: "Fast 001", plannedTime: "14:20", actualTime: "14:20", status: "ontime", delay: 0, station: "DAD", platform: "2" },
  { id: "T001-2", trainName: "Fast 001", plannedTime: "14:25", actualTime: "14:25", status: "ontime", delay: 0, station: "MAT", platform: "1" },
  { id: "T002-1", trainName: "Local 002", plannedTime: "14:28", actualTime: "14:31", status: "delayed", delay: 3, station: "KRL", platform: "3" },
  { id: "T003-1", trainName: "Fast 003", plannedTime: "14:28", actualTime: "14:28", status: "conflict", delay: 0, station: "THN", platform: "1" },
  { id: "T006-1", trainName: "Local 006", plannedTime: "14:28", actualTime: "14:32", status: "conflict", delay: 4, station: "THN", platform: "3" },
  { id: "T004-1", trainName: "Local 004", plannedTime: "14:35", actualTime: "14:42", status: "delayed", delay: 7, station: "ULH", platform: "2" },
  { id: "T005-1", trainName: "Express 005", plannedTime: "14:33", actualTime: "14:33", status: "ontime", delay: 0, station: "AMB", platform: "1" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'ontime': return 'bg-success';
    case 'delayed': return 'bg-destructive';
    case 'early': return 'bg-primary';
    case 'conflict': return 'bg-warning';
    default: return 'bg-muted';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'ontime': return 'On Time';
    case 'delayed': return 'Delayed';
    case 'early': return 'Early';
    case 'conflict': return 'Conflict';
    default: return 'Unknown';
  }
};

export const Timeline = () => {
  const currentTime = "14:23";
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          Timeline - Planned vs Actual
          <div className="ml-auto text-xs text-muted-foreground font-mono">
            Current: {currentTime}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-4rem)]">
        <div className="relative h-full overflow-x-auto">
          {/* Time Grid */}
          <div className="flex items-center h-full min-w-full">
            {/* Time Scale */}
            <div className="absolute top-0 left-0 right-0 flex justify-between text-xs text-muted-foreground pb-2 border-b border-border">
              <span>14:15</span>
              <span>14:20</span>
              <span>14:25</span>
              <span>14:30</span>
              <span>14:35</span>
              <span>14:40</span>
              <span>14:45</span>
            </div>
            
            {/* Current Time Indicator */}
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-primary z-10"
              style={{ left: '26.7%' }} // Represents 14:23
            >
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rounded-full"></div>
            </div>
            
            {/* Timeline Items */}
            <div className="pt-8 pb-4 w-full">
              {timelineData.map((item, index) => {
                // Calculate position based on time (14:15 = 0%, 14:45 = 100%)
                const plannedMinutes = parseInt(item.plannedTime.split(':')[1]) + (parseInt(item.plannedTime.split(':')[0]) - 14) * 60;
                const actualMinutes = parseInt(item.actualTime.split(':')[1]) + (parseInt(item.actualTime.split(':')[0]) - 14) * 60;
                const plannedPos = ((plannedMinutes + 15) / 30) * 100; // +15 to offset from 14:15
                const actualPos = ((actualMinutes + 15) / 30) * 100;
                
                return (
                  <div 
                    key={item.id}
                    className="relative mb-6"
                    style={{ top: `${index * 16}px` }}
                  >
                    {/* Planned Time (faint) */}
                    <div 
                      className="absolute h-3 bg-muted/50 rounded-sm flex items-center px-2 transform -translate-y-1/2"
                      style={{ 
                        left: `${Math.max(0, plannedPos - 8)}%`,
                        width: '16%',
                        top: '50%'
                      }}
                    >
                      <span className="text-xs text-muted-foreground truncate">
                        {item.trainName} → {item.station}
                      </span>
                    </div>
                    
                    {/* Actual Time (bold) */}
                    <div 
                      className={`
                        absolute h-4 rounded-sm flex items-center px-2 transform -translate-y-1/2 z-10
                        ${getStatusColor(item.status)} shadow-sm
                      `}
                      style={{ 
                        left: `${Math.max(0, actualPos - 8)}%`,
                        width: '16%',
                        top: '50%'
                      }}
                    >
                      <span className="text-xs text-white font-medium truncate">
                        {item.trainName}
                      </span>
                      
                      {item.platform && (
                        <Badge variant="secondary" className="ml-auto text-xs h-4 px-1">
                          P{item.platform}
                        </Badge>
                      )}
                    </div>
                    
                    {/* Conflict Highlight */}
                    {item.status === 'conflict' && (
                      <div 
                        className="absolute h-6 bg-warning/20 border border-warning/50 rounded-md transform -translate-y-1/2"
                        style={{ 
                          left: `${Math.max(0, actualPos - 10)}%`,
                          width: '20%',
                          top: '50%'
                        }}
                      ></div>
                    )}
                    
                    {/* Status info */}
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {item.station}
                      </span>
                      {item.delay !== 0 && (
                        <Badge 
                          variant={item.delay > 0 ? "destructive" : "secondary"}
                          className="text-xs"
                        >
                          {item.delay > 0 ? '+' : ''}{item.delay}m
                        </Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};