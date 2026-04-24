import { pool } from "../config/db.js";
import { validateLivro } from "../services/livro.service.js";

// ==> RF-03 — Cadastra novo livro
export const criarLivro = async (req, res) => {
  try {
    validateLivro(req.body);

    const { titulo, autor, genero, quantidade } = req.body;

    const result = await pool.query(
      "INSERT INTO livro (titulo, autor, genero, quantidade) VALUES ($1, $2, $3, $4) RETURNING id",
      [titulo, autor, genero, quantidade]
    );

    res.status(201).json({
      id: result.rows[0].id,
      titulo,
      autor
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ==> RF-04 — Lista todos os livros
export const listarLivros = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM livro");
    res.json(result.rows);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ==> RF-05 — Busca livros por título ou autor
export const buscarLivros = async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Parâmetro de busca não informado" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM livro WHERE titulo ILIKE $1 OR autor ILIKE $2",
      [`%${q}%`, `%${q}%`]
    );

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ==> RF-06 — Atualiza livro por ID
export const atualizarLivro = async (req, res) => {
  const { id } = req.params;

  try {
    validateLivro(req.body);

    const { titulo, autor, genero, quantidade } = req.body;

    const result = await pool.query(
      "UPDATE livro SET titulo = $1, autor = $2, genero = $3, quantidade = $4 WHERE id = $5",
      [titulo, autor, genero, quantidade, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Livro não encontrado" });
    }

    res.json({ message: "Livro atualizado com sucesso" });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ==> RF-07 — Deleta livro por ID
export const deletarLivro = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM livro WHERE id = $1",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Livro não encontrado" });
    }

    res.json({ message: "Livro deletado com sucesso" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};