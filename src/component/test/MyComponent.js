import { Line } from 'react-chartjs-2';

const MyChart = () => {
  return (
    <div>
      <h2>Line Chart</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default MyChart;
