import { useState , useEffect} from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import { evaluate, derivative } from 'mathjs';
import './styles.css';
import Myline2 from "./Myline2";
import Popup from "./Popup";
import Mytable2 from "./Mytable2";
import axios from 'axios';


const Newton_raphson = () => {
  const [valueError, setValueError] = useState([]);
  const data = [];
  const [valueIter, setValueIter] = useState([]);
  const [valueX0, setValueX0] = useState([]);
  const [valueXNew, setValueXNew] = useState([]);
  const [valueEa, setValueEa] = useState([]);
  const [equation, setEquation] = useState("");
  const [x0, setX0] = useState(0);
  const [x, setX] = useState(0);
  const [diffEqua, setDiffEqua] = useState("");
  const [noData, setNoData] = useState(false);
  

  const setAll = () => {
    console.log(data);
    setValueIter(data.map((x) => x.iteration));
    setValueXNew(data.map((x) => x.XNew));
    setValueEa(data.map((x) => x.E));
    console.log("valueerr",valueEa)
    console.log("valuexNew",valueXNew)
  };

  const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

  const calNewtonRaphson = (x0) => {
    let xNew, f, fDiff, ea;
    let iter = 0;
    const MAX = 50;
    const e = 0.00001;
    let obj = {};
    do { 
        
      f = evaluate(equation, { x: x0 });
      fDiff = evaluate(diffEqua, { x: x0 });
      console.log("x0 =",x0)
      console.log("fdiff",fDiff)
      xNew = x0 - (f / fDiff);
      
      iter++;
      ea = error(x0, xNew);
      console.log("ea =",ea)
      console.log("e =",e)
      obj = {
        iteration: iter,
        XNew: xNew,
        X0: x0,
        E: ea,
      };
      data.push(obj);
      x0 = xNew;
      
    } while (ea > e && iter < MAX);
    setX(x0);
  };

  const inputEquation = (event) => {
    console.log(event.target.value);
    setEquation(event.target.value);
  };

  const inputX0 = (event) => {
    console.log(event.target.value);
    setX0(event.target.value);
  };

  const diffd =()=>{
    const diffInput = derivative(equation, "x").toString();
    console.log('diff',diffInput)
    setDiffEqua(diffInput);
  }
  const calculateRoot = () => {
    const X0num = parseFloat(x0);
    calNewtonRaphson(X0num);
    setAll();
  };

  const setData = (event) => {
    setNoData(true);
  };

  const [api,setApi] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8080/getsample/Newtonraphson')
      .then(response => {
        setApi(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const Sample = (event) =>{
    const value = event.target.getAttribute("value");
    console.log("X",api[value]);
    console.log(api[value].Equation)
    setX0(api[value].X0)
    setEquation(api[value].Equation)
    diffd()
  }
    return (
            <Container>
                <br></br>
                <Row className="justify-content-center">
                    <div md="auto" className="text-center mb-4">
                        <h1>Newton raphson Methods</h1>
                    </div>
                 </Row>
                <div className="wrapper" >
                
                    <div className="container1">   
                        <Form>
                            <Form.Group className="mb-3" >
                                <Form.Label> Input f(x)</Form.Label>
                                <Form.Control type="text" id="equation" value={equation} onChange={inputEquation} placeholder="Input f(x)" />
                                {/* <Form.Text className="text-Muted">สมการที่ดีคือ สมการที่สีเหลือง</Form.Text> */}
                                
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label> Input X0</Form.Label>
                                <Form.Control type="number" id="X0"value={x0} onChange={inputX0}  />
                                {/* <Form.Text className='text-Muted'>ค่า X ที่น้อยที่สุด รึป่าว ?</Form.Text> */}
                            </Form.Group>
                            {/* <Form.Group className='mb-3'>
                                <Form.Label> Input XR</Form.Label>
                                <Form.Control type="number" id="XR" onChange={inputXR}  />
                                <Form.Text className='text-Muted'>ค่า X ที่มากที่สุด รึป่าว ?</Form.Text>
                            </Form.Group> */}
                            <div className="row">
                            <div className="col">
                            <Button variant="primary" onClick={() => {
                                diffd()
                                setX(0)
                                calculateRoot();
                                setData();
                                console.log("setNodata",noData);
                                }}>
                                Calculate
                            </Button>
                            </div>
                            <div className="col-sm-6">
                            <div className="dropdown">
                                <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                    Samples
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                  <li><a className="dropdown-item" value="0" onClick={Sample}>Sample1</a></li>
                                  {/* <li><a className="dropdown-item" href="#">Sample2</a></li>
                                  <li><a className="dropdown-item" href="#">Sample3</a></li> */}
                                </ul>
                                </div>
                            </div>
                            </div>
                        </Form>
                    </div>
                    
                    {/* {console.log("cal",Calerror)}
                    {Calerror == true&&<Popup />} */}
                    <div className="container2" >
                    <h4 style={{textAlignVertical: "center",textAlign: "center",}}>Newton raphson Chart</h4>
                    {noData== false && <img src="https://cdn.discordapp.com/attachments/900255663081545761/1082615467186860084/Rolling-4.5s-200px_1.gif" alt="Loading..." />}
                    {noData && <Myline2 Iteration={valueIter} X= {valueXNew}  name={"Newton_raphson"} Error={valueEa} />}
                    </div>
                </div>
                
                <br></br>
                <h2 style={{textAlignVertical: "center",textAlign: "center",}}>Answer = {x.toPrecision(7)}</h2>
                {noData== false && <img src="https://cdn.discordapp.com/attachments/900255663081545761/1082614220052516864/Ellipsis-12.5s-200px.gif" alt="Loading..." />}
                 {noData && <Mytable2 Iteration={valueIter} X= {valueXNew}  Error={valueEa}  />}
                
            </Container>
           
    )
}
export default Newton_raphson


