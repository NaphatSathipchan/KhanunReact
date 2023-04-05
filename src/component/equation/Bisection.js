import { useState, useEffect } from "react";
import { Button, Container, Form, Row, Dropdown } from "react-bootstrap";
import { evaluate } from "mathjs";
import "./styles.css";
import Myline from "./Myline";
import Mytable from "./Mytable";
import Popup from "./Popup";
import axios from "axios";

const Bisection = () => {
  const [valueerror, setValueerror] = useState([]);
  const data = [];
  const [valueIter, setValueIter] = useState([]);
  const [valueXl, setValueXl] = useState([]);
  const [valueXm, setValueXm] = useState([]);
  const [valueXr, setValueXr] = useState([]);
  const [Equation, setEquation] = useState(""); //(x^4)-13
  const [X, setX] = useState(0);
  const [XL, setXL] = useState(0);
  const [XR, setXR] = useState(0);
  const [Nodata, setNodata] = useState(false);
  const [Calerror, setCalerror] = useState(false);

  const setall = () => {
    console.log(data);
    setValueIter(data.map((x) => x.iteration));
    setValueXl(data.map((x) => x.Xl));
    setValueXm(data.map((x) => x.Xm));
    setValueXr(data.map((x) => x.Xr));
    setValueerror(data.map((x) => x.error));
  };

  const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

  const Calbisection = (xl, xr) => {
    var xm, fXm, fXr, ea, fXl;
    var iter = 0;
    var MAX = 50;
    const e = 0.00001;
    var obj = {};
    xm = (xl + xr) / 2.0;
    fXr = evaluate(Equation, { x: xr });
    fXl = evaluate(Equation, { x: xl });
    console.log("fXr * fXl > 0 =", fXr * fXm);
    if (fXr * fXl > 0) {
      console.log("error");
      setCalerror(true);
      setNodata(false);
      return;
    }
    do {
      xm = (xl + xr) / 2.0;
      fXr = evaluate(Equation, { x: xr });
      fXm = evaluate(Equation, { x: xm });
      iter++;
      if (fXm * fXr > 0) {
        ea = error(xr, xm);
        obj = {
          iteration: iter,
          Xl: xl,
          Xm: xm,
          Xr: xr,
          error: ea,
        };
        data.push(obj);
        xr = xm;
      } else if (fXm * fXr < 0) {
        ea = error(xl, xm);
        obj = {
          iteration: iter,
          Xl: xl,
          Xm: xm,
          Xr: xr,
          error: ea,
        };
        data.push(obj);
        xl = xm;
      }
    } while (ea > e && iter < MAX);
    setX(xm);
  };

  const inputEquation = (event) => {
    console.log(event.target.value);
    setEquation(event.target.value);
  };

  const inputXL = (event) => {
    console.log(event.target.value);
    setXL(event.target.value);
  };

  const inputXR = (event) => {
    console.log(event.target.value);
    setXR(event.target.value);
  };

  const calculateRoot = () => {
    console.log("asdadspkoasdo", api);
    const xlnum = parseFloat(XL);
    const xrnum = parseFloat(XR);
    Calbisection(xlnum, xrnum);
    setall();
  };

  const setData = (event) => {
    setNodata(true);
  };

  const [api, setApi] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/getsample/Bisection")
      .then((response) => {
        setApi(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const Sample = (event) => {
    const value = event.target.getAttribute("value");
    console.log("XL", api[value].XL);
    console.log("XR", api[value].XR);
    console.log(api[value].Equation);
    setEquation(api[value].Equation);
    setXL(api[value].XL);
    setXR(api[value].XR);
  };

  return (
    <Container>
      <br></br>
      <Row className="justify-content-center">
        <div md="auto" className="text-center mb-4">
          <h1>Bisection Methods</h1>
        </div>
      </Row>
      <div className="wrapper">
        <div className="container1">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label> Input f(x)</Form.Label>
              <Form.Control
                type="text"
                id="equation"
                value={Equation}
                onChange={inputEquation}
                placeholder="Input f(x)"
              />
              {/* <Form.Text className="text-Muted">สมการที่ดีคือ สมการที่สีเหลือง</Form.Text> */}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label> Input XL</Form.Label>
              <Form.Control
                type="number"
                id="XL"
                value={XL}
                onChange={inputXL}
              />
              {/* <Form.Text className='text-Muted'>ค่า X ที่น้อยที่สุด รึป่าว ?</Form.Text> */}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label> Input XR</Form.Label>
              <Form.Control
                type="number"
                id="XR"
                value={XR}
                onChange={inputXR}
              />
              {/* <Form.Text className='text-Muted'>ค่า X ที่มากที่สุด รึป่าว ?</Form.Text> */}
            </Form.Group>
            <div className="row">
              <div className="col">
                <Button
                  variant="primary"
                  onClick={() => {
                    setX(0);
                    setCalerror(false);
                    calculateRoot();
                    setData();
                    console.log("setNodata", Nodata);
                  }}
                >
                  Calculate
                </Button>
              </div>
            </div>
          </Form>
        </div>

        {console.log("cal", Calerror)}
        {Calerror == true && <Popup />}
        <div className="container2">
          <h4 style={{ textAlignVertical: "center", textAlign: "center" }}>
            Bisection Chart
          </h4>
          {Nodata == false && (
            <img
              src="https://cdn.discordapp.com/attachments/900255663081545761/1082615467186860084/Rolling-4.5s-200px_1.gif"
              alt="Loading..."
            />
          )}
          {Nodata && (
            <Myline
              Iteration={valueIter}
              Xl={valueXl}
              Xm={valueXm}
              Xr={valueXr}
              name={"Bisection"}
              Error={valueerror}
            />
          )}
        </div>
      </div>

      <br></br>
      <h2 style={{ textAlignVertical: "center", textAlign: "center" }}>
        Answer = {X.toPrecision(7)}
      </h2>
      {Nodata == false && (
        <img
          src="https://media.discordapp.net/attachments/961906858698895390/961909718828318770/ezgif.com-gif-maker_2_2.gif?width=372&height=662"
          alt="Loading..."
        />
      )}
      {Nodata && (
        <Mytable
          Iteration={valueIter}
          XL={valueXl}
          Xm={valueXm}
          Xr={valueXr}
          Error={valueerror}
        />
      )}
    </Container>
  );
};

export default Bisection;
