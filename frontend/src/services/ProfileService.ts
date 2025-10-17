import { api } from "./api";

export interface EntrepreneurProfile{
    userId:string;
    name: string;
    email: string;
}

export async function getEntrepreneurProfilePublic(userId: string) {
    const res = await api.get(`/profiles/entrepreneur/public/${userId}`);
    return res.data;
}

