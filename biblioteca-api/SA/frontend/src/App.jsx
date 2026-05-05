import { useState } from "react"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import DashboardPage from "./pages/DashboardPage"

function App() {
  const [page, setPage] = useState("login") // "login" | "register" | "dashboard"
  const [usuario, setUsuario] = useState(null)

  const handleLoginSuccess = (userData) => {
    setUsuario(userData)
    setPage("dashboard")
  }

  const handleLogout = () => {
    setUsuario(null)
    setPage("login")
  }

  if (page === "register") {
    return (
      <RegisterPage
        onRegisterSuccess={() => setPage("login")}
        onGoToLogin={() => setPage("login")}
      />
    )
  }

  if (page === "dashboard") {
    return <DashboardPage usuario={usuario} onLogout={handleLogout} />
  }

  return (
    <LoginPage
      onLoginSuccess={handleLoginSuccess}
      onGoToRegister={() => setPage("register")}
    />
  )
}

export default App