import { Link } from "react-router-dom";

export default function Acceso() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center align-middle  space-y-8">
            <h2 className="text-3xl font-bold text-white">
            Elegí cómo acceder
        </h2>

        <div className="flex flex-col justify-center gap-5">
            <Link
            to="/registro"
            className="bg-green-600 text-center hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300"
            >
            Registrarse
            </Link>

            <Link
            to="/login"
            className="bg-blue-600 text-center hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300"
            >
            Iniciar sesión
            </Link>
        </div>
        </div>
    );
}
