import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const Chart = (props) => {
  console.log("propx=", props.X);
  console.log("propy=", props.Y);

  const [xy, setXy] = useState([]);

  useEffect(() => {
    const sumX = props.X.reduce((a, b) => a + b, 0);
    const sumY = props.Y.reduce((a, b) => a + b, 0);
    const meanX = sumX / props.X.length;
    const meanY = sumY / props.Y.length;
    let numerator = 0;
    let denominator = 0;
    for (let i = 0; i < props.X.length; i++) {
      numerator += (props.X[i] - meanX) * (props.Y[i] - meanY);
      denominator += Math.pow(props.X[i] - meanX, 2);
    }
    const slope = 100 * (numerator / denominator);
    const yIntercept = meanY - slope * meanX;
    setXy(props.X.map((x) => slope * x + yIntercept));
  }, [props.X, props.Y]);
  console.log("xy=", xy);
  const regressionLine = {
    x: props.X,
    y: xy,
    type: "scatter",
    mode: "lines",
    line: { color: "blue" },
    name: "Regression Line",
  };

  const data = [
    {
      x: props.X,
      y: props.Y,
      type: "scatter",
      mode: "markers",
      marker: { color: "red" },
      name: "Data",
    },
    regressionLine,
  ];

  const layout = {
    title: "My Chart",
    xaxis: {
      title: "X Axis",
    },
    yaxis: {
      title: "Y Axis",
    },
  };

  return <Plot data={data} layout={layout} />;
};

export default Chart;
