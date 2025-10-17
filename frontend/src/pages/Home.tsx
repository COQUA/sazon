import { useState } from "react";
import logoDemo from "../assets/logoDemo.jpg"; // opcional, un logo de ejemplo
import Layout from "../components/Layout";


interface Emprendimiento {
    id: number;
    nombre: string;
    descripcion: string;
    categoria: string;
    fecha: string;
    logo?: string;
}

export default function Home() {
    const [emprendimientos] = useState<Emprendimiento[]>([
        {
        id: 1,
        nombre: "EcoMarket",
        descripcion: "Plataforma de venta de productos sustentables creada por jóvenes emprendedores.",
        categoria: "Sustentabilidad",
        fecha: "2025-10-01",
        logo: logoDemo,
        },
        {
        id: 2,
        nombre: "TechBoost",
        descripcion: "Aceleradora que conecta startups tecnológicas con inversores interesados en innovación.",
        categoria: "Tecnología",
        fecha: "2025-09-25",
        },
        {
        id: 3,
        nombre: "AgroLink",
        descripcion: "Marketplace que digitaliza la compra y venta de insumos agrícolas.",
        categoria: "Agrotech",
        fecha: "2025-08-15",
        logo: logoDemo,
        },
    ]);

    return (
        <Layout userType="emprendedor" onLogout={() => {}}>
            <div className="flex flex-row min-h-screen text-gray-900">
                

                {/* Main con scroll */}
                <main className="flex-1 p-8 overflow-y-auto">
                    <h1 className="mb-8 text-3xl font-bold text-blue-800">Emprendimientos disponibles</h1>

                    <div className="flex flex-col gap-20 w-[60%] m-auto">
                    {emprendimientos.map((e) => (
                        <article
                        key={e.id}
                        className="bg-[#0f1327] rounded-xl shadow-md hover:shadow-lg transition-all p-6 flex flex-col md:flex-row gap-4"
                        >

                        <div className="flex flex-col justify-between w-full">
                            <div>
                                <div className="flex flex-row items-center justify-between">
                                    <h2 className="text-4xl font-semibold text-[#0d2fee]">{e.nombre}</h2>
                                    <span className="text-gray-300">Publicado el {e.fecha}</span>
                                </div>
                                <p className="mt-2 mb-4 text-white">{e.descripcion}</p>
                                <div className="flex justify-center">
                                    {e.logo ? (
                                    <img
                                        src={e.logo}
                                        alt={e.nombre}
                                        className="object-cover rounded-lg w-max h-90 "
                                    />
                                    ) : (
                                    <div className="flex items-center justify-center font-semibold text-gray-500 bg-gray-200 rounded-lg w-160 h-90">
                                        Sin logo
                                    </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center justify-between mt-4 text-sm text-gray-200">
                            <span className="bg-[#0e2ee4] text-white px-3 py-1 rounded-full font-medium">
                                Categoría: {e.categoria}
                            </span>

                            <button className="bg-white text-[#0e2ee4] p-3 font-bold text-[1rem] rounded-full cursor-pointer hover:bg-[#0e2ee4] hover:text-white transition-all duration-300">
                                ¡Conocer más!
                            </button>
                            </div>
                        </div>
                        </article>
                    ))}
                    </div>
                </main>
            </div>
        </Layout>
    );
}
