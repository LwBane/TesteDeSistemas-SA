import express from 'express'
import { pool } from './config/db.js'
import userRoutes from './routes/user.routes.js'
import bookRoutes from './routes/book.routes.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

// Testa conexão com o banco ao iniciar
try {
  await pool.getConnection()
  console.log('Conectado ao MySQL')
} catch (err) {
  console.error('Erro ao conectar ao banco:', err.message)
  process.exit(1)
}

// Rotas
app.get('/', (req, res) => {
  res.json({ message: 'API Biblioteca rodando!' })
})

app.use('/usuarios', userRoutes)
app.use('/livros', bookRoutes)

// Rota não encontrada
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' })
})

app.listen(PORT, () => {
  console.log(`Aplicação rodando em: http://localhost:${PORT}`)
})

export default app