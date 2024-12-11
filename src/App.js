import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./Components/Login";
import Home from "./Components/Home";
import Error404 from "./Components/Config/Error404";
import Error403 from "./Components/Config/Error403";
import GestionAdmin from "./Components/admin/GestionAdmin";
import RegistrarUsuario from "./Components/RegistrarUsuario";
import GestionDoctor from "./Components/admin/Doctor/GestionDoctor";
import RegistrarDoctor from "./Components/admin/Doctor/RegistrarDoctor";
import EditarDoctor from "./Components/admin/Doctor/EditarDoctor";
import GestionarHorario from "./Components/admin/HorarioAtencion/GestionarHorario";
import RegistrarHorario from "./Components/admin/HorarioAtencion/RegistrarHorario";
import EditarHorario from "./Components/admin/HorarioAtencion/EditarHorario";
import RegistrarCitas from "./Components/admin/Citas/RegistrarCitas";
import GestionCitas from "./Components/admin/Citas/GestionCitas";
import EditarCitas from "./Components/admin/Citas/EditarCitas";
import CitasUsuario from "./Components/user/CitasUsuario";
import EditarDatosUsuario from "./Components/user/EditarDatosUsuario";
import RegistrarCitaUser from "./Components/user/RegistrarCitaUser";
import SuccessPage from "./Components/AlertasVarios/Successpage";
import VerPdf from "./Components/user/VerPdf";
import EditarContra from "./Components/user/EditarContrasena";


function App() {
  return (
      <Router>
          <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/regUsuarios" element={<RegistrarUsuario />} />
              <Route path="*" element={<Error404/>} />
              <Route path="/error403" element={<Error403/>} />
              <Route path="/pago-exitoso" element={<SuccessPage />} />
                <Route path="/ver-pdf" element={<VerPdf />} />
              {/* ADMIN */}
                <Route path="/admin" element={<GestionAdmin />} />
                {/*Doctor*/}
                <Route path="/admin/doctors" element={<GestionDoctor />} />
                <Route path="/admin/doctors/reg" element={<RegistrarDoctor />} />
                <Route path={"/admin/doctors/edit/:id"} element={<EditarDoctor />} />
                {/*HorarioAtencion*/}
                <Route path="/admin/horarios" element={<GestionarHorario />} />
                <Route path="/admin/horarios/reg" element={<RegistrarHorario />} />
                <Route path="/admin/horarios/edit/:id" element={<EditarHorario />} />
                {/*Citas*/}
                <Route path="/admin/citas/reg" element={<RegistrarCitas />} />
                <Route path="/admin/citas" element={<GestionCitas />} />
                <Route path="/admin/citas/edit/:id" element={<EditarCitas />} />
              {/**/}
              {/*USUARIO*/}
                <Route path="/user/citas" element={<CitasUsuario />} />
                <Route path="/user/edit" element={<EditarDatosUsuario />} />
                <Route path="/user/regCitas" element={<RegistrarCitaUser />} />
                <Route path="/user/editarcontra" element={<EditarContra />} />
          </Routes>
      </Router>
  );
}

export default App;
