import { useState } from "react"
import { loginUser } from "../api"

function LoginPage({ onLoginSuccess, onGoToRegister }) {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  // Guarda a mensagem de erro vinda da API (ex: "E-mail ou senha inválidos")
  const [erro, setErro] = useState("")

  // Desabilita o botão enquanto a requisição está em andamento
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro("")
    setLoading(true)

    try {
      const data = await loginUser({ email, senha })

      if (data.error) {
        // API retornou erro (ex: senha errada, usuário não encontrado)
        setErro(data.error)
      } else {
        // Login OK — sobe os dados do usuário pro App.jsx via prop
        onLoginSuccess(data.usuario)
      }
    } catch {
      setErro("Erro ao conectar com o servidor")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#F5F0EA" }}
    >
      <div className="w-full max-w-sm">

        {/* Header — logo e subtítulo */}
        <div className="mb-8 text-center">
          <h1
            className="text-5xl font-bold tracking-tight"
            style={{ color: "#3B2314", fontFamily: "Georgia, serif" }}
          >
            Biblioteca
          </h1>
          <p className="mt-2 text-sm flex items-center justify-center gap-1"
            style={{ color: "#9E8C7E", fontFamily: "Georgia, serif", fontStyle: "italic" }}>
            <span style={{ color: "#E8A0A0" }}>♥</span>
            sua coleção, suas histórias
            <span style={{ color: "#E8A0A0" }}>♥</span>
          </p>
        </div>

        {/* Card — formulário de login */}
        <div
          className="rounded-2xl p-8 shadow-lg"
          style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #E0D5C8" }}
        >
          <form onSubmit={handleSubmit} data-testid="login-form">

            {/* Campo e-mail */}
            <div className="mb-5">
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: "#3B2314" }}
              >
                E-mail
              </label>
              <input
                data-testid="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full rounded-lg px-4 py-2.5 text-sm focus:outline-none transition-colors"
                style={{
                  backgroundColor: "#FAF7F3",
                  border: "1.5px solid #D9CFC4",
                  color: "#3B2314",
                }}
                onFocus={e => e.target.style.borderColor = "#7D9E8C"}
                onBlur={e => e.target.style.borderColor = "#D9CFC4"}
                required
              />
            </div>

            {/* Campo senha */}
            <div className="mb-6">
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: "#3B2314" }}
              >
                Senha
              </label>
              <input
                data-testid="login-senha"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••"
                className="w-full rounded-lg px-4 py-2.5 text-sm focus:outline-none transition-colors"
                style={{
                  backgroundColor: "#FAF7F3",
                  border: "1.5px solid #D9CFC4",
                  color: "#3B2314",
                }}
                onFocus={e => e.target.style.borderColor = "#7D9E8C"}
                onBlur={e => e.target.style.borderColor = "#D9CFC4"}
                required
              />
            </div>

            {/* Mensagem de erro — só aparece se a API retornar erro */}
            {erro && (
              <p
                data-testid="login-erro"
                className="text-sm mb-4 text-center"
                style={{ color: "#C0524A" }}
              >
                {erro}
              </p>
            )}

            {/* Botão de submit */}
            <button
              data-testid="login-btn"
              type="submit"
              disabled={loading}
              className="w-full font-semibold rounded-lg py-2.5 text-sm transition-colors"
              style={{
                backgroundColor: loading ? "#A8C4B8" : "#7D9E8C",
                color: "#FFFFFF",
                cursor: loading ? "not-allowed" : "pointer",
              }}
              onMouseEnter={e => { if (!loading) e.target.style.backgroundColor = "#6A8C7A" }}
              onMouseLeave={e => { if (!loading) e.target.style.backgroundColor = "#7D9E8C" }}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          {/* Link para a página de cadastro */}
          <p className="text-center text-sm mt-6" style={{ color: "#9E8C7E" }}>
            Não tem conta?{" "}
            <button
              data-testid="goto-register"
              onClick={onGoToRegister}
              className="font-medium transition-colors"
              style={{ color: "#E8A0A0" }}
              onMouseEnter={e => e.target.style.color = "#D4807A"}
              onMouseLeave={e => e.target.style.color = "#E8A0A0"}
            >
              Cadastre-se
            </button>
          </p>
        </div>

      </div>
    </div>
  )
}

export default LoginPage