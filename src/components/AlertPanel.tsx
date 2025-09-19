import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  AlertCircle, 
  Bug, 
  Droplets, 
  Thermometer,
  Clock,
  MapPin,
  CheckCircle
} from 'lucide-react';

const AlertPanel = () => {
  const alerts = [
    {
      id: 1,
      type: 'pest',
      severity: 'critical',
      title: 'Aphid Infestation Risk',
      description: 'High probability of aphid outbreak detected in Zone C',
      location: 'Zone C (North Field)',
      timestamp: '15 min ago',
      confidence: 92,
      recommendation: 'Apply targeted insecticide treatment within 24 hours',
      icon: Bug,
      status: 'active'
    },
    {
      id: 2,  
      type: 'stress',
      severity: 'warning',
      title: 'Water Stress Detected',
      description: 'NDVI decline and soil moisture below optimal levels',
      location: 'Zone D (South Field)', 
      timestamp: '1 hour ago',
      confidence: 87,
      recommendation: 'Increase irrigation schedule by 25%',
      icon: Droplets,
      status: 'active'
    },
    {
      id: 3,
      type: 'disease',
      severity: 'warning', 
      title: 'Early Blight Risk',
      description: 'Environmental conditions favorable for fungal development',
      location: 'Zone A (East Field)',
      timestamp: '3 hours ago',
      confidence: 74,
      recommendation: 'Monitor closely, consider preventive fungicide application',
      icon: AlertCircle,
      status: 'monitoring'
    },
    {
      id: 4,
      type: 'environmental',
      severity: 'info',
      title: 'Heat Stress Warning',
      description: 'Temperature expected to exceed 35°C for 3+ consecutive days',
      location: 'All Fields',
      timestamp: '6 hours ago', 
      confidence: 95,
      recommendation: 'Adjust irrigation timing to early morning/evening',
      icon: Thermometer,
      status: 'resolved'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-destructive bg-destructive/10 border-destructive/20';
      case 'warning': return 'text-warning bg-warning/10 border-warning/20';
      case 'info': return 'text-accent bg-accent/10 border-accent/20';
      default: return 'text-muted-foreground bg-muted/10 border-border/20';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'warning': return 'outline';
      case 'info': return 'secondary';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return AlertTriangle;
      case 'monitoring': return AlertCircle;
      case 'resolved': return CheckCircle;
      default: return AlertCircle;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-destructive';
      case 'monitoring': return 'text-warning';
      case 'resolved': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const activeAlerts = alerts.filter(alert => alert.status === 'active');
  const allAlerts = alerts;

  return (
    <div className="space-y-4">
      {/* Alert Summary */}
      <Card className="shadow-field">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Active Alerts
            </div>
            <Badge variant="destructive" className="animate-pulse-warning">
              {activeAlerts.length} Critical
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <div className="text-2xl font-bold text-destructive">2</div>
              <div className="text-sm text-destructive">Critical</div>
            </div>
            <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
              <div className="text-2xl font-bold text-warning">1</div>
              <div className="text-sm text-warning">Warning</div>
            </div>
            <div className="p-3 rounded-lg bg-success/10 border border-success/20">
              <div className="text-2xl font-bold text-success">1</div>
              <div className="text-sm text-success">Resolved</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Alerts */}
      <Card className="shadow-field">
        <CardHeader>
          <CardTitle>Alert Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {allAlerts.map((alert) => {
            const IconComponent = alert.icon;
            const StatusIcon = getStatusIcon(alert.status);
            
            return (
              <div
                key={alert.id}
                className={`border rounded-lg p-4 ${getSeverityColor(alert.severity)} 
                           hover:shadow-md transition-all duration-200`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <IconComponent className="h-5 w-5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground">{alert.title}</h4>
                      <p className="text-sm text-muted-foreground">{alert.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getSeverityBadge(alert.severity)}>
                      {alert.severity}
                    </Badge>
                    <StatusIcon className={`h-4 w-4 ${getStatusColor(alert.status)}`} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {alert.location}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {alert.timestamp}
                  </div>
                  <div className="text-muted-foreground">
                    Confidence: {alert.confidence}%
                  </div>
                </div>

                <div className="bg-card/50 rounded-md p-3 mb-3">
                  <div className="text-sm font-medium mb-1">Recommended Action:</div>
                  <div className="text-sm text-muted-foreground">{alert.recommendation}</div>
                </div>

                {alert.status === 'active' && (
                  <div className="flex gap-2">
                    <Button size="sm" variant="default">
                      Take Action
                    </Button>
                    <Button size="sm" variant="outline">
                      Mark as Resolved
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default AlertPanel;