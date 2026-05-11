import React, { useEffect, useState } from 'react'

import { toast } from 'react-toastify'


import { useNavigate } from 'react-router-dom' // para poder redirecionar a navegação 

import axios from 'axios' // Para fazer requisição 

// Contexto 
import { useAuth } from '../../contexts/AuthContext' // Alterar estado do dado 

// Modal 
import Modal from '../Modal'

import RegisterUser from '../RegisterUser'

const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const { login, user } = useAuth() 

  // Controle do modal 

  const [isModalOpen, setIsModalOpen] = useState(false)

  // Autenticação do usuário (verificação) 

  useEffect(() => {
    if(user) {
      navigate('/dashboard')
    }
  }, [user, navigate])

  // Validação de Login 
  const handleLogin = async (e) => {
    e.preventDefault(); // Vai quebrar aquele evento que acontece quando clicamos no submit, que dá o refresh

    try {
      const response = await axios.get(
        "http://localhost:3000/users",
        {
          params: { email, password }
        },
      );

      if (response.data.length === 0) throw new Error("Usuário não encontrado")

      login(response.data[0].email);

      toast.success("Login realizado com sucesso!", {
        autoClose: 2000,
      });

      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      // axios cai no catch quando status >= 400
      const msg =
        error.response?.data?.error ||
        "Usuário não encontrado, verifique o e-mail e senha";
      toast.error(msg, {
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  }

  return (
    <div
      className='max-w-md mx-auto mt-10 p-8 rounded-xl shadow-lg'
      style={{ backgroundColor: '#FFFFFF', border: '1.5px solid #E0D5C8' }}
    > 
      <h2
        className='text-2xl font-bold text-center mb-6'
        style={{ color: '#3B2314', fontFamily: 'Georgia, serif' }}
      >
        Login
      </h2>

      <form onSubmit={handleLogin} className='space-y-4' data-testid="login-form">
        <fieldset>
          <label htmlFor='email' className='block text-sm font-medium mb-1' style={{ color: '#3B2314' }}>E-mail</label>
          <input 
              data-testid="login-email"
              type='email'
              id='email'
              value= {email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder='seu@email.com'
              className='w-full p-2 rounded-lg focus:outline-none transition-colors'
              style={{ border: '1.5px solid #D9CFC4', backgroundColor: '#FAF7F3', color: '#3B2314' }}
              onFocus={(e) => (e.target.style.borderColor = '#7D9E8C')}
              onBlur={(e) => (e.target.style.borderColor = '#D9CFC4')}
          />
        </fieldset>

          <fieldset>
          <label htmlFor='password' className='block text-sm font-medium mb-1' style={{ color: '#3B2314' }}>Senha</label>
          <input 
              data-testid="login-senha"
              type='password'
              id='password'
              minLength={6} // comprimento mínimo da senha 
              value= {password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder='••••••'
              className='w-full p-2 rounded-lg focus:outline-none transition-colors'
              style={{ border: '1.5px solid #D9CFC4', backgroundColor: '#FAF7F3', color: '#3B2314' }}
              onFocus={(e) => (e.target.style.borderColor = '#7D9E8C')}
              onBlur={(e) => (e.target.style.borderColor = '#D9CFC4')}
          />
        </fieldset>

        <button
          data-testid="login-btn"
          type='submit'
          className='w-full text-white p-2 rounded-lg transition-colors font-semibold'
          style={{ backgroundColor: '#7D9E8C' }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#6A8C7A')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#7D9E8C')}
        >
          Entrar
        </button>
        
      </form>

      <div className='flex justify-between mt-4 text-sm'>
        <button onClick={()=> toast.info('Funcionalidade em desenvolvimento')} className='hover:underline cursor-pointer' style={{ color: '#9E8C7E' }}>
          Esqueceu a sua senha?
        </button>

        <button data-testid="goto-register" onClick={()=> setIsModalOpen(true)} className='hover:underline cursor-pointer' style={{ color: '#E8A0A0' }}>
          Criar Conta
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={()=> setIsModalOpen(false)}>
        <RegisterUser />
      </Modal>

    </div>
  )
}

export default LoginForm