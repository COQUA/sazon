import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getVentureById, deleteVenture, type Venture } from "../services/VentureService";

export default function EmprendimientoDetalle() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [venture, setVenture] = useState<Venture | null>(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if (!id) return;

        async function fetchVenture() {
        setLoading(true);
        try {
            const data = await getVentureById(id!);
            setVenture(data);
        } catch (error) {
            console.error(error);
            navigate("/mis-emprendimientos");
        } finally {
            setLoading(false);
        }
        }

        fetchVenture();
    }, [id, navigate]);

    const handleDelete = async () => {
        if (!venture) return;
        if (!confirm("¿Estás seguro de que quieres eliminar este emprendimiento?")) return;

    setDeleting(true);
    try {
        await deleteVenture(venture.ventureId!);
            navigate("/mis-emprendimientos");
        } catch (error) {
            console.error(error);
            alert("Ocurrió un error al eliminar el emprendimiento");
        } finally {
            setDeleting(false);
        }
    };

    if (loading) return <p className="p-10 text-white">Cargando...</p>;
    if (!venture) return <p className="p-10 text-white">Emprendimiento no encontrado</p>;

    return (
        <Layout userType="emprendedor" onLogout={() => {}}>
        <main className="flex-1 p-10 mt-5 text-white">
            <h1 className="mb-6 text-3xl font-bold">{venture.name}</h1>
            {venture.logo && <img src={venture.logo} alt={venture.name} className="w-64 mb-6 rounded" />}

            <section className="mb-4">
            <h2 className="text-xl font-semibold">Información General</h2>
            <p><strong>Ubicación:</strong> {venture.location || "-"}</p>
            <p><strong>Creado el:</strong> {new Date(venture.createdAt ?? "").toLocaleDateString()}</p>
            </section>

            <section className="mb-4">
            <h2 className="text-xl font-semibold">Contacto</h2>
            <p><strong>Email:</strong> {venture.ventureEmail || "-"}</p>
            <p><strong>Teléfono:</strong> {venture.venturePhone || "-"}</p>
            <p><strong>Website:</strong> {venture.website ? <a href={venture.website} className="text-blue-400">{venture.website}</a> : "-"}</p>
            </section>

            <section className="mb-4">
            <h2 className="text-xl font-semibold">Pitch y Descripción</h2>
            {venture.videoPitch && (
                <p>
                <strong>Video Pitch:</strong>{" "}
                <a href={venture.videoPitch} className="text-blue-400">{venture.videoPitch}</a>
                </p>
            )}
            <p><strong>Resumen:</strong> {venture.summary || "-"}</p>
            <p><strong>Problema:</strong> {venture.problem || "-"}</p>
            <p><strong>Solución:</strong> {venture.solution || "-"}</p>
            <p><strong>Diferenciador:</strong> {venture.differentiator || "-"}</p>
            </section>

            <section className="mb-4">
            <h2 className="text-xl font-semibold">Detalles Financieros</h2>
            <p><strong>Mercado objetivo:</strong> {venture.targetMarket || "-"}</p>
            <p><strong>Monto solicitado:</strong> {venture.amountRequested?.toLocaleString() || "-"}</p>
            <p><strong>Equity ofrecido:</strong> {venture.equityOffered ? Number(venture.equityOffered).toFixed(2) + "%" : "-"}</p>
            <p><strong>Valoración:</strong> {venture.valuation ? "$" + Number(venture.valuation).toLocaleString() : "-"}</p>
            <p><strong>Uso de fondos:</strong> {venture.useOfFunds || "-"}</p>
            </section>

            {/* Botones de acción */}
            <div className="flex gap-4 mt-6">
            <Link
                to={`/editar-emprendimiento/${venture.ventureId}`}
                className="px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
            >
                Modificar
            </Link>
            <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 font-semibold text-white bg-red-600 rounded cursor-pointer hover:bg-red-700"
            >
                {deleting ? "Eliminando..." : "Eliminar"}
            </button>
            </div>
        </main>
        </Layout>
    );
}
