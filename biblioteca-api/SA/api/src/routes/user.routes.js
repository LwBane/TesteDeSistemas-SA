import { Router } from 'express'
import { criarUsuario, listarUsuarios, deletarUsuario, loginUsuario } from '../controller/usuarioController.js'

const router = Router()

router.post('/', criarUsuario)
router.post('/login', loginUsuario)
router.get('/', listarUsuarios)
router.delete('/:id', deletarUsuario)

export default router