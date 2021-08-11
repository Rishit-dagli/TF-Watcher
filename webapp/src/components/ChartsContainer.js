import { Flex, Box } from '@chakra-ui/react';
import React from 'react';
import { Redirect } from 'react-router-dom';
import getAllParams from '../helpers/getChartsDataFormat';
import AreaChartComponent from './AreaChartComponent';
import BarChartComponent from './BarChartComponent';

const ChartsContainer = (params) => {
  const { data } = params;
  let baseParam;
  let chartsParams;

  if (data[0]) {
    const temp = getAllParams(data);
    baseParam = temp.baseParam;
    chartsParams = temp.chartsParams;
  } else {
    return <Redirect to="/404" />;
  }

  return (
    <Flex paddingY="5" flexDir={{ base: 'column', xl: 'row' }} align={{ base: 'center', xl: 'flex-start' }}>
      <Flex
        flexDir="column"
        width={{
          base: 'xs', sm: 'md', md: '2xl', lg: '4xl',
        }}
      >
        {baseParam === 'epoch'
          ? chartsParams.map(
            (item) => (
              <AreaChartComponent
                xaxis={baseParam}
                lineA={item}
                lineB={`val_${item}`}
                logs={data}
                key={item}
              />
            ),
          ) : chartsParams.map(
            (item) => (
              <AreaChartComponent
                xaxis={baseParam}
                lineA={item}
                logs={data}
                key={item}
              />
            ),
          )}
      </Flex>
      <Flex paddingX="3">
        <Box display={{ base: 'none', xl: 'block' }} width="xs">
          <BarChartComponent logs={data} xaxis={baseParam} dir="v" />
        </Box>
        <Box
          display={{ base: 'block', xl: 'none' }}
          width={{
            base: 'xs', sm: 'md', md: '2xl', lg: '4xl',
          }}
        >
          <BarChartComponent logs={data} xaxis={baseParam} dir="h" />
        </Box>
      </Flex>
    </Flex>
  );
};

export default ChartsContainer;
