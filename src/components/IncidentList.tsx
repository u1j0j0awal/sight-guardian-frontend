import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import mainFeedImage from "@/assets/cctv-main-feed.jpg";
import entranceFeedImage from "@/assets/cctv-entrance.jpg";
import vaultFeedImage from "@/assets/cctv-vault.jpg";

interface Incident {
  id: string;
  type: "Unauthorised Access" | "Gun Threat" | "Face Recognised" | "Traffic Congestion" | "Multiple Events";
  location: string;
  camera: string;
  startTime: string;
  endTime: string;
  timestamp: string;
  thumbnailUrl: string;
  resolved: boolean;
}

const IncidentList = () => {
  const { toast } = useToast();
  const [incidents, setIncidents] = useState<Incident[]>([
    {
      id: "1",
      type: "Unauthorised Access",
      location: "Shop Floor Camera A",
      camera: "Camera A",
      startTime: "14:35",
      endTime: "14:37",
      timestamp: "7-Jul-2025",
      thumbnailUrl: mainFeedImage,
      resolved: false,
    },
    {
      id: "2",
      type: "Gun Threat",
      location: "Shop Floor Camera A",
      camera: "Camera A",
      startTime: "14:35",
      endTime: "14:37",
      timestamp: "7-Jul-2025",
      thumbnailUrl: mainFeedImage,
      resolved: false,
    },
    {
      id: "3",
      type: "Unauthorised Access",
      location: "Shop Floor Camera A",
      camera: "Camera A",
      startTime: "14:35",
      endTime: "14:37",
      timestamp: "7-Jul-2025",
      thumbnailUrl: entranceFeedImage,
      resolved: false,
    },
    {
      id: "4",
      type: "Unauthorised Access",
      location: "Shop Floor Camera A",
      camera: "Camera A",
      startTime: "14:35",
      endTime: "14:37",
      timestamp: "7-Jul-2025",
      thumbnailUrl: vaultFeedImage,
      resolved: false,
    },
    {
      id: "5",
      type: "Face Recognised",
      location: "Entrance Camera",
      camera: "Camera B",
      startTime: "14:48",
      endTime: "14:49",
      timestamp: "7-Jul-2025",
      thumbnailUrl: entranceFeedImage,
      resolved: true,
    },
    {
      id: "6",
      type: "Multiple Events",
      location: "Various Cameras",
      camera: "Multiple",
      startTime: "15:20",
      endTime: "15:25",
      timestamp: "7-Jul-2025",
      thumbnailUrl: mainFeedImage,
      resolved: true,
    },
  ]);

  const getIncidentColor = (type: string) => {
    switch (type) {
      case "Unauthorised Access":
        return "bg-warning text-warning-foreground";
      case "Gun Threat":
        return "bg-destructive text-destructive-foreground";
      case "Face Recognised":
        return "bg-primary text-primary-foreground";
      case "Traffic Congestion":
        return "bg-accent text-accent-foreground";
      case "Multiple Events":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const handleResolve = (incidentId: string) => {
    setIncidents(prevIncidents =>
      prevIncidents.map(incident =>
        incident.id === incidentId
          ? { ...incident, resolved: true }
          : incident
      )
    );
    
    toast({
      title: "Incident Resolved",
      description: "The incident has been marked as resolved.",
    });
  };

  const unresolvedIncidents = incidents.filter(incident => !incident.resolved);
  const resolvedIncidents = incidents.filter(incident => incident.resolved);

  return (
    <div className="space-y-6">
      {/* Unresolved Incidents */}
      <Card className="bg-card border-border">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
              <div className="w-2 h-2 bg-destructive rounded-full"></div>
              <span>{unresolvedIncidents.length} Unresolved Incidents</span>
            </h3>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-accent" />
              <span>{resolvedIncidents.length} resolved incidents</span>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {unresolvedIncidents.map((incident) => (
            <div
              key={incident.id}
              className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              {/* Thumbnail */}
              <div className="w-16 h-12 rounded-md overflow-hidden flex-shrink-0">
                <img
                  src={incident.thumbnailUrl}
                  alt="Incident thumbnail"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Incident Details */}
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className={`text-xs ${getIncidentColor(incident.type)} mb-2`}>
                      {incident.type}
                    </Badge>
                    <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{incident.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{incident.startTime} - {incident.endTime} on {incident.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleResolve(incident.id)}
                    className="text-accent border-accent hover:bg-accent hover:text-accent-foreground"
                  >
                    Resolve
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Resolved Incidents (Collapsible) */}
      {resolvedIncidents.length > 0 && (
        <Card className="bg-card border-border">
          <div className="p-4 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-accent" />
              <span>Resolved Incidents</span>
            </h3>
          </div>

          <div className="p-4 space-y-3">
            {resolvedIncidents.map((incident) => (
              <div
                key={incident.id}
                className="flex items-start space-x-3 p-3 rounded-lg bg-accent/10 opacity-60"
              >
                <div className="w-16 h-12 rounded-md overflow-hidden flex-shrink-0">
                  <img
                    src={incident.thumbnailUrl}
                    alt="Incident thumbnail"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge className={`text-xs ${getIncidentColor(incident.type)} mb-2 opacity-60`}>
                        {incident.type}
                      </Badge>
                      <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{incident.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{incident.startTime} - {incident.endTime} on {incident.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-accent">
                      Resolved
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default IncidentList;