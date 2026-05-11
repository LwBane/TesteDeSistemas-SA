import request from 'supertest'
import app from '../server.js'
import { pool } from '../config/db.js'

afterAll(async () => {
  await pool.end()
})

describe('RF-01 — Cadastro de Usuário', () => {
  
  beforeEach(async () => {
    await pool.query('TRUNCATE TABLE usuario RESTART IDENTITY CASCADE')
  })

  // CT-01: Envia todos os campos corretos e espera status 201 com os dados do usuário criado
  test('CT-01 — Deve cadastrar usuário com dados válidos', async () => {
    const res = await request(app)
      .post('/usuarios')
      .send({ nome: 'João Silva', email: 'teste@email.com', senha: '123456' })

    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
    expect(res.body.nome).toBe('João Silva')
    expect(res.body.email).toBe('teste@email.com')
  })

  // CT-02: Tenta cadastrar com e-mail já existente e espera erro 400
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

  // CT-03: Omite o campo nome e espera erro 400 com mensagem de campos obrigatórios
  test('CT-03 — Deve rejeitar cadastro sem nome', async () => {
    const res = await request(app)
      .post('/usuarios')
      .send({ email: 'teste@email.com', senha: '123456' })

    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Nome, e-mail e senha são obrigatórios')
  })

  // CT-04: Envia e-mail sem "@" e espera erro 400 com mensagem de e-mail inválido
  test('CT-04 — Deve rejeitar cadastro com e-mail inválido', async () => {
    const res = await request(app)
      .post('/usuarios')
      .send({ nome: 'João Silva', email: 'emailinvalido', senha: '123456' })

    expect(res.status).toBe(400)
    expect(res.body.error).toBe('E-mail inválido')
  })

  // CT-05: Envia senha com menos de 6 caracteres e espera erro 400
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
    await pool.query('TRUNCATE TABLE usuario RESTART IDENTITY CASCADE')

    await request(app)
      .post('/usuarios')
      .send({ nome: 'Login Teste', email: 'login@email.com', senha: '123456' })
  })

  // CT-06: Envia e-mail e senha corretos e espera status 200 com dados do usuário
  test('CT-06 — Deve realizar login com dados válidos', async () => {
    const res = await request(app)
      .post('/usuarios/login')
      .send({ email: 'login@email.com', senha: '123456' })

    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Login realizado com sucesso')
    expect(res.body.usuario).toHaveProperty('id')
  })

  // CT-07: Envia senha incorreta e espera status 401 com mensagem de erro
  test('CT-07 — Deve rejeitar login com senha errada', async () => {
    const res = await request(app)
      .post('/usuarios/login')
      .send({ email: 'login@email.com', senha: 'senhaerrada' })

    expect(res.status).toBe(401)
    expect(res.body).toHaveProperty('error')
  })

  // CT-08: Envia e-mail não cadastrado e espera status 401 com mensagem de erro
  test('CT-08 — Deve rejeitar login com e-mail inexistente', async () => {
    const res = await request(app)
      .post('/usuarios/login')
      .send({ email: 'naoexiste@email.com', senha: '123456' })

    expect(res.status).toBe(401)
    expect(res.body).toHaveProperty('error')
  })
})