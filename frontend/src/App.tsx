import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Inicio from './Inicio'
import Acceso from './pages/Acceso'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import MisEmprendimientos from './pages/MisEmprendimientos'
import Perfil from './pages/Perfil'

export default function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Inicio/>}/>
                <Route path="/acceso" element={<Acceso/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/mis-emprendimientos" element={<MisEmprendimientos/>}/>
                <Route path="/perfil" element={<Perfil/>}/>
            </Routes>
        </BrowserRouter>
    )
}