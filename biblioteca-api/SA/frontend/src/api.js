const API_URL = "http://localhost:3000";

// ==> Usuários

export const registerUser = async ({ nome, email, senha }) => {
  const res = await fetch(`${API_URL}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email, senha }),
  })
  return res.json()
}

export const loginUser = async ({ email, senha }) => {
  const res = await fetch(`${API_URL}/usuarios/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  })
  return res.json()
}

// ==> Livros

export const fetchLivros = async () => {
  const res = await fetch(`${API_URL}/livros`)
  return res.json()
}

export const postLivro = async (livro) => {
  const res = await fetch(`${API_URL}/livros`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(livro),
  })
  return res.json()
}

export const searchLivros = async (q) => {
  const res = await fetch(`${API_URL}/livros/busca?q=${encodeURIComponent(q)}`)
  return res.json()
}

export const deleteLivro = async (id) => {
  await fetch(`${API_URL}/livros/${id}`, { method: "DELETE" })
}