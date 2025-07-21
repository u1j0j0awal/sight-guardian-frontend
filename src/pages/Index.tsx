import Navbar from "@/components/Navbar";
import IncidentPlayer from "@/components/IncidentPlayer";
import IncidentList from "@/components/IncidentList";
import Timeline from "@/components/Timeline";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left side - Incident Player */}
          <div className="lg:col-span-2">
            <IncidentPlayer />
          </div>
          
          {/* Right side - Incident List */}
          <div className="lg:col-span-1">
            <IncidentList />
          </div>
        </div>
        
        {/* Bottom - Timeline (Optional scope) */}
        <Timeline />
      </div>
    </div>
  );
};

export default Index;
