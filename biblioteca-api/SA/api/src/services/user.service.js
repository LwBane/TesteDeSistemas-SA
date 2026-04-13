export const validateUsuario = ({ nome, email }) => {
  if (!nome || !email) {
    throw new Error("Nome e e-mail são obrigatórios")
  }
  if (nome.trim().length < 2) {
    throw new Error("Nome deve ter pelo menos 2 caracteres")
  }
  if (!email.includes("@")) {
    throw new Error("E-mail inválido")
  }
}