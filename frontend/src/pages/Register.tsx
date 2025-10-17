import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { GrFormPreviousLink } from "react-icons/gr";
import { registerUser } from "../services/AuthService";
import { BiSolidError } from "react-icons/bi";

export default function Register(){
    const [userType, setUserType] = useState<"emprendedor" | "inversionista" | null>(null);
    const [formData, setFormData] = useState({email:"", password:"", name:""});
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({... formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e:React.FormEvent) =>{
        e.preventDefault();
        setError("");

        try {
            const role = userType === "emprendedor" ? "entrepreneur" : "investor";

            await registerUser({
                email:formData.email,
                password: formData.password,
                name: formData.name,
                role,
            });

            alert("Registro exitoso");
            navigate("/login");
        } catch (err:any) {
            console.error(err);
            setError(err.response?.data?.error || "Error al registrarse");
        }
    }

    return(
        <div className="flex items-center justify-center w-screen min-h-screen align-middle">
            <div className="flex flex-col bg-[#080b17] w-[90vh] h-[90vh] rounded-2xl items-center align-middle justify-center">
                <div className="flex items-center justify-center rounded-2xl">
                    <img src="" alt="GrowSite" className="w-auto " />
                </div>

                <div className="flex flex-col justify-center p-8 md:p-20">
                <h1 className="text-[#0e2cd3] text-center font-semibold text-5xl md:text-5xl mb-8">
                    Registrarse
                </h1>

                {!userType && (
                    <div className="flex flex-col space-y-6">
                        <span className="text-xl text-center text-white">¿Qué tipo de usuario eres?</span>
                        <div className="flex space-x-6">
                            <button onClick={() => setUserType("emprendedor")} className="flex-1 py-4 font-semibold text-white transition-colors bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700">
                                Emprendedor
                            </button>

                            <button onClick={() => setUserType("inversionista")} className="flex-1 py-4 font-semibold text-white transition-colors bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700">
                                Inversionista
                            </button>
                        </div>
                        <div className="flex ">
                    <span className="text-xl text-white/80">
                        ¿Ya tienes una cuenta?{" "}
                        <Link to="/login" className="text-[#0e2cd3] font-semibold hover:underline">
                        Iniciar sesión
                        </Link>
                    </span>
                    </div>
                    </div>
                )}

                {userType && (
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
                    
                    <label htmlFor="name" className="sr-only">Name</label>
                    <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Nombre"
                    value={formData.name}
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
                )}
                
                {userType === "emprendedor" && (
                    <>
                        <h1></h1>
                    </>
                )}

                {userType === "inversionista" && (
                    <>
                        <h1></h1>
                    </>
                )}

                {userType && (
                    <button
                        onClick={() => setUserType(null)}
                        className="w-fit p-1 bg-[#0e2cd3]/10 hover:bg-[#0e2cd3]/20 rounded-full transition flex flex-row  items-center text-[#0e2cd3] text-xl px-2 cursor-pointer"
                    >
                        <GrFormPreviousLink className="text-[#0e2cd3] w-10 h-10" />Volver
                    </button>
                )}
                
                </div>
            </div>
        </div>       
    )
}