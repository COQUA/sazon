import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { getAllVentures, type Venture } from "../services/VentureService";

export default function Home() {
    const [emprendimientos, setEmprendimientos] = useState<Venture[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchVentures() {
            try {
                const data = await getAllVentures();
                setEmprendimientos(data);
            } catch (err: any) {
                console.error(err);
                setError(err.message || "Error al cargar los emprendimientos");
            } finally {
                setLoading(false);
            }
        }

        fetchVentures();
    }, []);

    return (
        <Layout userType="emprendedor" onLogout={() => {}}>
            <div className="flex flex-row min-h-screen text-gray-900">
                <main className="flex-1 p-8 overflow-y-auto">
                    <h1 className="mb-8 text-3xl font-bold text-blue-800">
                        Emprendimientos disponibles
                    </h1>

                    {loading && <p className="text-white">Cargando...</p>}
                    {error && <p className="text-red-500">{error}</p>}

                    <div className="flex flex-col gap-20 w-[60%] m-auto">
                        {emprendimientos.map((e) => (
                            <article
                                key={e.ventureId}
                                className="bg-[#0f1327] rounded-xl shadow-md hover:shadow-lg transition-all p-6 flex flex-col md:flex-row gap-4"
                            >
                                <div className="flex flex-col justify-between w-full">
                                    <div>
                                        <div className="flex flex-row items-center justify-between">
                                            <h2 className="text-4xl font-semibold text-[#0d2fee]">
                                                {e.name}
                                            </h2>
                                            <span className="text-[0.8rem] text-gray-300">
                                                Publicado el {new Date(e.createdAt ?? new Date()).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="mt-2 mb-4 text-white">{e.summary}</p>
                                        <div className="flex justify-center">
                                            {e.logo ? (
                                                <img
                                                    src={e.logo}
                                                    alt={e.name}
                                                    className="object-cover rounded-lg w-max h-90"
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center font-semibold text-gray-500 bg-gray-200 rounded-lg w-160 h-90">
                                                    Sin logo
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center justify-between mt-4 text-sm text-gray-200">
                                        <button onClick={() => navigate(`/venture-detalle/${e.ventureId}`)} className="bg-white text-[#0e2ee4] p-3 font-bold text-[1rem] rounded-full cursor-pointer hover:bg-[#0e2ee4] hover:text-white transition-all duration-300">
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
