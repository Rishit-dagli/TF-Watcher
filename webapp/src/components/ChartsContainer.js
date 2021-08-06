import React from 'react';
import getAllParams from '../helpers/getChartsDataFormat';
import AreaChartComponent from './AreaChartComponent';
import BarChartComponent from './BarChartComponent';

const ChartsContainer = (params) => {
  const { data } = params;
  const { baseParam, chartsParams } = getAllParams(data);

  return (
    <>
      {baseParam === 'epoch'
        ? chartsParams.map(
          (item) => <AreaChartComponent xaxis={baseParam} lineA={item} lineB={`val_${item}`} logs={data} key={item} />,
        ) : chartsParams.map(
          (item) => <AreaChartComponent xaxis={baseParam} lineA={item} logs={data} key={item} />,
        )}
      <BarChartComponent logs={data} xaxis={baseParam} />
    </>
  );
};

export default ChartsContainer;