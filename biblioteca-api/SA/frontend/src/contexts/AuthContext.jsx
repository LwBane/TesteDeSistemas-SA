import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Inicializa já lendo o localStorage, evitando flash de redirecionamento
  const [user, setUser] = useState(() => {
    const savedEmail = localStorage.getItem("email");
    return savedEmail ? { email: savedEmail } : null;
  });

  const login = (email) => {
    localStorage.setItem("email", email);
    setUser({ email });
  };

  const logout = () => {
    localStorage.removeItem("email");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

//hook customizado para consumir o contexto

export const useAuth = () => useContext(AuthContext);