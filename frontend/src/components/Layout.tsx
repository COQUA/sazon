import Aside from "./Aside";

interface LayoutProps {
    children: React.ReactNode;
    userType: "emprendedor" | "inversionista";
    onLogout: () => void;
}

export default function Layout({ children, userType, onLogout }: LayoutProps) {
    return (
        <div className="flex">
        {/* Aside fijo */}
        <Aside userType={userType} onLogout={onLogout} />

        {/* Contenedor principal (deja espacio al aside) */}
        <main className="ml-[25%] w-[75%] min-h-screen text-white p-8 overflow-y-auto">
            {children}
        </main>
        </div>
    );
}
