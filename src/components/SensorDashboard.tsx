import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Droplets, 
  Thermometer, 
  Wind, 
  Sun, 
  Gauge,
  Wifi,
  Battery,
  MapPin
} from 'lucide-react';
import sensorImage from '@/assets/sensors.jpg';

const SensorDashboard = () => {
  // Mock sensor data over the last 24 hours
  const sensorData = [
    { time: '00:00', temperature: 18, humidity: 75, soilMoisture: 45, windSpeed: 2.1, lightIntensity: 0 },
    { time: '04:00', temperature: 16, humidity: 82, soilMoisture: 44, windSpeed: 1.8, lightIntensity: 0 },
    { time: '08:00', temperature: 22, humidity: 68, soilMoisture: 42, windSpeed: 3.2, lightIntensity: 15000 },
    { time: '12:00', temperature: 28, humidity: 55, soilMoisture: 38, windSpeed: 4.1, lightIntensity: 45000 },
    { time: '16:00', temperature: 31, humidity: 48, soilMoisture: 35, windSpeed: 3.8, lightIntensity: 35000 },
    { time: '20:00', temperature: 25, humidity: 62, soilMoisture: 36, windSpeed: 2.9, lightIntensity: 8000 },
  ];

  const currentReadings = [
    {
      id: 'soil-moisture',
      name: 'Soil Moisture',
      value: 42,
      unit: '%',
      icon: Droplets,
      color: 'sensor-water',
      status: 'warning',
      optimal: '45-65%',
      location: 'Zone A-D Average'
    },
    {
      id: 'temperature',
      name: 'Air Temperature',
      value: 24,
      unit: '°C',
      icon: Thermometer,
      color: 'sensor-temperature',
      status: 'good',
      optimal: '20-28°C',
      location: 'Weather Station'
    },
    {
      id: 'humidity',
      name: 'Humidity',
      value: 68,
      unit: '%',
      icon: Wind,
      color: 'sensor-humidity',
      status: 'good',
      optimal: '60-80%',
      location: 'Ambient'
    },
    {
      id: 'light',
      name: 'Light Intensity',
      value: 28.5,
      unit: 'klux',
      icon: Sun,
      color: 'sensor-light',
      status: 'excellent',
      optimal: '25-35 klux',
      location: 'Photosynthetic Active'
    }
  ];

  const sensorStations = [
    {
      id: 'station-1',
      name: 'North Weather Station',
      status: 'online',
      battery: 89,
      lastUpdate: '2 min ago',
      sensors: 4
    },
    {
      id: 'station-2', 
      name: 'South Soil Sensors',
      status: 'online',
      battery: 72,
      lastUpdate: '1 min ago',
      sensors: 6
    },
    {
      id: 'station-3',
      name: 'East Humidity Monitor',
      status: 'warning',
      battery: 23,
      lastUpdate: '15 min ago',
      sensors: 2
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'excellent': return 'default';
      case 'good': return 'secondary';
      case 'warning': return 'outline';
      case 'critical': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStationStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-success';
      case 'warning': return 'text-warning';
      case 'offline': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Sensor Readings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentReadings.map((sensor) => {
          const IconComponent = sensor.icon;
          
          return (
            <Card key={sensor.id} className="shadow-field hover:shadow-elevated transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {sensor.name}
                </CardTitle>
                <IconComponent className={`h-4 w-4 text-${sensor.color}`} />
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline space-x-1 mb-2">
                  <div className="text-2xl font-bold text-foreground">
                    {sensor.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {sensor.unit}
                  </div>
                </div>
                
                <Badge 
                  variant={getStatusBadge(sensor.status)}
                  className={`text-xs mb-2 ${getStatusColor(sensor.status)}`}
                >
                  {sensor.status}
                </Badge>
                
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div>Optimal: {sensor.optimal}</div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {sensor.location}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* 24-Hour Trends */}
        <Card className="lg:col-span-2 shadow-field">
          <CardHeader>
            <CardTitle>24-Hour Environmental Trends</CardTitle>
            <Badge variant="outline">Real-time monitoring</Badge>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={sensorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="time" 
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
                <Area
                  type="monotone"
                  dataKey="temperature"
                  stackId="1"
                  stroke="hsl(var(--sensor-temperature))"
                  fill="hsl(var(--sensor-temperature) / 0.3)"
                  name="Temperature (°C)"
                />
                <Area
                  type="monotone"
                  dataKey="humidity"
                  stackId="2"
                  stroke="hsl(var(--sensor-humidity))"
                  fill="hsl(var(--sensor-humidity) / 0.3)"
                  name="Humidity (%)"
                />
                <Area
                  type="monotone"
                  dataKey="soilMoisture"
                  stackId="3"
                  stroke="hsl(var(--sensor-water))"
                  fill="hsl(var(--sensor-water) / 0.3)"
                  name="Soil Moisture (%)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sensor Stations Status */}
        <Card className="shadow-field">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wifi className="h-5 w-5 text-primary" />
              Sensor Stations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {sensorStations.map((station) => (
              <div
                key={station.id}
                className="border rounded-lg p-3 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-sm">{station.name}</div>
                  <Badge 
                    variant={station.status === 'online' ? 'default' : 'outline'}
                    className={`text-xs ${getStationStatusColor(station.status)}`}
                  >
                    {station.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Battery className="h-3 w-3" />
                    {station.battery}%
                  </div>
                  <div className="flex items-center gap-1">
                    <Gauge className="h-3 w-3" />
                    {station.sensors} sensors
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground mt-2">
                  Last update: {station.lastUpdate}
                </div>
              </div>
            ))}
            
            {/* Sensor deployment image */}
            <div className="mt-4">
              <img 
                src={sensorImage} 
                alt="Agricultural sensors deployed in field"
                className="w-full h-24 object-cover rounded-lg"
              />
              <div className="text-xs text-muted-foreground mt-2 text-center">
                IoT sensors deployed across 45 acres
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SensorDashboard;