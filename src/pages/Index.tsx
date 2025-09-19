import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardHeader from '@/components/DashboardHeader';
import MetricsOverview from '@/components/MetricsOverview';
import FieldMap from '@/components/FieldMap';
import SpectralAnalysis from '@/components/SpectralAnalysis';
import AlertPanel from '@/components/AlertPanel';
import SensorDashboard from '@/components/SensorDashboard';
import StatusBar from '@/components/StatusBar';

const Index = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <DashboardHeader />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="spectral">Spectral Analysis</TabsTrigger>
            <TabsTrigger value="sensors">Environmental</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <MetricsOverview />
            
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <FieldMap />
              </div>
              <div className="space-y-4">
                <AlertPanel />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="spectral" className="space-y-6">
            <SpectralAnalysis />
          </TabsContent>

          <TabsContent value="sensors" className="space-y-6">
            <SensorDashboard />
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <AlertPanel />
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="text-center py-12 text-muted-foreground">
              <h3 className="text-lg font-medium mb-2">Reports & Analytics</h3>
              <p>Comprehensive field reports and predictive analytics coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <StatusBar />
    </div>
  );
};

export default Index;
