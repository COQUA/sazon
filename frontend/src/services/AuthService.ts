import { api } from "./api";

export async function registerUser(data:{
    email: string;
    password: string;
    name: string;
    role:"entrepreneur" | "investor";
}){
    const response = await api.post("/auth/register", data);
    return response.data;
}

export async function LoginUser(credentials:{
    email:string;
    password:string;
}){
    const response = await api.post("/auth/login", credentials);
    return response.data;
}