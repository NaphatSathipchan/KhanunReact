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
    setRight(t);
    setLeft(t2);
  }, [input]);
  console.log("inputt=", input);

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

  const TableA = () => {
    return left.map((item, index) => {
      return (
        <div>
          <input placeholder={`${left[index]}`} />
        </div>
      );
    });
  };
  const TableB = () => {
    return right.map((item, index) => {
      return (
        <div>
          <input placeholder={`${right[index]}`} />
        </div>
      );
    });
  };

  const Eva = () => {
    let t = left.map((item, index) => {
      var value = item;
      var ans = evaluate(eq, { x: value });
      const obj = {
        evaluate: ans,
      };
      return ans;
    });
    setRight(t);
  };

  return (
    <div>
      <input type="text" onChange={Eqq}></input>
      <br />
      <input type="text" onChange={Cow}></input>
      <br />
      <button onClick={Eva}>Calculate</button>
      <br />
      <div
        style={{
          display: "flex",

          justifyContent: " center",
        }}
      >
        <div style={{ display: "inline block" }}>{TableA()}</div>
        <div style={{ display: "inline block" }}>{TableB()}</div>
      </div>
    </div>
  );
}

export default Box;
