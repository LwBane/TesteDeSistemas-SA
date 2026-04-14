export const validateLivro = ({ titulo, autor, genero, quantidade }) => {
  if (!titulo || !autor || !genero) {
    throw new Error("Título, autor e gênero são obrigatórios")
  }
  if (quantidade === undefined || quantidade === null) {
    throw new Error("Quantidade é obrigatória")
  }
  if (typeof quantidade !== 'number' || quantidade < 0) {
    throw new Error("Quantidade deve ser um número maior ou igual a zero")
  }
}