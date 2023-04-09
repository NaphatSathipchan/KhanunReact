import "./styles.css";
import React, { useState, useEffect } from "react";

function Bubblesort() {
  var [array, setArray] = useState([]);
  const [siao, setsiao] = useState(false);
  var size = array.length;

  const Bigpom = () => {
    setsiao(true);
    console.log("siao=", siao);
  };

  const handleChange = (e) => {
    var str = e.target.value;
    setArray(str.split(",").map((i) => Number(i)));
  };

  const bubblesort = () => {
    var historyArray = [[...array]];

    for (let i = 0; i < size - 1; i++) {
      for (let j = 0; j < size - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          var temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
          historyArray.push([...array]);

          console.log("history= ", historyArray);
        }
      }
    }
    Bigpom();
  };

  return (
    <div>
      <div className="container">
        <label className="label">ทพจร</label>
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
