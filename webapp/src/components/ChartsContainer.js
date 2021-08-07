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
