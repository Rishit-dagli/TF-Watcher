import React from 'react';
import { Container } from '@chakra-ui/react';
import {
  BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer,
} from 'recharts';

const BarChartComponent = (data) => {
  const { logs, xaxis, dir } = data;
  return (
    <Container maxW={dir === 'h' ? '4xl' : 'xs'} bgColor="gray.700" borderRadius="2xl" boxShadow="2xl" paddingTop="10">
      <div style={{
        width: '98%', height: dir === 'h' ? 350 : 780, marginBottom: 10,
      }}
      >
        <ResponsiveContainer minWidth={200}>
          <BarChart data={logs} margin={{ bottom: 20, left: -2 }} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis
              dataKey={xaxis}
              label={{
                value: dir === 'h' ? 'AVG_TIME' : xaxis.toUpperCase(),
                angle: 90,
                position: 'insideLeft',
                fill: '#fff',
                fontSize: 15,
                offset: 15,
              }}
              type="category"
              tick={{ stroke: '#CBD5E0', fontSize: 11 }}
            />
            <XAxis
              label={{
                value: dir === 'h' ? xaxis.toUpperCase() : 'AVG_TIME',
                position: 'insideBottom',
                offset: -12,
                fill: '#fff',
                fontSize: 15,
              }}
              type="number"
              tick={{ stroke: '#CBD5E0', fontSize: 11 }}
            />
            <Tooltip contentStyle={{ backgroundColor: '#4A5568', color: '#fff' }} />
            <Bar dataKey="avg_time" fill="#B794F4" stroke="#D6BCFA" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Container>
  );
};

export default BarChartComponent;
