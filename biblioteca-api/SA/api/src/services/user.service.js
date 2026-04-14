// ==> RF-01: CADASTRO 

export const validateUsuario = ({ nome, email, senha }) => {
  // Se os campos obrigatórios foram preenchidos
  if (!nome || !email || !senha) {
    throw new Error("Nome, e-mail e senha são obrigatórios")
  }
  // Nome tem pelo menos 2 caracteres
  if (nome.trim().length < 2) {
    throw new Error("Nome deve ter pelo menos 2 caracteres")
  }
  // e-mail é válido
  if (!email.includes("@")) {
    throw new Error("E-mail inválido")
  }
  // Se a senha tem pelo menos 6 caracteres
  if (senha.length < 6) {
    throw new Error("Senha deve ter pelo menos 6 caracteres")
  }
}

// ==> RF-02: LOGIN 

export const validateLogin = ({ email, senha }) => {
  // Campos obrigatórios foram preenchidos
  if (!email || !senha) {
    throw new Error("E-mail e senha são obrigatórios")
  }
  // Verifica se o e-mail é válido
  if (!email.includes("@")) {
    throw new Error("E-mail inválido")
  }
}