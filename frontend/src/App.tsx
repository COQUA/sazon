import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Inicio from './Inicio'
import Acceso from './pages/Acceso'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import MisEmprendimientos from './pages/MisEmprendimientos'
import Perfil from './pages/Perfil'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'

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
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}