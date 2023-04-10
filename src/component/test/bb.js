import React, { useState, useEffect } from "react";
import { count, evaluate } from "mathjs";

const Box = () => {
  const [input, setInput] = useState(0);
  const [Equation, setEquation] = useState("x^2+3");
  const [final, setFinal] = useState([]);
  const [sai, setSai] = useState([]);

  useEffect(() => {
    let temp = [];
    for (let i = 0; i < input; i++) {
      temp.push(0);
    }
    console.log(temp, input);

    setFinal(temp);
    setSai(temp);
  }, [input]);

  const countBox = (event) => {
    var count = Number(event.target.value);
    setInput(count);
  };

  const Equationn = (event) => {
    var count = event.target.value;
    setEquation(count);
  };

  const calculateRoot = () => {
    let temp = sai.map((item, index) => {
      var value = item;
      var ans = evaluate(Equation, { x: value });
      const obj = {
        evaluate: ans,
      };
      return ans;
    });
    console.log(temp);

    setFinal(temp);
  };

  const inputValue = (event, index) => {
    let value = Number(event.target.value);
    let temp = JSON.parse(JSON.stringify(sai));
    temp[index] = value;
    setSai(temp);
  };

  const Gentable = () => {
    return sai.map((item, index) => {
      return (
        <div>
          <input key={index} onChange={(e) => inputValue(e, index)} />
        </div>
      );
    });
  };

  const GentableY = () => {
    return final.map((item, index) => {
      return (
        <div>
          <input placeholder={`${final[index]}`} />
        </div>
      );
    });
  };

  return (
    <div>
      <input onChange={Equationn}></input>
      <br />
      <input onChange={countBox}></input>
      <br></br>
      <div style={{ display: "inline-block" }}>{Gentable()}</div>
      <div style={{ display: "inline-block" }}>{GentableY()}</div>
      <button onClick={calculateRoot}>Calculate</button>
    </div>
  );
};

export default Box;
