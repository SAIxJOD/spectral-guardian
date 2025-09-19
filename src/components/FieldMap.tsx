import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Activity, AlertTriangle } from 'lucide-react';

const FieldMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  // Mock field data with health zones
  const fieldZones = [
    { id: 1, name: 'Zone A', health: 'excellent', x: 25, y: 30, alert: false },
    { id: 2, name: 'Zone B', health: 'good', x: 60, y: 25, alert: false },
    { id: 3, name: 'Zone C', health: 'warning', x: 35, y: 65, alert: true },
    { id: 4, name: 'Zone D', health: 'critical', x: 75, y: 70, alert: true },
  ];

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return 'bg-success/80 border-success';
      case 'good': return 'bg-accent/80 border-accent';
      case 'warning': return 'bg-warning/80 border-warning';
      case 'critical': return 'bg-destructive/80 border-destructive';
      default: return 'bg-muted/80 border-border';
    }
  };

  const getHealthBadgeVariant = (health: string) => {
    switch (health) {
      case 'excellent': return 'default';
      case 'good': return 'secondary';
      case 'warning': return 'outline';
      case 'critical': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <Card className="h-full shadow-field">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Field Health Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          ref={mapRef}
          className="relative h-64 bg-gradient-to-br from-accent/20 to-primary/10 rounded-lg border border-border overflow-hidden"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(120, 200, 80, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(80, 150, 120, 0.2) 0%, transparent 50%),
              linear-gradient(135deg, hsl(var(--accent) / 0.1), hsl(var(--primary) / 0.1))
            `
          }}
        >
          {/* Field zones overlay */}
          {fieldZones.map((zone) => (
            <div
              key={zone.id}
              className={`absolute w-12 h-12 rounded-full border-2 ${getHealthColor(zone.health)} 
                         backdrop-blur-sm flex items-center justify-center cursor-pointer
                         hover:scale-110 transition-all duration-300 shadow-lg`}
              style={{
                left: `${zone.x}%`,
                top: `${zone.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {zone.alert && (
                <AlertTriangle className="h-4 w-4 text-foreground animate-pulse" />
              )}
              {!zone.alert && (
                <Activity className="h-4 w-4 text-foreground" />
              )}
            </div>
          ))}

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 border border-border">
            <div className="flex flex-wrap gap-2">
              <Badge variant="default" className="text-xs">Excellent</Badge>
              <Badge variant="secondary" className="text-xs">Good</Badge>
              <Badge variant="outline" className="text-xs">Warning</Badge>
              <Badge variant="destructive" className="text-xs">Critical</Badge>
            </div>
          </div>

          {/* Field info overlay */}
          <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 border border-border">
            <div className="text-sm">
              <div className="font-medium text-foreground">North Field</div>
              <div className="text-muted-foreground">45.2 acres</div>
            </div>
          </div>
        </div>

        {/* Zone details */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          {fieldZones.map((zone) => (
            <div
              key={zone.id}
              className="flex items-center justify-between p-2 rounded-md bg-muted/50 hover:bg-muted/70 transition-colors"
            >
              <span className="text-sm font-medium">{zone.name}</span>
              <Badge variant={getHealthBadgeVariant(zone.health)} className="text-xs">
                {zone.health}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FieldMap;