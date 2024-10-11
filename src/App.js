  // import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Componets/Navbar';
import Qrcode from './Componets/Qrcode';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Zipqrcode from './Componets/Zipqrcode';
// import PdFQrcode from './Componets/PdFQrcode';
import PdfWithSize from "./Componets/PdfWithSize";
// import Saqeeb from './Componets/Saqeeb';


function App() {

  return (
    <>
    <Navbar/>
    <Router>
        <Routes>
          <Route path="/" element={<Qrcode />} />
          <Route path="/upload" element={<Zipqrcode />} />
          {/* <Route path="/pdf" element={<PdFQrcode/>} /> */}
          <Route path="/pdf" element={<PdfWithSize/>} />
         
        </Routes>
      </Router>
    </>
  );
}

export default App;
