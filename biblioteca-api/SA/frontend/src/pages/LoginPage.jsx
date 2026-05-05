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
    <div className="min-h-screen bg-stone-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Header — título e subtítulo da página */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-amber-400 tracking-tight">
            Biblioteca
          </h1>
          <p className="text-stone-400 mt-2 text-sm">
            Acesse sua conta para continuar
          </p>
        </div>

        {/* Card — contém o formulário de login */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-8 shadow-xl">
          <form onSubmit={handleSubmit} data-testid="login-form">

            {/* Campo e-mail */}
            <div className="mb-5">
              <label className="block text-stone-300 text-sm font-medium mb-1">
                E-mail
              </label>
              <input
                data-testid="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full bg-stone-800 border border-stone-700 text-stone-100 rounded-lg px-4 py-2.5 text-sm placeholder-stone-500 focus:outline-none focus:border-amber-400 transition-colors"
                required
              />
            </div>

            {/* Campo senha */}
            <div className="mb-6">
              <label className="block text-stone-300 text-sm font-medium mb-1">
                Senha
              </label>
              <input
                data-testid="login-senha"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••"
                className="w-full bg-stone-800 border border-stone-700 text-stone-100 rounded-lg px-4 py-2.5 text-sm placeholder-stone-500 focus:outline-none focus:border-amber-400 transition-colors"
                required
              />
            </div>

            {/* Mensagem de erro — só aparece se a API retornar erro */}
            {erro && (
              <p
                data-testid="login-erro"
                className="text-red-400 text-sm mb-4 text-center"
              >
                {erro}
              </p>
            )}

            {/* Botão de submit — desabilitado durante o loading */}
            <button
              data-testid="login-btn"
              type="submit"
              disabled={loading}
              className="w-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold rounded-lg py-2.5 text-sm transition-colors disabled:opacity-50"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          {/* Link para a página de cadastro */}
          <p className="text-center text-stone-500 text-sm mt-6">
            Não tem conta?{" "}
            <button
              data-testid="goto-register"
              onClick={onGoToRegister}
              className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
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