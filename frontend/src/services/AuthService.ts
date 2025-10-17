import { api } from "./api";

export async function registerUser(data:{
    email: string;
    password: string;
    name: string;
    role:"entrepreneur" | "investor";
}){
    const response = await api.post("/register", data);
    return response.data;
}

export async function LoginUser(data:{
    email:string;
    password:string;
}){
    const response = await api.post("/login", data);
    return response.data;
}