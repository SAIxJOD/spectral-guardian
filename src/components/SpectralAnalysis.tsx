import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Camera, Activity, TrendingUp } from 'lucide-react';
import spectralImage from '@/assets/spectral-analysis.jpg';

const SpectralAnalysis = () => {
  // Mock spectral index data over time
  const spectralData = [
    { date: '2024-01-15', ndvi: 0.62, ndre: 0.45, savi: 0.58, lai: 2.1 },
    { date: '2024-02-01', ndvi: 0.68, ndre: 0.51, savi: 0.64, lai: 2.4 },
    { date: '2024-02-15', ndvi: 0.74, ndre: 0.58, savi: 0.71, lai: 2.8 },
    { date: '2024-03-01', ndvi: 0.79, ndre: 0.64, savi: 0.76, lai: 3.2 },
    { date: '2024-03-15', ndvi: 0.82, ndre: 0.68, savi: 0.79, lai: 3.5 },
    { date: '2024-04-01', ndvi: 0.85, ndre: 0.72, savi: 0.82, lai: 3.8 },
    { date: '2024-04-15', ndvi: 0.78, ndre: 0.66, savi: 0.75, lai: 3.3 },
  ];

  const indices = [
    {
      name: 'NDVI',
      value: 0.74,
      change: '+0.08',
      color: '#22c55e',
      description: 'Normalized Difference Vegetation Index'
    },
    {
      name: 'NDRE',
      value: 0.58,
      change: '+0.12',
      color: '#3b82f6',
      description: 'Normalized Difference Red Edge'
    },
    {
      name: 'SAVI',
      value: 0.71,
      change: '+0.06',
      color: '#f59e0b',
      description: 'Soil Adjusted Vegetation Index'
    },
    {
      name: 'LAI',
      value: 2.8,
      change: '+0.4',
      color: '#8b5cf6',
      description: 'Leaf Area Index'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Spectral Indices Overview */}
      <Card className="shadow-field">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Vegetation Indices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {indices.map((index, i) => (
              <div key={i} className="text-center p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="text-lg font-bold" style={{ color: index.color }}>
                  {index.value}
                </div>
                <div className="text-xs font-medium text-foreground mb-1">
                  {index.name}
                </div>
                <div className="flex items-center justify-center text-xs text-success gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {index.change}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {index.description}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Temporal Trends Chart */}
        <Card className="shadow-field">
          <CardHeader>
            <CardTitle className="text-lg">Temporal Analysis</CardTitle>
            <Badge variant="outline" className="w-fit">Last 90 days</Badge>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={spectralData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  stroke="hsl(var(--muted-foreground))"
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="ndvi" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  name="NDVI"
                />
                <Line 
                  type="monotone" 
                  dataKey="ndre" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="NDRE"
                />
                <Line 
                  type="monotone" 
                  dataKey="savi" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  name="SAVI"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Spectral Imaging Preview */}
        <Card className="shadow-field">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-primary" />
              Latest Spectral Analysis
            </CardTitle>
            <Badge variant="secondary">Updated 2h ago</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative rounded-lg overflow-hidden">
                <img 
                  src={spectralImage} 
                  alt="Hyperspectral crop analysis"
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                  False Color RGB
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-success/10 p-3 rounded-lg border border-success/20">
                  <div className="font-medium text-success">Healthy Areas</div>
                  <div className="text-2xl font-bold text-success">78%</div>
                </div>
                <div className="bg-warning/10 p-3 rounded-lg border border-warning/20">
                  <div className="font-medium text-warning">Stress Detected</div>
                  <div className="text-2xl font-bold text-warning">12%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SpectralAnalysis;