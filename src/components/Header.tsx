import { Play, Pause, SkipForward, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export const Header = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [simSpeed, setSimSpeed] = useState(1);

  const togglePlayPause = () => setIsPlaying(!isPlaying);
  
  const cycleSpeed = () => {
    setSimSpeed(prev => prev >= 4 ? 0.5 : prev * 2);
  };

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      {/* App Branding */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
          <div className="w-4 h-4 bg-primary-foreground rounded-sm"></div>
        </div>
        <h1 className="text-xl font-semibold text-foreground">TrainOps Control</h1>
      </div>

      {/* Simulation Controls */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={togglePlayPause}
            className="w-9 h-9 p-0"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={cycleSpeed}
            className="w-9 h-9 p-0"
          >
            <SkipForward className="h-4 w-4" />
          </Button>
          
          <Badge variant="secondary" className="ml-2">
            {simSpeed}x
          </Badge>
        </div>

        <div className="h-6 w-px bg-border"></div>

        <div className="text-sm text-muted-foreground">
          Sim Time: <span className="text-foreground font-mono">14:23:45</span>
        </div>
      </div>

      {/* User Avatar */}
      <Avatar className="h-8 w-8">
        <AvatarFallback className="bg-primary text-primary-foreground">
          <User className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
    </header>
  );
};