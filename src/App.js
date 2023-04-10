import Home from "./home";
import Navbar from "./Navbar";
import { Routes, Route } from "react-router-dom";
import Bisection from "./component/equation/Bisection";
import FalsePosition from "./component/equation/FalsePosition";
import Newton_raphson from "./component/equation/Newton_raphson";
import Secant from "./component/equation/Secant";
import SNavbar from "./component/test/Sumo";
import Siao from "./component/test/Siao";
import Bublesort from "./component/test/Bublesort";
import Box from "./component/test/bb";
function App() {
  return (
    <div style={{ textAlignVertical: "center", textAlign: "center" }}>
      <SNavbar />
      <section>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Bisection" element={<Bisection />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Siao" element={<Siao />} />
          <Route path="/FalsePosition" element={<FalsePosition />} />
          <Route path="/Secant" element={<Secant />} />
          <Route path="/Bublesort" element={<Bublesort />} />
          <Route path="/Newton_raphson" element={<Newton_raphson />} />
          <Route path="/Box" element={<Box />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
