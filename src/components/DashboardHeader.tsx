import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Bell, 
  Settings, 
  User, 
  Search,
  Calendar,
  Download,
  Satellite,
  Activity
} from 'lucide-react';
import fieldImage from '@/assets/field-aerial.jpg';

const DashboardHeader = () => {
  return (
    <div className="relative overflow-hidden rounded-lg mb-6">
      <div 
        className="h-32 bg-gradient-to-r from-primary/90 to-primary-glow/80 bg-cover bg-center relative"
        style={{
          backgroundImage: `linear-gradient(135deg, hsl(var(--primary) / 0.9), hsl(var(--primary-glow) / 0.8)), url(${fieldImage})`,
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
        
        <div className="relative h-full flex items-center justify-between px-6">
          <div className="text-white">
            <h1 className="text-2xl font-bold mb-1">AgriSense AI Platform</h1>
            <p className="text-white/90 text-sm">
              Real-time crop monitoring with hyperspectral imaging & AI analytics
            </p>
            <div className="flex items-center gap-4 mt-2">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Satellite className="h-3 w-3 mr-1" />
                Last scan: 2h ago
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Activity className="h-3 w-3 mr-1" />
                45.2 acres monitored
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Scan
            </Button>
            <div className="flex items-center gap-2 ml-4">
              <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                <Bell className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                <Settings className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                <User className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;