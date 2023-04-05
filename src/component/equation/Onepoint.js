import { useState , useEffect } from "react"
import { Button, Container, Form, Row } from "react-bootstrap";
import { evaluate , parse } from 'mathjs'
import './styles.css';
import Myline2 from "./Myline2";
import Mytable2 from "./Mytable2";
import Popup from "./Popup";
import axios from "axios";

const Onepoint =()=>{
    const [valueerror , setValueerror] = useState([]);
    const data =[];
    const [valueIter, setValueIter] = useState([]);
    const [valueX, setValueX] = useState([]);
    const [Equation,setEquation] = useState("")
    const [X,setX] = useState(0)
    const [X0,setX0] = useState(0)
    const [Nodata,setNodata]=useState(false)
    const [Calerror,setCalerror] = useState(false)

    const setall = () =>{
        console.log(data)
        setValueIter(data.map((x)=>x.iteration));
        setValueX(data.map((x)=>x.X));
        // setValueXm(data.map((x)=>x.Xm));
        // setValueXr(data.map((x)=>x.Xr));
        setValueerror(data.map((x)=>x.error));
    }

    const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100;
    
    const CalOnepoint = (x0) => {
        var ea,Xnew=0 ;
        var f = Equation ;
        var iter = 0;
        var MAX = 50;
        const e = 0.00001;
        var obj={};
        do
        {
            Xnew = parse(f).evaluate({x:x0})
            console.log(Xnew)
            iter++;
                ea = error(x0,Xnew);
                obj = {
                    iteration: iter,
                    X: Xnew,
                    E: ea,
                    Xold: x0,
                    error : ea
                }
                data.push(obj)
                x0=Xnew;
        } while (ea > e && iter < MAX)
        setX(obj.X);
        console.log("X",X);
    }


    
    const inputEquation = (event) =>{
        console.log(event.target.value)
        setEquation(event.target.value)
    }

    const inputX0 = (event) =>{
        console.log(event.target.value)
        setX0(event.target.value)
    }

    const calculateRoot = () =>{
        const X0num = parseFloat(X0)
        CalOnepoint(X0num);
        setall();   
    }

    const setData =(event) =>{
        setNodata(true)
    }

    const [api,setApi] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8080/getsample/Onepoint')
          .then(response => {
            setApi(response.data);
          })
          .catch(error => {
            console.error(error);
          });
    }, []);


    const Sample = (event) =>{
        const value = event.target.getAttribute("value");
        console.log("XL",api[value].X0);
        console.log(api[value].Equation)
        setEquation(api[value].Equation)
        setX0(api[value].X0)
    }

    return (
            <Container>
                <br></br>
                <Row className="justify-content-center">
                    <div md="auto" className="text-center mb-4">
                        <h1>Onepoint Methods</h1>
                    </div>
                 </Row>
                <div className="wrapper" >
                
                    <div className="container1">
                        <Form>
                            <Form.Group className="mb-3" >
                                <Form.Label> Input f(x)</Form.Label>
                                <Form.Control type="text" id="equation" value={Equation} onChange={inputEquation} placeholder="Input f(x)" />
                                {/* <Form.Text className="text-Muted">สมการที่ดีคือ สมการที่สีเหลือง</Form.Text> */}
                                
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label> Input X0</Form.Label>
                                <Form.Control type="number" id="X0" value={X0} onChange={inputX0}  />
                                {/* <Form.Text className='text-Muted'>ค่า X ที่น้อยที่สุด รึป่าว ?</Form.Text> */}
                            {/* </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label> Input XR</Form.Label>
                                <Form.Control type="number" id="XR" onChange={inputXR}  />
                                {/* <Form.Text className='text-Muted'>ค่า X ที่มากที่สุด รึป่าว ?</Form.Text> */}
                            </Form.Group> 
                            <div className="row">
                            <div className="col">
                            <Button variant="primary" onClick={() => {
                                setX(0)
                                setCalerror(false)
                                calculateRoot();
                                setData();
                                console.log("setNodata",Nodata);
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
                    {Calerror == true&&<Popup />}
                    <div className="container2" >
                    <h4 style={{textAlignVertical: "center",textAlign: "center",}}>Onepoint Chart</h4>
                    {Nodata== false && <img src="https://cdn.discordapp.com/attachments/900255663081545761/1082615467186860084/Rolling-4.5s-200px_1.gif" alt="Loading..." />}
                    {Nodata && <Myline2 Iteration={valueIter} X= {valueX} name={"Onepoint"} Error={valueerror} />}
                    </div>
                </div>
                
                <br></br>
                <h2 style={{textAlignVertical: "center",textAlign: "center",}}>Answer = {X.toPrecision(7)}</h2>
                {Nodata== false && <img src="https://cdn.discordapp.com/attachments/900255663081545761/1082614220052516864/Ellipsis-12.5s-200px.gif" alt="Loading..." />}
                {Nodata && <Mytable2 Iteration={valueIter} X= {valueX} Error={valueerror}  />}
                
            </Container>
           
    )
}

export default Onepoint


