import React,{useState,useEffect} from 'react';
import Chart from 'react-apexcharts';

const Myline = (props) => {
  const [Data,setData] = useState(props);
  // console.log('props',props)
  
  const [chartData, setChartData] = React.useState({
    options: {
      chart: {
        id: Data.name
      },
      xaxis: {
        categories:  Data.iter
      },
      yaxis: {
        logBase: 10,
        forceNiceScale: true
      },
    },
    series: [
      {
        name: 'Xl',
        data: Data.Xl
      },
      {
        name: 'Xr',
        data: Data.Xr
      },
      {
        name: 'error',
        data: Data.Error
      }
    ]
  });

  useEffect(() => {
    setData(props);
    setChartData({
      options: {
        chart: {
          id: props.name
        },
        xaxis: {
          categories: props.iter
        },
        yaxis: {
          logBase: 10
        }
      },
      series: [
        {
          name: 'Xl',
          data: props.Xl
        },
        {
          name: 'Xr',
          data: props.Xr
        },
        {
          name: 'error',
          data: props.Error
        }
      ]
    });
  }, [props]);

  return (
    <Chart options={chartData.options} series={chartData.series} type="line" width={1000} height={320} />
  );
}

export default Myline;
