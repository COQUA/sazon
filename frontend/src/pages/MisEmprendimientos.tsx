import { useEffect, useState } from "react"
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom"
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { type Venture, getMyVentures } from "../services/VentureService";

export default function MisEmprendimientos(){
    const { user } = useAuth();
    const[emprendimientos, setEmprendimientos] = useState<Venture[]>([]);
    const[loading, setLoading] = useState(true);

    useEffect(() => {
        if(!user) return;

        async function fetchVentures(){
            setLoading(true);
            try {
                const data = await getMyVentures(user?.userId!);
                setEmprendimientos(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchVentures();
    }, [user]);

    return(
        <Layout userType="emprendedor" onLogout={() => {}}>
            <div className="flex flex-row">
            <main className="flex-1 p-10 mt-5">
            <h1 className="mb-10 text-3xl font-bold text-white">Mis Emprendimientos</h1>

            {loading ? (
                <p className="text-lg text-white">Cargando...</p>
            ) : emprendimientos.length === 0 ? (
                <Link 
                to="/agregar-emprendimiento" 
                className="flex flex-col items-center justify-center h-64 transition-colors bg-transparent border-2 border-gray-400 border-dashed shadow-sm rounded-2xl hover:border-blue-500 hover:bg-blue-50"
                >
                <FaPlus className="mb-3 text-4xl text-blue-500"/>
                <p className="text-lg font-semibold text-gray-600">Agregar emprendimiento</p>
                </Link>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg-grid-cols-3">
                {emprendimientos.map((e) => (
                    <Link key={e.ventureId} to={`/emprendimiento/${e.ventureId}`} className="bg-[#0f1327] rounded-2xl shadow-md hover:shadow-lg p-6 transition-all hover:-translate-y-1">
                    <h2 className="text-2xl font-bold text-[#0e2ee4] mb-2">{e.name}</h2>
                    <p className="mb-4 text-white">{e.summary}</p>
                    <p className="font-medium text-gray-400">Creado el: {new Date(e.createdAt ?? "").toLocaleDateString()}</p>
                    </Link>
                ))}

                <Link to="/agregar-emprendimiento" className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 bg-transparent rounded-2xl shadow-sm hover:border-[#0e2cd3] hover:bg-[#ececec] transition-colors">
                    <FaPlus className="text-3xl text-[#0e2cd3] mb-3"/>
                    <p className="text-lg font-semibold text-gray-600">Agregar nuevo emprendimiento</p>
                </Link>
                </div>
            )}
            </main>
        </div>
        </Layout>
    )
}