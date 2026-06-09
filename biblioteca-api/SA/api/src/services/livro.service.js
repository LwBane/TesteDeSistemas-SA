// ==> RF-03: CADASTRO DE LIVRO

export const validateLivro = ({ titulo, autor, genero, quantidade }) => {
  // Se os campos obrigatórios foram preenchidos
  if (!titulo || !autor || !genero) {
    throw new Error("Título, autor e gênero são obrigatórios")
  }
  // Quantidade é opcional — só valida se foi informada
  if (quantidade !== undefined && quantidade !== null) {
    // Quantidade é um número maior ou igual a zero
    if (typeof quantidade !== 'number' || quantidade < 0) {
      throw new Error("Quantidade deve ser um número maior ou igual a zero")
    }
  }
}

// ==> RF-05: BUSCA DE LIVRO

export const validateBusca = ({ q }) => {
  // Se o parâmetro de busca foi informado
  if (!q || q.trim().length === 0) {
    throw new Error("O parâmetro de busca é obrigatório")
  }
}