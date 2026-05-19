import { Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import SideMenu from "../components/SideMenu";
import { useState } from "react";

const DashboardLayout = () => {
  const { user, logout } = useAuth();

  const [search, setSearch] = useState('')

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#F5F0EA" }}>
      {/* barra lateral - menu */}

      <SideMenu />

      {/* Conteúdo principal */}
      <main className="flex-1 flex flex-col">
        <header className="flex items-center bg-[#FFFFFF] border-b border-[#E0D5C8] p-4 shadow-sm" style={{ position: "relative" }}>
          <div className="flex items-center rounded-lg px-3" style={{ border: '1.5px solid #E0D5C8', backgroundColor: '#F5F0EA', width: '500px', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#9E8C7E" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.099zm-5.242 1.656a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"/>
            </svg>
            <input
              type='text'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Pesquisar livro...'
              className='flex-1 p-2 text-sm focus:outline-none bg-transparent'
              style={{ color: '#3B2314' }}
            />
          </div>
          {user && (
            <div className="flex items-center gap-4" style={{ marginLeft: 'auto' }}>
              <span style={{ color: "#3B2314" }}>Seja bem-vindo(a), {user.email}</span>
              <button
                onClick={logout}
                className="px-3 py-1 text-white rounded transition"
                style={{ backgroundColor: "#E8A0A0" }}
                onMouseEnter={(e) => e.target.style.backgroundColor = "#d98e8e"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "#E8A0A0"}
              >
                Sair
              </button>
            </div>
          )}
        </header>

        {/* Páginas internas do dashboard */}
        <section className="flex-1 p-6 overflow-y-auto">
          <Outlet context={{ search }} />
        </section>
      </main>
    </div>
  );
};

export default DashboardLayout;