import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Inicio from './Inicio'
import Acceso from './pages/Acceso'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import MisEmprendimientos from './pages/MisEmprendimientos'
import Perfil from './pages/Perfil'
import ProtectedRoute from './components/ProtectedRoute'
import EmprendimientoForm from './pages/EmprendimientoForm'
import { AuthProvider } from './context/AuthContext'
import EmprendimientoDetalle from './pages/EmprendimientoDetalle'
import EmprendimientoDetalleInversionista from './pages/EmprendimientoDetalleInversionista'

export default function App(){
    return(
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Inicio/>}/>
                    <Route path="/acceso" element={<Acceso/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>


                    <Route 
                        path="/home"   
                        element={
                        <ProtectedRoute>
                            <Home/>
                        </ProtectedRoute>
                    }/>

                    <Route 
                        path="/mis-emprendimientos" 
                        element={
                            <ProtectedRoute>
                                <MisEmprendimientos/>
                            </ProtectedRoute>
                        }/>
                    
                    <Route 
                        path="/perfil" 
                        element={
                            <ProtectedRoute>
                                <Perfil/>
                            </ProtectedRoute>}/>

                    <Route
                        path="/agregar-emprendimiento"
                        element={
                            <ProtectedRoute>
                                <EmprendimientoForm/>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/emprendimiento/:id"
                        element={
                            <ProtectedRoute>
                                <EmprendimientoDetalle/>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/venture-detalle/:id"
                        element={
                            <ProtectedRoute>
                                <EmprendimientoDetalleInversionista />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/editar-emprendimiento/:id"
                        element={
                            <ProtectedRoute>
                                <EmprendimientoForm/>
                            </ProtectedRoute>
                        }
                    />

                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}