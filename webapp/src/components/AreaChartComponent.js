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
import { Flex, Text, Center } from '@chakra-ui/react';

const AreaChartComponent = (data) => {
  const {
    xaxis, lineA, lineB, logs,
  } = data;
  return (
    <Flex maxW="4xl" bgColor="gray.700" borderRadius="2xl" boxShadow="2xl" marginBottom="3" flexDir="row" align="center">
      <Center bgColor="teal.500" height="400" borderTopLeftRadius="2xl" borderBottomLeftRadius="2xl" width={{ base: '7', md: '9' }}>
        <Text
          style={{ transform: 'rotate(-90deg)' }}
          color="white"
          marginY="0"
          paddingY="0"
          fontSize="md"
          fontWeight="semibold"
        >
          {lineA.toUpperCase()}
        </Text>
      </Center>
      <div style={{
        width: '89%', height: 350, marginBottom: 10,
      }}
      >
        <ResponsiveContainer>
          <AreaChart
            data={logs}
            margin={{ bottom: 20, left: -15 }}
          >
            <defs>
              <linearGradient id="green" x1="0" y1="0" x2="0" y2="1">
                <stop offset="15%" stopColor="#4FD1C5" stopOpacity={1} />
                <stop offset="95%" stopColor="#319795" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="purple" x1="0" y1="0" x2="0" y2="1">
                <stop offset="15%" stopColor="#9F7AEA" stopOpacity={1} />
                <stop offset="95%" stopColor="#6B46C1" stopOpacity={0.8} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" color="white" opacity="0.7" />
            <XAxis
              dataKey={xaxis}
              label={{
                value: xaxis.toUpperCase(), position: 'insideBottom', offset: -12, fill: '#EDF2F7', fontSize: 15,
              }}
              tick={{ stroke: '#CBD5E0', fontSize: 11 }}
            />
            <YAxis tick={{ stroke: '#CBD5E0', fontSize: 11 }} />
            <Tooltip contentStyle={{ backgroundColor: '#4A5568', color: '#fff' }} />
            <Legend
              verticalAlign="top"
              layout="horizontal"
              align="right"
              wrapperStyle={{
                paddingBottom: '20px',
              }}
              iconType="diamond"
              iconSize={14}
            />
            <Area
              type="monotone"
              dataKey={lineA}
              stackId="1"
              stroke="#81E6D9"
              fill="url(#green)"
            />
            {lineB
              ? (
                <Area
                  type="monotone"
                  dataKey={lineB}
                  stackId="1"
                  stroke="#D6BCFA"
                  fill="url(#purple)"
                />
              )
              : null}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Flex>
  );
};

export default AreaChartComponent;
