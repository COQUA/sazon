import { api } from "./api";

export interface Venture {
    ventureId?: string;
    entrepreneurId: string;
    name: string;
    logo?: string;
    location?: string;
    ventureEmail?: string;
    venturePhone?: string;
    website?: string;
    videoPitch?: string;
    summary?: string;
    problem?: string;
    solution?: string;
    differentiator?: string;
    targetMarket?: string;
    amountRequested?: number;
    equityOffered?: number;
    valuation?: number;
    useOfFunds?: string;
    createdAt?: Date;
}

function getAuthHeaders() {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getMyVentures(entrepreneurId: string) {
    const res = await api.get(`ventures/entrepreneur/${entrepreneurId}`, {
        headers: getAuthHeaders(),
    });
    return res.data as Venture[];
}

export async function createVenture(venture: Venture) {
    // Aseguramos que fecha_creacion sea string ISO
    const payload = { ...venture, fechaCreacion: venture.createdAt || new Date().toISOString() };
    const res = await api.post("/ventures", payload, {
        headers: getAuthHeaders(),
    });
    return res.data as Venture;
}

export async function getVentureById(ventureId: string) {
    const res = await api.get(`/ventures/${ventureId}`, {
        headers: getAuthHeaders(),
    });
    return res.data as Venture;
}

export async function updateVenture(ventureId: string, venture: Partial<Venture>) {
    const payload = venture.createdAt
        ? { ...venture, fecha_creacion: new Date(venture.createdAt).toISOString() }
        : venture;

    const res = await api.put(`/ventures/${ventureId}`, payload, {
        headers: getAuthHeaders(),
    });
    return res.data as Venture;
}

export async function deleteVenture(ventureId: string) {
    const res = await api.delete(`/ventures/${ventureId}`, {
        headers: getAuthHeaders(),
    });
    return res.status === 204;
}
