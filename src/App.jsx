import { Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Home from './Views/Home/Home';
import RegisterUsuario from './Components/Register/RegisterUsuario';
import RegisterEmpresa from './Components/Register/RegisterEmpresa';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/registro/empresa" element={<RegisterEmpresa />} />
        <Route path="/registro/usuario" element={<RegisterUsuario />} />
      </Routes>
    </>
  );
}

export default App;
