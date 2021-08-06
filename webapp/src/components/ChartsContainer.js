import React from 'react';
import getAllParams from '../helpers/getChartsDataFormat';
import AreaChartComponent from './AreaChartComponent';

const ChartsContainer = (params) => {
  const { data } = params;
  const { baseParam, chartsParams, logs } = getAllParams(data);

  if (baseParam === 'epoch') {
    return (
      chartsParams.map(
        (item) => <AreaChartComponent xaxis={baseParam} lineA={item} lineB={`val_${item}`} logs={logs} key={item} />,
      )
    );
  }

  return (
    chartsParams.map(
      (item) => <AreaChartComponent xaxis={baseParam} lineA={item} logs={logs} key={item} />,
    )
  );
};

export default ChartsContainer;
