import Layout from "../components/Layout"
import { useAuth } from "../context/AuthContext"

export default function Perfil(){
    const {user} = useAuth();

    function mapRoleToUserType(role: "entrepreneur" | "investor" | "admin" | undefined): "emprendedor" | "inversionista" {
        if (role === "entrepreneur") return "emprendedor";
            return "inversionista"; 
    }

    return(
        <Layout userType={mapRoleToUserType(user?.role)} onLogout={() => {}}>
        <div className="flex flex-row">
            
            <div className="flex-1 p-8 text-white">
                <h1 className="text-3xl font-bold">Mi Perfil</h1>
                <h1>Nombre: {user?.name}</h1>
                <h1>Email: {user?.email}</h1>
            </div>
        </div>
        </Layout>
    )
}