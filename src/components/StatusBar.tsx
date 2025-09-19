import React from 'react';
import { Badge } from '@/components/ui/badge';
import { 
  Wifi, 
  Database, 
  Satellite, 
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const StatusBar = () => {
  const systemStatus = [
    {
      name: 'Data Connection',
      status: 'online',
      icon: Wifi,
      lastUpdate: '< 1 min ago'
    },
    {
      name: 'AI Processing',
      status: 'active',
      icon: Activity,
      lastUpdate: 'Processing...'
    },
    {
      name: 'Satellite Feed',
      status: 'online',
      icon: Satellite,
      lastUpdate: '2h ago'
    },
    {
      name: 'Database',
      status: 'healthy',
      icon: Database,
      lastUpdate: 'Synced'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
      case 'healthy': 
        return 'text-success bg-success/10 border-success/20';
      case 'active':
        return 'text-accent bg-accent/10 border-accent/20';
      case 'warning':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'offline':
      case 'error':
        return 'text-destructive bg-destructive/10 border-destructive/20';
      default:
        return 'text-muted-foreground bg-muted/10 border-border/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
      case 'healthy':
        return CheckCircle;
      case 'active':
        return Activity;
      case 'warning':
        return AlertTriangle;
      default:
        return CheckCircle;
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border z-50">
      <div className="container mx-auto px-4 py-2 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {systemStatus.map((item, index) => {
              const IconComponent = item.icon;
              const StatusIcon = getStatusIcon(item.status);
              
              return (
                <div key={index} className="flex items-center gap-2">
                  <IconComponent className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">{item.name}</span>
                  <StatusIcon className={`h-3 w-3 ${getStatusColor(item.status).split(' ')[0]}`} />
                  <span className="text-xs text-muted-foreground">{item.lastUpdate}</span>
                </div>
              );
            })}
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Last refresh:</span>
              <span className="font-medium text-foreground">
                {new Date().toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: false 
                })}
              </span>
            </div>
            <Badge variant="outline" className="text-xs">
              Real-time monitoring active
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;