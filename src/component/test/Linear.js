import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet";
import { inv, multiply } from "mathjs";
import { Calli } from "./calli";

const Linear = () => {
  let numgen;
  let answer = 0;
  const giventable = [];
  const [table, setTable] = useState();
  const [answerall, setAnswerall] = useState();
  let X = 0;
  let arr_x = [];
  let arr_y = [];
  let cal_y = [];

  const createtable = (numgen) => {
    let tablex = [];
    let tabley = [];
    for (let i = 0; i < numgen; i++) {
      tablex.push(
        <div>
          <input
            style={{ marginLeft: "30px" }}
            placeholder={"value x" + (i + 1)}
            id={"rowx" + i}
          />
        </div>
      );
      tabley.push(
        <div>
          <input placeholder={"value f(x)" + (i + 1)} id={"rowy" + i} />
        </div>
      );
    }
    giventable.push({ x: tablex, y: tabley });
  };

  const resultttable = () => {
    console.log(giventable);
    return (
      <Main>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            {giventable.map((data) => {
              return <div>{data.x}</div>;
            })}
          </div>
          <div>
            {giventable.map((data) => {
              return <div id="myInput">{data.y}</div>;
            })}
          </div>
        </div>

        <ButTon onClick={gotoCal} id="myBtn">
          <CaretRightOutlined />
          Calculate
          <CaretLeftOutlined />
        </ButTon>
        <Helmet>
          <script>
            {
              "var input = document.getElementById('myInput');input.addEventListener('keypress', function (event) {if (event.key === 'Enter') {event.preventDefault();document.getElementById('myBtn').click();}});"
            }
          </script>
        </Helmet>
      </Main>
    );
  };

  const result = () => {
    console.log(arr_x);
    console.log(cal_y);
    let actual_value = {
      x: arr_x,
      y: arr_y,
      mode: "markers",
      type: "scatter",
      name: "actual value",
    };

    let cal_value = {
      x: arr_x,
      y: cal_y,
      mode: "lines+markers",
      type: "scatter",
      name: "cal value",
    };

    let X_value = {
      x: [X],
      y: [answer],
      mode: "markers",
      type: "scatter",
      name: "X value",
      marker: {
        size: 20,
      },
    };
    let data = [actual_value, cal_value, X_value];
    return (
      <Main>
        <Answer>Answer = {answer.toPrecision(4)}</Answer>
      </Main>
    );
  };

  const inputnumtable = (event) => {
    numgen = parseInt(event.target.value);
    console.log("numgen", numgen);
    createtable(numgen);
    setTable(resultttable());
  };

  const gotoCal = () => {
    X = parseFloat(document.getElementById("X").value);
    numgen = parseInt(document.getElementById("numgen").value);
    for (let i = 0; i < numgen; i++) {
      arr_x.push(parseFloat(document.getElementById("rowx" + i).value));
      arr_y.push(parseFloat(document.getElementById("rowy" + i).value));
    }
    const { newanswer, new_cal_y } = Calli(X, numgen, arr_x, arr_y);
    answer = newanswer;
    cal_y = new_cal_y;
    setAnswerall(result());
  };

  return (
    <Main>
      <Headd>Linear Regression</Headd>
      <Label>
        X
        <Input id="X" />
      </Label>
      <Label>
        Number of given
        <Input id="numgen" placeholder="0" onChange={inputnumtable} />
      </Label>
      {table}
      {answerall}
    </Main>
  );
};

export default Linear;

const Headd = styled.div`
  font-size: xx-large;
  margin-top: 30px;
`;

const Main = styled.div`
  font-size: larger;
  font-weight: bold;
  text-align: center;
`;

const Label = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
`;

const Input = styled.input`
  width: 200px;
  margin-left: 50px;
`;

const ButTon = styled.div`
  font-size: xx-large;
  margin-top: 80px;
  text-align: center;
  cursor: pointer;
  margin-bottom: 80px;
  :hover {
    color: red;
    font-weight: bolder;
    text-decoration: underline;
  }
`;

const Answer = styled.div`
  text-align: center;
  font-size: x-large;
  margin-top: 10px;
  margin-bottom: 10px;
  color: red;
`;
