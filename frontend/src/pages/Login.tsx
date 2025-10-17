import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { LoginUser } from "../services/AuthService"
import { BiSolidError } from "react-icons/bi"
import { useAuth, type User } from "../context/AuthContext"

export default function Login(){
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async(e:React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const {user, token} : {user:User; token:string} = await LoginUser(formData);

            login(user, token);

            navigate("/home");
        } catch (err:any) {
            console.error(err);
            setError(err.response?.data?.error || "Error al iniciar sesión")
        }
    }

    return(
        <div className="flex items-center justify-center w-screen min-h-screen align-middle">
            <div className="flex flex-col bg-[#080b17] w-[90vh] h-[90vh] rounded-2xl items-center align-middle justify-center">
                <div className="flex items-center justify-center rounded-2xl">
                <img src="" alt="GrowSite" className="w-auto " />
                </div>

                <div className="flex flex-col justify-center p-8 md:p-20">
                <h1 className="text-[#0e2cd3] text-start font-semibold text-5xl md:text-5xl mb-8">
                    Iniciar Sesión
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full h-13 px-5 rounded-xl bg-[#0E1F30] text-white placeholder-white/50 text-2xl leading-none outline-none focus:ring-2 focus:ring-[#0e2cd3]/60"
                    />

                    <label htmlFor="password" className="sr-only">Contraseña</label>
                    <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full h-13 px-5 rounded-xl bg-[#0E1F30] text-white placeholder-white/50 text-2xl leading-none outline-none focus:ring-2 focus:ring-[#0e2cd3]/60"
                    />

                    <div className="flex items-center justify-between">
                    <span className="text-xl text-white/80">
                        ¿No tienes una cuenta?{" "}
                        <Link to="/register" className="text-[#0e2cd3] font-semibold hover:underline">
                        Registrarse
                        </Link>
                    </span>
                    </div>

                    <button
                    type="submit"
                    className="w-full h-16 rounded-full text-3xl font-bold leading-none bg-transparent mt-2 text-[#0e2cd3] border-[3px] border-[#0e2cd3] hover:bg-[#0e2cd3] hover:text-[#020513] cursor-pointer transition-colors"
                    >
                    Ingresar
                    </button>

                    {error && (
                    <div className="p-3 mb-6 text-[1.7rem] text-[#0a0000] font-[600] rounded-xl bg-[#f48383] flex flex-row items-center">
                    <BiSolidError className="w-9 h-9 mr-2 text-[#0a0000] font-black"/>
                    {error}
                    </div>
                    )}
                </form>
                </div>
            </div>
        </div>       
    )
}