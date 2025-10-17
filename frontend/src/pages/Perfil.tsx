import Layout from "../components/Layout"

export default function Perfil(){
    return(
        <Layout userType="emprendedor" onLogout={() => {}}>
        <div className="flex flex-row">
            
            <div className="flex-1 p-8 text-white">
                <h1 className="text-3xl font-bold">Mi Perfil</h1>
            </div>
        </div>
        </Layout>
    )
}