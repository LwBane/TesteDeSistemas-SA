
import { pool } from "../db/db.js";
import { validateUsuario } from "../services/user.service.js";


// ==> RF-01 — Cadastra novo usuário
export const criarUsuario = async (req, res) => {
  try {
    validateUsuario(req.body);

    const { nome, email } = req.body;

    const [result] = await pool.query(
      "INSERT INTO usuario (nome, email) VALUES (?, ?)",
      [nome, email]
    );

    res.status(201).json({ id: result.insertId, nome, email });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// !! FAZER REQUISITO PRA ISSO !!
// ==> RF- Lista todos os usuarios
export const listarUsuarios = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM usuario");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// !! FAZER REQUISITO PRA ISSO !!
// ==> Deleta usuário por ID
export const deleteUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query(
      "DELETE FROM usuario WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json({ message: "Usuário deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};