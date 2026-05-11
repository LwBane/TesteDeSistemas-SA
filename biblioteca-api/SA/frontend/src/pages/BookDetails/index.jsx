import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiTrash2, FiBook, FiUser, FiTag, FiCalendar } from 'react-icons/fi'
import { toast } from 'react-toastify'
import axios from 'axios'

export default function BookDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [livro, setLivro] = useState(null)
  const [loading, setLoading] = useState(true)
  const [confirmDelete, setConfirmDelete] = useState(false)

  useEffect(() => {
    axios.get(`http://localhost:3000/livros/${id}`)
      .then(res => setLivro(res.data))
      .catch(() => {
        toast.error('Livro não encontrado.')
        navigate('/dashboard')
      })
      .finally(() => setLoading(false))
  }, [id, navigate])

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true)
      return
    }
    try {
      await axios.delete(`http://localhost:3000/livros/${id}`)
      toast.success('Livro removido da biblioteca.')
      navigate('/dashboard')
    } catch {
      toast.error('Erro ao deletar o livro.')
    }
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center h-full'>
        <p style={{ color: '#7D9E8C' }} className='text-lg animate-pulse'>Carregando...</p>
      </div>
    )
  }

  if (!livro) return null

  return (
    <div className='min-h-screen p-8' style={{ backgroundColor: '#F5F0EA' }}>
      {/* Botão voltar */}
      <button
        onClick={() => navigate('/dashboard')}
        className='flex items-center gap-2 mb-8 text-sm font-medium transition-opacity hover:opacity-70'
        style={{ color: '#7D9E8C' }}
      >
        <FiArrowLeft size={16} />
        Voltar para a biblioteca
      </button>

      {/* Card principal */}
      <div
        className='max-w-xl mx-auto rounded-2xl p-8 shadow-md'
        style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C8' }}
      >
        {/* Ícone decorativo */}
        <div
          className='w-16 h-16 rounded-xl flex items-center justify-center mb-6'
          style={{ backgroundColor: '#F5F0EA', border: '1px solid #E0D5C8' }}
        >
          <FiBook size={28} style={{ color: '#7D9E8C' }} />
        </div>

        {/* Título */}
        <h1
          className='text-2xl font-bold mb-1 leading-snug'
          style={{ color: '#3B2314', fontFamily: 'Georgia, serif' }}
        >
          {livro.titulo}
        </h1>

        {/* Divider */}
        <div className='my-6' style={{ borderTop: '1px solid #E0D5C8' }} />

        {/* Infos */}
        <div className='flex flex-col gap-4'>
          <InfoRow icon={<FiUser size={15} />} label='Autor' value={livro.autor} />
          <InfoRow icon={<FiTag size={15} />} label='Gênero' value={livro.genero} />
          <InfoRow icon={<FiCalendar size={15} />} label='Ano' value={livro.ano} />
        </div>

        {/* Divider */}
        <div className='my-8' style={{ borderTop: '1px solid #E0D5C8' }} />

        {/* Botão deletar */}
        <div className='flex flex-col gap-2'>
          {confirmDelete && (
            <p className='text-sm text-center mb-1' style={{ color: '#E8A0A0' }}>
              Tem certeza? Clique novamente para confirmar.
            </p>
          )}
          <button
            onClick={handleDelete}
            className='w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all'
            style={
              confirmDelete
                ? { backgroundColor: '#E8A0A0', color: '#FFFFFF', border: 'none' }
                : { backgroundColor: 'transparent', color: '#E8A0A0', border: '1.5px solid #E8A0A0' }
            }
          >
            <FiTrash2 size={16} />
            {confirmDelete ? 'Confirmar exclusão' : 'Deletar livro'}
          </button>
          {confirmDelete && (
            <button
              onClick={() => setConfirmDelete(false)}
              className='w-full py-2 text-sm rounded-xl transition-opacity hover:opacity-70'
              style={{ color: '#3B2314', opacity: 0.5 }}
            >
              Cancelar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function InfoRow({ icon, label, value }) {
  return (
    <div className='flex items-center gap-3'>
      <span style={{ color: '#7D9E8C' }}>{icon}</span>
      <span className='text-sm font-medium w-16' style={{ color: '#3B2314', opacity: 0.5 }}>{label}</span>
      <span className='text-sm font-semibold' style={{ color: '#3B2314' }}>{value}</span>
    </div>
  )
}