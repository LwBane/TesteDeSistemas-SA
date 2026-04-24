import { pool } from "../config/db.js";
import { validateUsuario, validateLogin } from "../services/user.service.js";
import bcrypt from "bcrypt";

// ==> RF-01 — Cadastra novo usuário
export const criarUsuario = async (req, res) => {
  try {
    validateUsuario(req.body);

    const { nome, email, senha } = req.body;

    const senhaHash = await bcrypt.hash(senha, 10);

    const result = await pool.query(
      "INSERT INTO usuario (nome, email, senha) VALUES ($1, $2, $3) RETURNING id",
      [nome, email, senhaHash]
    );

    res.status(201).json({
      id: result.rows[0].id,
      nome,
      email
    });

  } catch (err) {
    // erro de email duplicado no PostgreSQL
    if (err.code === '23505') {
      return res.status(400).json({ error: "E-mail já cadastrado" });
    }

    res.status(400).json({ error: err.message });
  }
};

// ==> RF-02 — Login
export const loginUsuario = async (req, res) => {
  try {
    validateLogin(req.body);

    const { email, senha } = req.body;

    const result = await pool.query(
      "SELECT * FROM usuario WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "E-mail ou senha inválidos" });
    }

    const usuario = result.rows[0];

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ error: "E-mail ou senha inválidos" });
    }

    res.json({
      message: "Login realizado com sucesso",
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      }
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ==> Lista todos os usuários
export const listarUsuarios = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, nome, email FROM usuario"
    );

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ==> Deleta usuário por ID
export const deletarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM usuario WHERE id = $1",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json({ message: "Usuário deletado com sucesso" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};