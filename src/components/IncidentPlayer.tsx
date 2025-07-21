import { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import mainFeedImage from "@/assets/cctv-main-feed.jpg";
import entranceFeedImage from "@/assets/cctv-entrance.jpg";
import vaultFeedImage from "@/assets/cctv-vault.jpg";

const IncidentPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState("03:12:37");

  const cameraFeeds = [
    { id: "01", name: "Shop Floor A", image: mainFeedImage },
    { id: "02", name: "Entrance", image: entranceFeedImage },
    { id: "03", name: "Vault", image: vaultFeedImage },
  ];

  return (
    <div className="space-y-4">
      {/* Main Video Player */}
      <Card className="bg-player-bg border-border overflow-hidden">
        <div className="relative aspect-video bg-player-bg">
          <img 
            src={mainFeedImage} 
            alt="CCTV Main Feed" 
            className="w-full h-full object-cover"
          />
          
          {/* Camera Label Overlay */}
          <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-md">
            <span className="text-sm font-medium text-foreground">Camera - 01</span>
          </div>

          {/* Timestamp Overlay */}
          <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-md">
            <span className="text-sm font-mono text-foreground">11/7/2025 - {currentTime}</span>
          </div>

          {/* "MANDATORY" Overlay (matching design) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-4xl font-bold text-white/30 tracking-wider">
              MANDATORY
            </div>
          </div>
        </div>

        {/* Player Controls */}
        <div className="p-4 bg-background border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-foreground hover:text-primary"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </Button>
              <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
                <SkipBack className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
                <SkipForward className="w-4 h-4" />
              </Button>
            </div>

            <div className="text-sm font-mono text-muted-foreground">
              {currentTime} (15-Jun-2025)
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
                <Volume2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Camera List */}
      <Card className="bg-card border-border">
        <div className="p-4">
          <h3 className="text-sm font-medium text-foreground mb-3">Camera List</h3>
          <div className="space-y-2">
            {cameraFeeds.map((camera) => (
              <div
                key={camera.id}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
              >
                <div className="w-12 h-8 rounded overflow-hidden flex-shrink-0">
                  <img 
                    src={camera.image} 
                    alt={`Camera ${camera.id}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">Camera - {camera.id}</div>
                  <div className="text-xs text-muted-foreground">{camera.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default IncidentPlayer;