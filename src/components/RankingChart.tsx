
import React, { useEffect, useState } from 'react';
import { Restaurant } from '../lib/types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

interface RankingChartProps {
  restaurants: Restaurant[];
}

interface ChartData {
  name: string;
  votes: number;
  fill: string;
}

const RankingChart: React.FC<RankingChartProps> = ({ restaurants }) => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  
  useEffect(() => {
    if (restaurants.length === 0) return;
    
    // Sort restaurants by votes (descending)
    const sortedRestaurants = [...restaurants]
      .sort((a, b) => b.votes - a.votes)
      .slice(0, 5); // Only show top 5
    
    // Generate colors for bars
    const colors = [
      '#F97316', // Orange (first place)
      '#FEC6A1', // Soft orange
      '#A67C52', // Brown-light
      '#8E9196', // Gray
      '#ccc'     // Light gray
    ];
    
    // Format data for chart
    const formattedData: ChartData[] = sortedRestaurants.map((restaurant, index) => ({
      name: restaurant.name,
      votes: restaurant.votes,
      fill: colors[index] || colors[colors.length - 1]
    }));
    
    setChartData(formattedData);
  }, [restaurants]);
  
  if (restaurants.length === 0) {
    return <div className="p-8 text-center">No hay datos disponibles para mostrar.</div>;
  }
  
  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-md shadow-md border border-gray-100">
          <p className="font-medium">{payload[0].payload.name}</p>
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gastro-orange">{payload[0].value}</span> votos
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm animate-fade-in">
      <h3 className="text-lg font-semibold mb-6 text-center text-gastro-brown">
        Top 5 Restaurantes
      </h3>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
            layout="horizontal"
          >
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }} 
              tickLine={false} 
              axisLine={{ stroke: '#eee' }}
              interval={0}
              height={60}
              angle={-20}
              textAnchor="end"
            />
            <YAxis 
              hide={false} 
              tick={{ fontSize: 12 }} 
              axisLine={{ stroke: '#eee' }}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="votes" 
              radius={[4, 4, 0, 0]}
            >
              <LabelList 
                dataKey="votes" 
                position="top" 
                fill="#8B5A2B" 
                fontSize={12} 
                formatter={(value: number) => `${value} ${value === 1 ? 'voto' : 'votos'}`}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RankingChart;
