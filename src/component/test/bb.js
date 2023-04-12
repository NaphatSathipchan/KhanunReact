import React, { useState, useEffect } from "react";
import Chart from "./Chart";

function Box() {
  const [input, setInput] = useState([]);
  const [eq, setEq] = useState();
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const [x, setX] = useState(0);
  const [y, setY] = useState();
  const [N, setN] = useState([]);
  const [M, setM] = useState([]);
  const [chartData, setChartData] = useState({ X: [], Y: [] });

  useEffect(() => {
    let t = [];
    let t2 = [];
    for (let i = 0; i < input; i++) {
      t.push(0);
      t2.push(0);
    }
    setRight(t);
    setLeft(t2);
  }, [input]);

  const Cow = (e) => {
    var countt = Number(e.target.value);
    setInput(countt);
  };

  const Coww = (e) => {
    var counttt = Number(e.target.value);
    setN(counttt);
  };

  const handleTableAChange = (event, index) => {
    const { value } = event.target;
    let newLeft = [...left];
    newLeft[index] = value;
    setLeft(newLeft);
  };

  const handleTableBChange = (event, index) => {
    const { value } = event.target;
    let newRight = [...right];
    newRight[index] = value;
    setRight(newRight);
  };

  const Eva = () => {
    const sumX = left.reduce((a, b) => Number(a) + Number(b), 0);
    const sumY = right.reduce((a, b) => Number(a) + Number(b), 0);
    const meanX = sumX / left.length;
    const meanY = sumY / right.length;
    let numerator = 0;
    let denominator = 0;
    for (let i = 0; i < left.length; i++) {
      numerator += (left[i] - meanX) * (right[i] - meanY);
      denominator += Math.pow(left[i] - meanX, 2);
    }
    const slope = numerator / denominator;
    const yIntercept = meanY - slope * meanX;
    const equation = `y = ${slope}* ${N} + ${yIntercept}`;
    const r = `${slope}`;
    const g = `${yIntercept}`;
    const equationn = r * N + g;
    setEq(equation);
    setM(equationn);
    setY(slope * x + yIntercept);

    const newData = {
      X: left,
      Y: left.map((xi) => slope * xi + yIntercept),
    };
    setChartData(newData);
    console.log("M=", M);
  };

  const handleXChange = (event) => {
    const { value } = event.target;
    setX(value);
  };

  return (
    <div>
      <input type="text" onChange={Cow}></input>
      <input type="text" onChange={Coww}></input>

      <br />
      <button onClick={Eva}>Calculate</button>
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <table>
          <thead>
            <tr>
              <th>X</th>
              <th>Y</th>
            </tr>
          </thead>
          <tbody>
            {left.map((value, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="number"
                    value={value}
                    onChange={(event) => handleTableAChange(event, index)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={right[index]}
                    onChange={(event) => handleTableBChange(event, index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <div style={{ marginLeft: "20px" }}>
          {eq && (
            <div>
              Equation: {eq}
              <br />
              Answer: {M}
            </div>
          )}
          <br />

          <br />
          <br />
          <div>
            <br />
            <Chart X={chartData.X} Y={chartData.Y} Y2={M} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Box;
