import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FaSearch } from 'react-icons/fa'

const RegisterBook = () => {
    const [isbn, setIsbn] = useState('')
    const [titulo, setTitulo] = useState('')
    const [autor, setAutor] = useState('')
    const [genero, setGenero] = useState('')
    const [ano, setAno] = useState('')
    const [isSaving, setIsSaving] = useState(false)
    const [isSearching, setIsSearching] = useState(false)

    const resetForm = () => {
        setIsbn('')
        setTitulo('')
        setAutor('')
        setGenero('')
        setAno('')
    }

    const handleIsbnSearch = async () => {
        if (!isbn.trim()) return

        setIsSearching(true)

        try {
            const response = await axios.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`)
            const data = response.data[`ISBN:${isbn}`]

            if (!data) {
                toast.error('ISBN não encontrado.', { autoClose: 2000, hideProgressBar: true })
                setIsSearching(false)
                return
            }

            setTitulo(data.title || '')
            setAutor(data.authors?.[0]?.name || '')
            setAno(data.publish_date?.slice(-4) || '')
            setGenero(data.subjects?.[0]?.name || '')

            toast.success('Livro encontrado!', { autoClose: 2000, hideProgressBar: true })
        } catch (error) {
            console.error('Erro ao buscar ISBN', error)
            toast.error('Erro ao buscar o ISBN.', { autoClose: 2000, hideProgressBar: true })
        }

        setIsSearching(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setIsSaving(true)

        try {
            await axios.post('http://localhost:3000/livros', {
                titulo, autor, genero, ano: Number(ano)
            })

            setIsSaving(false)
            resetForm()
            toast.success('Livro cadastrado com sucesso!', {
                autoClose: 2000,
                hideProgressBar: true
            })
        } catch (error) {
            console.error('Erro ao cadastrar livro', error)
            toast.error('Erro ao cadastrar o livro!', {
                autoClose: 2000,
                hideProgressBar: true
            })
            setIsSaving(false)
        }
    }

    const inputStyle = {
        width: '100%',
        padding: '0.5rem 0.75rem',
        border: '1.5px solid #E0D5C8',
        borderRadius: '8px',
        backgroundColor: '#F5F0EA',
        color: '#3B2314',
        fontSize: '0.95rem',
        outline: 'none',
        boxSizing: 'border-box',
        transition: 'border-color 0.2s',
    }

    const labelStyle = {
        display: 'block',
        fontSize: '0.8rem',
        fontWeight: '600',
        color: '#3B2314',
        marginBottom: '0.35rem',
        textTransform: 'uppercase',
        letterSpacing: '0.03em',
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2rem' }}>
            <div style={{ backgroundColor: '#FFFFFF', border: '1.5px solid #E0D5C8', borderRadius: '16px', padding: '2rem', width: '100%', maxWidth: '480px' }}>

                <h2 className='text-2xl font-bold mb-6' style={{ color: '#3B2314', fontFamily: 'Georgia, serif', textAlign: 'center' }}>
                    Cadastrar Livro
                </h2>

                {/* Busca por ISBN */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={labelStyle}>Buscar por ISBN</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                            type='text'
                            value={isbn}
                            onChange={(e) => setIsbn(e.target.value)}
                            placeholder='Ex: 9788535914849'
                            style={{ ...inputStyle, flex: 1 }}
                            onFocus={(e) => e.target.style.borderColor = '#7D9E8C'}
                            onBlur={(e) => e.target.style.borderColor = '#E0D5C8'}
                            onKeyDown={(e) => e.key === 'Enter' && handleIsbnSearch()}
                        />
                        <button
                            type='button'
                            onClick={handleIsbnSearch}
                            disabled={isSearching}
                            style={{
                                backgroundColor: isSearching ? '#E0D5C8' : '#7D9E8C',
                                color: '#FFFFFF',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '0 1rem',
                                cursor: isSearching ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                            }}
                        >
                            <FaSearch size={14} />
                            {isSearching ? 'Buscando...' : 'Buscar'}
                        </button>
                    </div>
                </div>

                <hr style={{ borderColor: '#E0D5C8', marginBottom: '1.5rem' }} />

                {/* Formulário */}
                <form onSubmit={handleSubmit}>
                    <fieldset style={{ border: 'none', padding: 0, marginBottom: '1rem' }}>
                        <label htmlFor='titulo' style={labelStyle}>Título</label>
                        <input
                            type='text'
                            id='titulo'
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            required
                            placeholder='Ex: O Senhor dos Anéis'
                            style={inputStyle}
                            onFocus={(e) => e.target.style.borderColor = '#7D9E8C'}
                            onBlur={(e) => e.target.style.borderColor = '#E0D5C8'}
                        />
                    </fieldset>

                    <fieldset style={{ border: 'none', padding: 0, marginBottom: '1rem' }}>
                        <label htmlFor='autor' style={labelStyle}>Autor</label>
                        <input
                            type='text'
                            id='autor'
                            value={autor}
                            onChange={(e) => setAutor(e.target.value)}
                            required
                            placeholder='Ex: J.R.R. Tolkien'
                            style={inputStyle}
                            onFocus={(e) => e.target.style.borderColor = '#7D9E8C'}
                            onBlur={(e) => e.target.style.borderColor = '#E0D5C8'}
                        />
                    </fieldset>

                    <fieldset style={{ border: 'none', padding: 0, marginBottom: '1rem' }}>
                        <label htmlFor='genero' style={labelStyle}>Gênero</label>
                        <input
                            type='text'
                            id='genero'
                            value={genero}
                            onChange={(e) => setGenero(e.target.value)}
                            placeholder='Ex: Fantasia'
                            style={inputStyle}
                            onFocus={(e) => e.target.style.borderColor = '#7D9E8C'}
                            onBlur={(e) => e.target.style.borderColor = '#E0D5C8'}
                        />
                    </fieldset>

                    <fieldset style={{ border: 'none', padding: 0, marginBottom: '1.5rem' }}>
                        <label htmlFor='ano' style={labelStyle}>Ano</label>
                        <input
                            type='number'
                            id='ano'
                            value={ano}
                            onChange={(e) => setAno(e.target.value)}
                            placeholder='Ex: 1954'
                            style={inputStyle}
                            onFocus={(e) => e.target.style.borderColor = '#7D9E8C'}
                            onBlur={(e) => e.target.style.borderColor = '#E0D5C8'}
                        />
                    </fieldset>

                    <button
                        type='submit'
                        disabled={isSaving}
                        style={{
                            width: '100%',
                            padding: '0.65rem',
                            borderRadius: '8px',
                            border: 'none',
                            backgroundColor: isSaving ? '#E0D5C8' : '#7D9E8C',
                            color: '#FFFFFF',
                            fontWeight: '600',
                            fontSize: '0.95rem',
                            cursor: isSaving ? 'not-allowed' : 'pointer',
                            transition: 'background-color 0.2s',
                        }}
                    >
                        {isSaving ? 'Salvando...' : 'Cadastrar Livro'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default RegisterBook