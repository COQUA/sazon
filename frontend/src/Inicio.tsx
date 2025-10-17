import { Link } from "react-router-dom";
import logo from "../src/assets/logo/sazon.svg";

function Inicio() {
  return (
    <div className="min-h-screen flex items-center justify-between px-12">
      {/* Lado izquierdo: espacio para el logo */}
      <div className="flex-1 flex items-center justify-center">
  
        <div className="text-4xl font-bold text-blue-600">
          <img src={logo} className="w-150 h-auto"/>
        </div>
      </div>

      {/* Lado derecho: texto + CTA */}
      <div className="flex-1 flex flex-col justify-center space-y-6">
        <h1 className="text-[3rem] font-bold text-white leading-tight text-left">
          La <span className="text-[#0e2cd3]">plataforma</span> donde la innovación y la inversión <br /> se  encuentran.
        </h1>
        <p className="text-gray-400 text-2xl text-left max-w-[80%]">
          Conectá con emprendedores e inversores que impulsan el futuro.
        </p>

        <div className="flex justify-center w-full mt-5">
          <Link
            to="/acceso"
            className="bg-[#0e2cd3] hover:bg-blue-700 text-2xl text-white font-semibold py-3 px-6 rounded-full transition-all duration-300"
          >
            Empezar ahora
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Inicio;
