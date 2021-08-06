import React from 'react';
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Legend,
  Area,
} from 'recharts';
import { Container } from '@chakra-ui/react';

const AreaChartComponent = (data) => {
  const {
    xaxis, lineA, lineB, logs,
  } = data;
  return (
    <Container maxWidth="container.lg">
      <div style={{
        width: '100%', height: 380, marginBottom: 40, marginTop: 10,
      }}
      >
        <ResponsiveContainer>
          <AreaChart
            data={logs}
            margin={{
              top: 5,
              right: 30,
              left: 30,
              bottom: 15,
            }}
          >
            <defs>
              <linearGradient id="green" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#5ac49c" stopOpacity={1} />
                <stop offset="95%" stopColor="#5ac49c" stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="purple" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={1} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey={xaxis}
              label={{
                value: xaxis.toUpperCase(), position: 'insideBottom', offset: -12, fill: '#0987A0', fontSize: 15,
              }}
            />
            <YAxis label={{
              value: `${lineA.toUpperCase()} VALUE`, angle: -90, position: 'insideLeft', fill: '#0987A0', fontSize: 15,
            }}
            />
            <Tooltip />
            <Legend
              verticalAlign="middle"
              layout="vertical"
              align="right"
              wrapperStyle={{
                paddingLeft: '20px',
                width: '10rem',
              }}
              iconType="diamond"
              iconSize={14}
            />
            <Area
              type="monotone"
              dataKey={lineA}
              stackId="1"
              stroke="#44b88b"
              fill="url(#green)"
            />
            {lineB
              ? (
                <Area
                  type="monotone"
                  dataKey={lineB}
                  stackId="1"
                  stroke="#8884d8"
                  fill="url(#purple)"
                />
              )
              : null}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Container>
  );
};

export default AreaChartComponent;
