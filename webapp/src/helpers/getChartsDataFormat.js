let baseParam = 'epoch';
let chartsParams = [];
const ignoreParams = ['epoch', 'batch', 'avg_time'];

const getAllParams = (data) => {
  if (data[0].epoch === false) baseParam = 'batch';

  if (baseParam === 'epoch') {
    const charts = [];
    Object.keys(data[0]).map((key) => {
      if (!ignoreParams.includes(key)) {
        if (key.split('val_').length === 1) charts.push(key);
      }
      return null;
    });
    chartsParams = charts;
  } else if (baseParam === 'batch') {
    const charts = [];
    Object.keys(data[0]).map((key) => {
      if (!ignoreParams.includes(key)) charts.push(key);
      return null;
    });
    chartsParams = charts;
  }

  return { baseParam, chartsParams };
};

export default getAllParams;
