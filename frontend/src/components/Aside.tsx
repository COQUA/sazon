import { NavLink } from "react-router-dom";
import { GoHome, GoPerson, GoFileDirectory } from "react-icons/go";
import { BiLogOut } from "react-icons/bi";
import logo from "../assets/logo/sazon.svg" 

interface AsideProps {
    userType: "emprendedor" | "inversionista";
    onLogout: () => void;
}

export default function Aside({ userType, onLogout }: AsideProps) {
    const baseClasses =
    "flex flex-row items-center gap-2 py-3 px-4 rounded-lg font-semibold text-xl transition-colors";
    const activeClasses = "bg-[#0e2cd3] text-white";
    const inactiveClasses = "hover:bg-[#1d34a5] text-white/80";

    return (
        <aside className="w-[25%] fixed h-screen text-white p-6 flex flex-col justify-between shadow-lg">
        <div className="flex flex-col space-y-2">
            <img src={logo} className="w-40 h-auto m-auto mb-10 mt-5" />

            {!userType && (
                <>
                    <NavLink
                        to="/home"
                        className={({isActive}) => `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
                    >
                        <GoHome className="w-6 h-auto"/>
                        Inicio
                    </NavLink>

                    <NavLink
                        to="/mis-emprendimientos"
                        className={({isActive}) => `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
                    >
                        <GoFileDirectory className="w-6 h-auto"/>
                        Mis Emprendimientos
                    </NavLink>

                    <NavLink
                        to="/perfil"
                        className={({isActive}) => `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
                    >
                        <GoPerson className="w-6 h-auto"/>
                        Mi perfil
                    </NavLink>
                </>
            )}

            {userType === "emprendedor" && (
                <>
                    <NavLink
                        to="/home"
                        className={({isActive}) => `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
                    >
                        <GoHome className="w-6 h-auto"/>
                        Inicio
                    </NavLink>

                    <NavLink
                        to="/mis-emprendimientos"
                        className={({isActive}) => `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
                    >
                        <GoFileDirectory className="w-6 h-auto"/>
                        Mis Emprendimientos
                    </NavLink>

                    <NavLink
                        to="/perfil"
                        className={({isActive}) => `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
                    >
                        <GoPerson className="w-6 h-auto"/>
                        Mi perfil
                    </NavLink>
                </>
            )}

            {userType === "inversionista" && (
                <>
                    <NavLink
                        to="/home"
                        className={({isActive}) => `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
                    >
                        <GoHome className="w-6 h-auto"/>
                        Inicio
                    </NavLink>

                    <NavLink
                        to="/perfil"
                        className={({isActive}) => `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
                    >
                        <GoPerson className="w-6 h-auto"/>
                        Mi perfil
                    </NavLink>
                </>
            )}
        </div>

        {/* Botón de cerrar sesión al final */}
        <button
            onClick={onLogout}
            className="flex gap-2 py-3 px-4 hover:bg-red-700 rounded-lg font-semibold text-start transition-colors text-xl cursor-pointer"
        >
            <BiLogOut className="w-6 h-auto"/>
            Cerrar sesión
        </button>
        <div className="absolute h-[90%] m-auto right-0 w-[3px] rounded-full bg-[#0e2bd370]"></div>
        </aside>
        
    );
}
