import React from 'react';
import { Container } from '@chakra-ui/react';
import {
  BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer,
} from 'recharts';

const BarChartComponent = (data) => {
  const { logs, xaxis } = data;
  return (
    <Container maxWidth="container.lg" marginTop="20">
      <div style={{
        width: '80%', height: 280, marginBottom: 40, paddingLeft: 40,
      }}
      >
        <ResponsiveContainer>
          <BarChart data={logs} margin={{ bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey={xaxis}
              label={{
                value: xaxis.toUpperCase(), position: 'insideBottom', offset: -12, fill: '#0987A0', fontSize: 15,
              }}
            />
            <YAxis label={{
              value: 'AVG TIME', angle: -90, position: 'insideLeft', fill: '#0987A0', fontSize: 15,
            }}
            />
            <Tooltip />
            <Bar dataKey="avg_time" fill="#b794f4" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Container>
  );
};

export default BarChartComponent;
