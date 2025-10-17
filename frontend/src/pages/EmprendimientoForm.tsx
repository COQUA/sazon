import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { createVenture, updateVenture, getVentureById, type Venture } from "../services/VentureService";

export default function EmprendimientoForm() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    // Formulario
    const [formData, setFormData] = useState({
        titulo: "",
        logo: "",
        name: "",
        location: "",
        venture_email: "",
        venture_phone: "",
        website: "",
        video_pitch: "",
        summary: "",
        problem: "",
        solution: "",
        differentiator: "",
        target_market: "",
        amount_requested: "",
        equity_offered: "",
        valuation: "",
        use_of_funds: "",
    });

    const [loading, setLoading] = useState(!!id); // true si vamos a editar
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // Traer datos si es edición
    useEffect(() => {
        if (!id) return;

        async function fetchVenture() {
        setLoading(true);
        try {
            const venture: Venture = await getVentureById(id!);
            if (venture) {
            setFormData({
                titulo: venture.name,
                logo: venture.logo || "",
                name: venture.name,
                location: venture.location || "",
                venture_email: venture.ventureEmail || "",
                venture_phone: venture.venturePhone || "",
                website: venture.website || "",
                video_pitch: venture.videoPitch || "",
                summary: venture.summary || "",
                problem: venture.problem || "",
                solution: venture.solution || "",
                differentiator: venture.differentiator || "",
                target_market: venture.targetMarket || "",
                amount_requested: venture.amountRequested?.toString() || "",
                equity_offered: venture.equityOffered?.toString() || "",
                valuation: venture.valuation?.toString() || "",
                use_of_funds: venture.useOfFunds || "",
            });
            } else {
            navigate("/mis-emprendimientos");
            }
        } catch (err) {
            console.error(err);
            navigate("/mis-emprendimientos");
        } finally {
            setLoading(false);
        }
        }

        fetchVenture();
    }, [id, navigate]);

    if (!user) return <p className="text-white">No autorizado</p>;
    if (loading) return <p className="p-10 text-white">Cargando...</p>;

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSaving(true);

        try {
        const venturePayload: Venture = {
            entrepreneurId: user.userId,
            name: formData.name,
            logo: formData.logo,
            location: formData.location,
            ventureEmail: formData.venture_email,
            venturePhone: formData.venture_phone,
            website: formData.website,
            videoPitch: formData.video_pitch,
            summary: formData.summary,
            problem: formData.problem,
            solution: formData.solution,
            differentiator: formData.differentiator,
            targetMarket: formData.target_market,
            amountRequested: formData.amount_requested
            ? parseInt(formData.amount_requested.replace(/[^\d]/g, ""))
            : undefined,
            equityOffered: formData.equity_offered
            ? parseFloat(formData.equity_offered.replace("%", ""))
            : undefined,
            valuation: formData.valuation
            ? parseFloat(formData.valuation.replace(/[^\d\.]/g, ""))
            : undefined,
            useOfFunds: formData.use_of_funds,
            createdAt: id ? undefined : new Date(),
            ventureId: id || undefined,
        };

        if (id) {
            await updateVenture(id, venturePayload);
        } else {
            await createVenture(venturePayload);
        }

        navigate("/mis-emprendimientos");
        } catch (err: any) {
        console.error(err);
        setError(err.message || "Ocurrió un error al guardar el emprendimiento");
        } finally {
        setSaving(false);
        }
    };

    return (
        <Layout userType="emprendedor" onLogout={() => {}}>
        <main className="flex-1 p-10 mt-5 text-white">
            <h1 className="mb-8 text-3xl font-bold text-center">
            {id ? "Editar Emprendimiento" : "Agregar Emprendimiento"}
            </h1>

            {error && <p className="mb-4 text-center text-red-500">{error}</p>}

            <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto bg-[#0B1A2A] p-8 rounded-2xl shadow-lg space-y-8"
            >
            {/* --- INFO BÁSICA --- */}
            <section>
                <h2 className="text-xl font-semibold mb-4 border-b border-[#1f3550] pb-2">
                Información General
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input
                    name="titulo"
                    placeholder="Título"
                    value={formData.titulo}
                    onChange={handleChange}
                    className="p-3 rounded bg-[#0E1F30]"
                    required
                />
                <input
                    name="name"
                    placeholder="Nombre del Emprendimiento"
                    value={formData.name}
                    onChange={handleChange}
                    className="p-3 rounded bg-[#0E1F30]"
                    required
                />
                <input
                    name="logo"
                    placeholder="URL del Logo"
                    value={formData.logo}
                    onChange={handleChange}
                    className="p-3 rounded bg-[#0E1F30]"
                />
                <input
                    name="location"
                    placeholder="Ubicación"
                    value={formData.location}
                    onChange={handleChange}
                    className="p-3 rounded bg-[#0E1F30]"
                />
                </div>
            </section>

            {/* --- CONTACTO --- */}
            <section>
                <h2 className="text-xl font-semibold mb-4 border-b border-[#1f3550] pb-2">
                Contacto
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <input
                    name="venture_email"
                    placeholder="Email del Venture"
                    value={formData.venture_email}
                    onChange={handleChange}
                    className="p-3 rounded bg-[#0E1F30]"
                />
                <input
                    name="venture_phone"
                    placeholder="Teléfono"
                    value={formData.venture_phone}
                    onChange={handleChange}
                    className="p-3 rounded bg-[#0E1F30]"
                />
                <input
                    name="website"
                    placeholder="Website"
                    value={formData.website}
                    onChange={handleChange}
                    className="p-3 rounded bg-[#0E1F30]"
                />
                </div>
            </section>

            {/* --- PITCH Y DESCRIPCIÓN --- */}
            <section>
                <h2 className="text-xl font-semibold mb-4 border-b border-[#1f3550] pb-2">
                Pitch y Descripción
                </h2>
                <div className="grid grid-cols-1 gap-4">
                <input
                    name="video_pitch"
                    placeholder="URL del Video Pitch"
                    value={formData.video_pitch}
                    onChange={handleChange}
                    className="p-3 rounded bg-[#0E1F30]"
                />
                <textarea
                    name="summary"
                    placeholder="Resumen"
                    value={formData.summary}
                    onChange={handleChange}
                    className="p-3 rounded bg-[#0E1F30] h-24"
                />
                <textarea
                    name="problem"
                    placeholder="Problema que resuelve"
                    value={formData.problem}
                    onChange={handleChange}
                    className="p-3 rounded bg-[#0E1F30] h-24"
                />
                <textarea
                    name="solution"
                    placeholder="Solución propuesta"
                    value={formData.solution}
                    onChange={handleChange}
                    className="p-3 rounded bg-[#0E1F30] h-24"
                />
                <textarea
                    name="differentiator"
                    placeholder="Diferenciador"
                    value={formData.differentiator}
                    onChange={handleChange}
                    className="p-3 rounded bg-[#0E1F30] h-24"
                />
                </div>
            </section>

            {/* --- DETALLES FINANCIEROS --- */}
            <section>
                <h2 className="text-xl font-semibold mb-4 border-b border-[#1f3550] pb-2">
                Detalles Financieros
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <input
                    name="target_market"
                    placeholder="Mercado objetivo"
                    value={formData.target_market}
                    onChange={handleChange}
                    className="p-3 rounded bg-[#0E1F30]"
                />
                <input
                    name="amount_requested"
                    placeholder="Monto Solicitado"
                    value={formData.amount_requested}
                    onChange={handleChange}
                    className="p-3 rounded bg-[#0E1F30]"
                />
                <input
                    name="equity_offered"
                    placeholder="Equity Ofrecido (%)"
                    value={formData.equity_offered}
                    onChange={handleChange}
                    className="p-3 rounded bg-[#0E1F30]"
                />
                <input
                    name="valuation"
                    placeholder="Valoración"
                    value={formData.valuation}
                    onChange={handleChange}
                    className="p-3 rounded bg-[#0E1F30]"
                />
                </div>
                <textarea
                name="use_of_funds"
                placeholder="Uso de Fondos"
                value={formData.use_of_funds}
                onChange={handleChange}
                className="p-3 rounded bg-[#0E1F30] h-24 mt-4"
                />
            </section>

            {/* --- BOTÓN --- */}
            <div className="flex justify-center">
                <button
                type="submit"
                disabled={saving}
                className="py-3 px-8 mt-6 font-bold text-white rounded-xl bg-[#0e2cd3] hover:bg-[#0c28b0] transition-all"
                >
                {saving ? "Guardando..." : id ? "Actualizar Emprendimiento" : "Crear Emprendimiento"}
                </button>
            </div>
            </form>
        </main>
        </Layout>
    );
}
