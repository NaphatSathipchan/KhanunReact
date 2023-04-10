import React, { useState } from "react";

const Bublesort = () => {
  const [array, setArray] = useState([]);
  const [darray, setDArray] = useState([[...array]]);
  const [sort, setSort] = useState(false);
  const Size = array.length;
  const HandleChange = (e) => {
    var str = e.target.value;
    setArray(str.split(",").map((i) => Number(i)));
    console.log("Array=", array);
  };
  const Tt = () => {
    setSort(true);
  };

  const Bublesort = () => {
    const AA = [...array];
    for (let i = 0; i < Size - 1; i++) {
      for (let j = 0; j < Size - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          var temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
          AA.push(...array);
          console.log("Array2=", array);
        }
      }
    }
    setDArray(AA);
    Tt();
  };

  return (
    <div>
      <input type="text" onChange={HandleChange} />
      <button type="button" onClick={Bublesort}>
        sss
      </button>
      <div style={{ textAlign: "center" }}>
        {array.map((element) => (
          <div className="App" style={{ height: (element + 1) * 10 }}>
            {element}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bublesort;
