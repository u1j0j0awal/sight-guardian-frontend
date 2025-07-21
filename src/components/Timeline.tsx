import { useState } from "react";
import { Card } from "@/components/ui/card";

const Timeline = () => {
  const [currentTime, setCurrentTime] = useState(3.21); // 03:12:37 as decimal hours

  // Generate timeline markers for 24 hours
  const timeMarkers = Array.from({ length: 25 }, (_, i) => i);
  
  // Sample incidents for timeline
  const timelineIncidents = [
    { time: 2.5, type: "Unauthorised Access", color: "bg-warning" },
    { time: 6.2, type: "Face Recognised", color: "bg-primary" },
    { time: 9.8, type: "Gun Threat", color: "bg-destructive" },
    { time: 14.6, type: "Unauthorised Access", color: "bg-warning" },
    { time: 18.3, type: "Multiple Events", color: "bg-secondary" },
    { time: 21.1, type: "Unauthorised Access", color: "bg-warning" },
  ];

  const handleTimelineClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const newTime = (clickX / rect.width) * 24;
    setCurrentTime(newTime);
  };

  const formatTime = (hours: number) => {
    const h = Math.floor(hours);
    const m = Math.floor((hours - h) * 60);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="bg-timeline-bg border-border">
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-sm font-medium text-foreground mb-2">Camera List</h3>
          <div className="space-y-2">
            {["Camera - 01", "Camera - 02", "Camera - 03"].map((camera, index) => (
              <div key={camera} className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-sm text-foreground">{camera}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-4">
          {/* Time labels */}
          <div className="flex justify-between text-xs text-muted-foreground">
            {timeMarkers.map((hour) => (
              <div key={hour} className="text-center">
                {hour.toString().padStart(2, '0')}:00
              </div>
            ))}
          </div>

          {/* Timeline track */}
          <div 
            className="relative h-12 bg-muted/20 rounded-lg cursor-pointer"
            onClick={handleTimelineClick}
          >
            {/* Timeline background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-muted/30 via-muted/10 to-muted/30 rounded-lg"></div>
            
            {/* Hour markers */}
            {timeMarkers.map((hour) => (
              <div
                key={hour}
                className="absolute top-0 h-full w-px bg-border"
                style={{ left: `${(hour / 24) * 100}%` }}
              ></div>
            ))}

            {/* Incident markers */}
            {timelineIncidents.map((incident, index) => (
              <div
                key={index}
                className={`absolute top-1 w-2 h-2 rounded-full ${incident.color} cursor-pointer hover:scale-125 transition-transform`}
                style={{ left: `${(incident.time / 24) * 100}%` }}
                title={`${incident.type} at ${formatTime(incident.time)}`}
              ></div>
            ))}

            {/* Current time scrubber */}
            <div
              className="absolute top-0 w-1 h-full bg-timeline-accent rounded-full cursor-grab active:cursor-grabbing shadow-lg"
              style={{ left: `${(currentTime / 24) * 100}%` }}
            >
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-timeline-accent text-background text-xs px-2 py-1 rounded whitespace-nowrap">
                {formatTime(currentTime)}
              </div>
            </div>
          </div>

          {/* Current time display */}
          <div className="flex justify-center">
            <div className="bg-muted px-4 py-2 rounded-lg">
              <span className="text-sm font-mono text-foreground">
                Current: {formatTime(currentTime)} (15-Jun-2025)
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Timeline;