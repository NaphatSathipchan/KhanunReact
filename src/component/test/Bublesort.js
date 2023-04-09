import "./styles.css";
import React, { useState, useEffect } from "react";

function Bubblesort() {
  var [array, setArray] = useState([array]);
  var [sortHistory, setSortHistory] = useState([[...array]]);
  const [playing, setPlaying] = useState(false);
  var size = array.length;

  console.log(array, sortHistory);

  const play = () => {
    setPlaying(true);
  };

  const handleChange = (e) => {
    var str = e.target.value;
    setArray(str.split(",").map((i) => Number(i)));
  };

  const bubblesort = () => {
    var historyArray = [[array]];
    for (let i = 0; i < size - 1; i++) {
      for (let j = 0; j < size - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          var temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
          historyArray.push([array]);
        }
      }
    }
    setSortHistory(historyArray);
    play();
  };

  return (
    <div>
      <div className="container">
        <label className="label">Enter the values as array</label>
        <input className="input" type="text" onChange={handleChange} />
        <button className="button" onClick={() => bubblesort()}>
          sort
        </button>
      </div>
      <div style={{ textAlign: "center" }}>
        {array.map((element) => (
          <div className="App" style={{ height: (element + 1) * 10 }}>
            {element}
          </div>
        ))}
      </div>
    </div>
  );
}
export default Bubblesort;
