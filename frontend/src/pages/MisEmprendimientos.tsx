import Aside from "../components/Aside"
import { useState } from "react"
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom"
import Layout from "../components/Layout";


interface Emprendimiento{
    id: number;
    titulo: string;
    descripcion: string;
    fechaCreacion: string;
}

export default function MisEmprendimientos(){
    const[emprendimientos, setEmprendimientos] = useState<Emprendimiento[]>([
        {
            id:1,
            titulo: "Ayegurumi",
            descripcion: "Comisión de muñecos tejidos con crochet",
            fechaCreacion:"2025-16-10",
        },
        {
            id: 2,
            titulo: "TechBoost",
            descripcion: "Consultoría para startups tecnológicas.",
            fechaCreacion: "2025-09-20",
        }
    ])
    return(
        <Layout userType="emprendedor" onLogout={() => {}}>
        <div className="flex flex-row">
            <main className="flex-1 p-10 mt-5">
                <h1 className="mb-10 text-3xl font-bold text-white">Mis Emprendimientos</h1>
                
                {emprendimientos.length === 0 ? (
                    <Link 
                        to="/agregar-emprendimiento" 
                        className="flex flex-col items-center justify-center h-64 transition-colors bg-white border-2 border-gray-400 border-dashed shadow-sm rounded-2xl hover:border-blue-500 hover:bg-blue-50"
                    >
                        <FaPlus className="mb-3 text-4xl text-blue-500"/>
                        <p className="text-lg font-semibold text-gray-600">Agregar emprendimiento</p>
                    </Link>
                ):(
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg-grid-cols-3">
                        {emprendimientos.map((e) => (
                            <div key={e.id} className="bg-[#0f1327] rounded-2xl shadow-md hover:shadow-lg p-6 transition-all cursor-pointer hover:-translate-y-1">
                                <h2 className="text-2xl font-bold text-[#0e2ee4] mb-2">{e.titulo}</h2>
                                <p className="mb-4 text-white">{e.descripcion}</p>
                                <p className="font-medium text-gray-400">Creado el: {e.fechaCreacion}</p>
                            </div>
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