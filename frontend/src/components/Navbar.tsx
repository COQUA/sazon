import { Link } from "react-router-dom"

export default function Navbar(){
    return(
        <nav className="bg-[#0E1F30] text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* LOGO */}
                <Link to="/" className="text-3xl font-bold text-white">
                    PROYECTO
                </Link>

                <ul className="hidden md:flex space-x-8 text-lg font-medium">
                    <Link to="/" className="">
                        Inicio
                    </Link>
                </ul>
            </div>
        </nav>
    )
}