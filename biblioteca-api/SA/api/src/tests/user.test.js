import request from 'supertest'
import app from '../server.js'
import { pool } from '../config/db.js'

afterAll(async () => {
  await pool.end()
})

describe('RF-01 — Cadastro de Usuário', () => {
  
  beforeEach(async () => {
    await pool.query("DELETE FROM usuario WHERE email = 'teste@email.com'")
  })

  test('CT-01 — Deve cadastrar usuário com dados válidos', async () => {
    const res = await request(app)
      .post('/usuarios')
      .send({ nome: 'João Silva', email: 'teste@email.com', senha: '123456' })

    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
    expect(res.body.nome).toBe('João Silva')
    expect(res.body.email).toBe('teste@email.com')
  })

  test('CT-02 — Deve rejeitar cadastro com e-mail duplicado', async () => {
    await request(app)
      .post('/usuarios')
      .send({ nome: 'João Silva', email: 'teste@email.com', senha: '123456' })

    const res = await request(app)
      .post('/usuarios')
      .send({ nome: 'Outro Nome', email: 'teste@email.com', senha: '654321' })

    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('error')
  })

  test('CT-03 — Deve rejeitar cadastro sem nome', async () => {
    const res = await request(app)
      .post('/usuarios')
      .send({ email: 'teste@email.com', senha: '123456' })

    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Nome, e-mail e senha são obrigatórios')
  })

  test('CT-04 — Deve rejeitar cadastro com e-mail inválido', async () => {
    const res = await request(app)
      .post('/usuarios')
      .send({ nome: 'João Silva', email: 'emailinvalido', senha: '123456' })

    expect(res.status).toBe(400)
    expect(res.body.error).toBe('E-mail inválido')
  })

  test('CT-05 — Deve rejeitar senha com menos de 6 caracteres', async () => {
    const res = await request(app)
      .post('/usuarios')
      .send({ nome: 'João Silva', email: 'teste@email.com', senha: '123' })

    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Senha deve ter pelo menos 6 caracteres')
  })
})

describe('RF-02 — Login', () => {

  beforeAll(async () => {
    await pool.query("DELETE FROM usuario WHERE email = 'login@email.com'")
    await request(app)
      .post('/usuarios')
      .send({ nome: 'Login Teste', email: 'login@email.com', senha: '123456' })
  })

  test('CT-06 — Deve realizar login com dados válidos', async () => {
    const res = await request(app)
      .post('/usuarios/login')
      .send({ email: 'login@email.com', senha: '123456' })

    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Login realizado com sucesso')
    expect(res.body.usuario).toHaveProperty('id')
  })

  test('CT-07 — Deve rejeitar login com senha errada', async () => {
    const res = await request(app)
      .post('/usuarios/login')
      .send({ email: 'login@email.com', senha: 'senhaerrada' })

    expect(res.status).toBe(401)
    expect(res.body).toHaveProperty('error')
  })

  test('CT-08 — Deve rejeitar login com e-mail inexistente', async () => {
    const res = await request(app)
      .post('/usuarios/login')
      .send({ email: 'naoexiste@email.com', senha: '123456' })

    expect(res.status).toBe(401)
    expect(res.body).toHaveProperty('error')
  })
})