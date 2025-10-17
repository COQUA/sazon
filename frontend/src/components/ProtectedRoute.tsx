import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps{
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { user, loading } = useAuth();
    
    if (loading) {
        return <div className="p-8 mx-auto text-lg text-center loading">Cargando...</div>;
    }
    
    if (!user) {
        return <Navigate to="/" />;
    }
    
    return <>{children}</>;
};

export default ProtectedRoute;