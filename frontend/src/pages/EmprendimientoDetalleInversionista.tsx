import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { getVentureById, type Venture } from "../services/VentureService";

export default function EmprendimientoDetalleInversionista() {
    const { id } = useParams<{ id: string }>();
    const [venture, setVenture] = useState<Venture | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) return;

        async function fetchVenture() {
            try {
                const data = await getVentureById(id!);
                setVenture(data);
            } catch (err: any) {
                setError(err.message || "Error al cargar el emprendimiento");
            } finally {
                setLoading(false);
            }
        }

        fetchVenture();
    }, [id]);

    if (loading) return <p className="p-10 text-white">Cargando...</p>;
    if (error) return <p className="p-10 text-red-500">{error}</p>;
    if (!venture) return <p className="p-10 text-white">Emprendimiento no encontrado</p>;

    return (
        <Layout userType="inversionista" onLogout={() => {}}>
            <main className="flex-1 p-10 text-white">
                <h1 className="mb-6 text-4xl font-bold">{venture.name}</h1>
                {venture.logo && (
                    <img
                        src={venture.logo}
                        alt={venture.name}
                        className="object-cover mb-6 w-80 h-80 rounded-xl"
                    />
                )}
                <p className="mb-4">{venture.summary}</p>
                {venture.problem && <p><strong>Problema:</strong> {venture.problem}</p>}
                {venture.solution && <p><strong>Solución:</strong> {venture.solution}</p>}
                {venture.differentiator && <p><strong>Diferenciador:</strong> {venture.differentiator}</p>}
                {venture.targetMarket && <p><strong>Mercado objetivo:</strong> {venture.targetMarket}</p>}
                {venture.amountRequested !== undefined && <p><strong>Monto solicitado:</strong> ${venture.amountRequested.toLocaleString()}</p>}
                {venture.equityOffered !== undefined && <p><strong>Equity ofrecido:</strong> {venture.equityOffered}%</p>}
                {venture.valuation !== undefined && <p><strong>Valoración:</strong> ${venture.valuation.toLocaleString()}</p>}
                {venture.useOfFunds && <p><strong>Uso de fondos:</strong> {venture.useOfFunds}</p>}
            </main>
        </Layout>
    );
}
