import react, { useState, useEffect } from "react";
import { count, evaluate } from "mathjs";

function Box() {
  const [input, setInput] = useState([]);
  const [eq, setEq] = useState();
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);

  useEffect(() => {
    let t = [];
    let t2 = [];
    for (let i = 0; i < input; i++) {
      t.push(0);
      t2.push(i + 1);
    }
    console.log("t=", t);
    console.log("t2=", t2);
  });

  const Eqq = (e) => {
    var c = e.target.value;
    setEq(c);
    console.log("c=", c);
  };
  const Cow = (e) => {
    var countt = Number(e.target.value);
    setInput(countt);
    console.log("count=", countt);
  };

  const Eva = () => {};

  return (
    <div>
      <input type="text" onChange={Eqq}></input>
      <br />
      <input type="text" onChange={Cow}></input>
      <br />
      <div style={{ display: "inline block" }}></div>
      <div style={{ display: "inline block" }}></div>

      <button onClick={Eva}>ss</button>
      <br />
    </div>
  );
}

export default Box;
