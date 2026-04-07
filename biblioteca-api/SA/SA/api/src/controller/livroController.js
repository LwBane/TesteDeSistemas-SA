
import { pool } from "../db/db.js";
import { validateLivro } from "../services/livro.service.js";


// ==> RF-03 — Cadastra novo livro
export const criarLivro = async (req, res) => {
  try {
    validateLivro(req.body);

    const { nome, email } = req.body;

    const [result] = await pool.query(
      "INSERT INTO livro (titulo, autor, genero, quantidade) VALUES (?, ?, ?, ?)",
      [titulo, autor, genero, quantidade]
    );

    res.status(201).json({ id: result.insertId, titulo, autor });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ==> RF-04 — Lista todos os livros
export const listarLivros = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM livro");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ==> RF-05 — ' O sistema deve permitir buscar livros por título ou autor'


// !! FAZER REQUISITO PRA ISSO !!
// ==> Deleta livro por ID 
export const deleteLivro = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query(
      "DELETE FROM livro WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Livro não encontrado" });
    }

    res.json({ message: "Livro deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};