import Home from "./home";
import Navbar from "./Navbar";
import { Routes, Route } from "react-router-dom";
import Bisection from "./component/equation/Bisection";
import Matrix_test from "./component/matrix/Matrix_test";
import FalsePosition from "./component/equation/FalsePosition";
import Onepoint from "./component/equation/Onepoint";
import Newton_raphson from "./component/equation/Newton_raphson";
import Secant from "./component/equation/Secant";
import Taylor from "./component/equation/Taylor_series";
import Cramer from "./component/matrix/Cramer";
import SumoNavbar from "./component/test/Sumo";
import Siao from "./component/test/Siao";
import Bublesort from "./component/test/Bublesort";
function App() {
  return (
    <div style={{ textAlignVertical: "center", textAlign: "center" }}>
      <SumoNavbar />
      <section>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Bisection" element={<Bisection />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Siao" element={<Siao />} />
          <Route path="/FalsePosition" element={<FalsePosition />} />
          <Route path="/Newton_raphson" element={<Newton_raphson />} />
          <Route path="/Secant" element={<Secant />} />
          <Route path="/Bublesort" element={<Bublesort />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
