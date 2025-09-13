import { Header } from "@/components/Header";
import { StationMap } from "@/components/StationMap";
import { AdvisoryFeed } from "@/components/AdvisoryFeed";
import { KPICards } from "@/components/KPICards";
import { Timeline } from "@/components/Timeline";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <Header />
      
      {/* Main Content Grid */}
      <div className="flex-1 grid grid-cols-12 gap-4 p-4 h-[calc(100vh-4rem)]">
        {/* Left: Station Map */}
        <div className="col-span-5">
          <StationMap />
        </div>
        
        {/* Right: Advisories & KPIs */}
        <div className="col-span-7 flex flex-col gap-4">
          {/* Advisory Feed */}
          <div className="flex-1">
            <AdvisoryFeed />
          </div>
          
          {/* KPI Cards */}
          <div className="h-32">
            <KPICards />
          </div>
        </div>
        
        {/* Bottom: Timeline (spans full width) */}
        <div className="col-span-12 h-40">
          <Timeline />
        </div>
      </div>
    </div>
  );
};

export default Index;