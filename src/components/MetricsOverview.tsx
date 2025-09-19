import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Leaf, 
  Droplets, 
  Thermometer, 
  Sun, 
  TrendingUp, 
  TrendingDown,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const MetricsOverview = () => {
  const metrics = [
    {
      title: 'Overall Health Score',
      value: '87',
      unit: '%',
      change: '+5.2%',
      trend: 'up',
      status: 'good',
      icon: Leaf,
      description: 'Crop vitality index'
    },
    {
      title: 'NDVI Average',
      value: '0.74',
      unit: '',
      change: '+0.08',
      trend: 'up',
      status: 'excellent',
      icon: Sun,
      description: 'Vegetation density'
    },
    {
      title: 'Soil Moisture',
      value: '42',
      unit: '%',
      change: '-8.1%',
      trend: 'down',
      status: 'warning',
      icon: Droplets,
      description: 'Average field level'
    },
    {
      title: 'Active Alerts',
      value: '3',
      unit: '',
      change: '+2',
      trend: 'up',
      status: 'critical',
      icon: AlertCircle,
      description: 'Requires attention'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-success bg-success/10 border-success/20';
      case 'good': return 'text-accent bg-accent/10 border-accent/20';
      case 'warning': return 'text-warning bg-warning/10 border-warning/20';
      case 'critical': return 'text-destructive bg-destructive/10 border-destructive/20';
      default: return 'text-muted-foreground bg-muted/10 border-border/20';
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? TrendingUp : TrendingDown;
  };

  const getTrendColor = (trend: string, status: string) => {
    if (status === 'critical' || status === 'warning') {
      return trend === 'up' ? 'text-destructive' : 'text-success';
    }
    return trend === 'up' ? 'text-success' : 'text-destructive';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => {
        const IconComponent = metric.icon;
        const TrendIcon = getTrendIcon(metric.trend);
        
        return (
          <Card key={index} className="shadow-field hover:shadow-elevated transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <IconComponent className={`h-4 w-4 ${getStatusColor(metric.status).split(' ')[0]}`} />
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline space-x-1">
                <div className="text-2xl font-bold text-foreground">
                  {metric.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {metric.unit}
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-2">
                <div className={`flex items-center text-xs ${getTrendColor(metric.trend, metric.status)}`}>
                  <TrendIcon className="h-3 w-3 mr-1" />
                  {metric.change}
                </div>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${getStatusColor(metric.status)}`}
                >
                  {metric.status}
                </Badge>
              </div>
              
              <p className="text-xs text-muted-foreground mt-2">
                {metric.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default MetricsOverview;