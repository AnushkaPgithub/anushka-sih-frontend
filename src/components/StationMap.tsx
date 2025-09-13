import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface Station {
  id: string;
  name: string;
  type: 'regular' | 'junction';
  platforms: number;
  position: number; // 0-100 for vertical position
}

interface Train {
  id: string;
  name: string;
  status: 'ontime' | 'delayed';
  position: number; // 0-100 for vertical position
  delay: number; // minutes
  nextStation: string;
  eta: string;
}

const stations: Station[] = [
  { id: "CST", name: "Mumbai CST", type: "junction", platforms: 18, position: 5 },
  { id: "MAT", name: "Matunga", type: "regular", platforms: 4, position: 15 },
  { id: "DAD", name: "Dadar", type: "junction", platforms: 8, position: 25 },
  { id: "KRL", name: "Kurla", type: "regular", platforms: 6, position: 35 },
  { id: "THN", name: "Thane", type: "junction", platforms: 12, position: 50 },
  { id: "KLP", name: "Kalyan", type: "junction", platforms: 10, position: 65 },
  { id: "ULH", name: "Ulhasnagar", type: "regular", platforms: 4, position: 75 },
  { id: "AMB", name: "Ambernath", type: "regular", platforms: 3, position: 85 },
  { id: "KSR", name: "Kasara", type: "regular", platforms: 2, position: 95 },
];

const trains: Train[] = [
  { id: "T001", name: "Fast 001", status: "ontime", position: 12, delay: 0, nextStation: "MAT", eta: "14:25" },
  { id: "T002", name: "Local 002", status: "delayed", position: 28, delay: 3, nextStation: "KRL", eta: "14:31" },
  { id: "T003", name: "Fast 003", status: "ontime", position: 42, delay: 0, nextStation: "THN", eta: "14:28" },
  { id: "T004", name: "Local 004", status: "delayed", position: 68, delay: 7, nextStation: "ULH", eta: "14:35" },
  { id: "T005", name: "Express 005", status: "ontime", position: 82, delay: 0, nextStation: "AMB", eta: "14:33" },
];

export const StationMap = () => {
  const [hoveredTrain, setHoveredTrain] = useState<string | null>(null);
  const [hoveredStation, setHoveredStation] = useState<string | null>(null);

  return (
    <Card className="h-full bg-gradient-surface">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Station Map - Central Line</CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-4rem)] relative">
        {/* Main Railway Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-border transform -translate-x-0.5"></div>
        
        {/* Stations */}
        {stations.map((station) => (
          <div
            key={station.id}
            className="absolute left-1/2 transform -translate-x-1/2"
            style={{ top: `${station.position}%` }}
            onMouseEnter={() => setHoveredStation(station.id)}
            onMouseLeave={() => setHoveredStation(null)}
          >
            {/* Station Icon */}
            <div className={`
              w-4 h-4 border-2 transform -translate-x-1/2 transition-all duration-200
              ${station.type === 'junction' 
                ? 'rotate-45 bg-station-junction border-station-junction' 
                : 'rounded-full bg-station-regular border-station-regular'
              }
              ${hoveredStation === station.id ? 'scale-125' : ''}
            `}></div>
            
            {/* Station Label */}
            <div className="absolute left-6 top-1/2 transform -translate-y-1/2 whitespace-nowrap">
              <div className="text-xs font-medium text-foreground">{station.name}</div>
              <div className="text-xs text-muted-foreground">{station.platforms} platforms</div>
            </div>
            
            {/* Hover Details */}
            {hoveredStation === station.id && (
              <div className="absolute left-32 top-1/2 transform -translate-y-1/2 z-10 animate-slide-in">
                <div className="bg-popover border border-border rounded-md p-2 shadow-lg">
                  <div className="text-xs font-medium">{station.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {station.type === 'junction' ? 'Junction' : 'Regular'} Station
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {station.platforms} platforms
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        
        {/* Trains */}
        {trains.map((train) => (
          <div
            key={train.id}
            className="absolute left-1/2 transform -translate-x-1/2"
            style={{ top: `${train.position}%` }}
            onMouseEnter={() => setHoveredTrain(train.id)}
            onMouseLeave={() => setHoveredTrain(null)}
          >
            {/* Train Marker */}
            <div className={`
              w-3 h-6 rounded-sm transform -translate-x-1/2 cursor-pointer
              transition-all duration-200 animate-train-move
              ${train.status === 'ontime' ? 'bg-train-ontime' : 'bg-train-delayed'}
              ${hoveredTrain === train.id ? 'scale-110' : ''}
            `}>
              <div className="w-1 h-1 bg-train-marker rounded-full mx-auto mt-1"></div>
            </div>
            
            {/* Train Hover Details */}
            {hoveredTrain === train.id && (
              <div className="absolute left-8 top-1/2 transform -translate-y-1/2 z-10 animate-slide-in">
                <div className="bg-popover border border-border rounded-md p-3 shadow-lg min-w-36">
                  <div className="text-sm font-medium">{train.name}</div>
                  <div className="text-xs text-muted-foreground mb-2">
                    Next: {train.nextStation} at {train.eta}
                  </div>
                  {train.delay > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      +{train.delay}m delayed
                    </Badge>
                  )}
                  {train.delay === 0 && (
                    <Badge variant="secondary" className="text-xs">
                      On time
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};