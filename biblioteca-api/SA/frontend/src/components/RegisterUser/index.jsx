import React, { useState } from 'react'
import { toast } from 'react-toastify'

import axios from 'axios'

const RegisterUser = () => {

    // Estados de controle dos campos 
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    // Funções que alteram o valor dos estados 
    const handleNomeChange = (e) => setNome(e.target.value)
    const handleEmailChange = (e) => setEmail(e.target.value)
    const handlePasswordChange = (e) => setPassword(e.target.value)
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value)

    // Estados (match password e validação do botão de salvar)
    
    const [isPasswordMatch, setIsPasswordMatch] = useState(true) // esse controla os dois campos, pra ver se os dois estão exatamente iguais
    const [isSaving, setIsSaving] = useState(false) // controla o estado, quando envia a requisição, etc... 

    // Validação do Match 

    const isPasswordValid = () => password.length >= 8 && password === confirmPassword 

    const resetForm = () => {
        setNome('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setIsPasswordMatch(true)
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()  // não recarrega a página quando o form for enviado

        if(!isPasswordValid()) {    // se a senha não for válida ele para, não continua a rodar
            setIsPasswordMatch(false)
            return
        }

        setIsSaving(true)

        try{
            await axios.post('http://localhost:3000/usuarios', {
                nome, email, senha: password
            })

            setIsSaving(false)
            resetForm()

            toast.success("Usuário criado com sucesso!", {
                autoClose: 2000, 
                hideProgressBar: true
            })

        } catch (error){
            console.error('Erro ao criar usuário', error)

            toast.error('Erro ao criar o usuário!', {
                autoClose: 2000, 
                hideProgressBar: true
            })

            setIsSaving(false)
        }
    }

    return (
        <div className='w-full max-w-md p-6 bg-white border border-[#E0D5C8] rounded-xl'>
            
            <h2 className='text-2xl font-bold mb-6 text-center text-[#3B2314]'>
                Criar Usuário
            </h2>

            <form onSubmit={handleSubmit}>

                <fieldset>
                    <label 
                        htmlFor='nome' 
                        className='block text-sm font-medium mb-1 text-[#3B2314]'
                    >
                        Nome:
                    </label>

                    <input 
                        type='text'
                        id='nome'
                        value={nome}
                        onChange={handleNomeChange}
                        required
                        placeholder='João Silva'
                        className='w-full p-2 border border-[#E0D5C8] bg-[#F5F0EA] text-[#3B2314] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7D9E8C]'
                    />
                </fieldset>

                <fieldset>
                    <label 
                        htmlFor='email' 
                        className='block text-sm font-medium mb-1 text-[#3B2314]'
                    >
                        Email:
                    </label>

                    <input 
                        type='email'
                        id='email'
                        value={email}
                        onChange={handleEmailChange}
                        required
                        placeholder='exemplo123@gmail.com'
                        className='w-full p-2 border border-[#E0D5C8] bg-[#F5F0EA] text-[#3B2314] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7D9E8C]'
                    />
                </fieldset>

                <fieldset>
                    <label 
                        htmlFor='password' 
                        className='block text-sm font-medium mb-1 text-[#3B2314]'
                    >
                        Senha:
                    </label>

                    <input 
                        type='password'
                        id='password'
                        value={password}
                        onChange={handlePasswordChange}
                        required
                        minLength={8} // esse tipo de validação não funciona mt, pq o usuário pode ir no html e enviar igual 
                        placeholder='abcd1234'
                        className='w-full p-2 border border-[#E0D5C8] bg-[#F5F0EA] text-[#3B2314] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7D9E8C]'
                    />
                </fieldset>

                <fieldset>
                    <label 
                        htmlFor='confirmPassword' 
                        className='block text-sm font-medium mb-1 text-[#3B2314]'
                    >
                        Confirmar Senha:
                    </label>

                    <input 
                        type='password'
                        id='confirmPassword'
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
                        minLength={8} 
                        placeholder='abcd1234'
                        className='w-full p-2 border border-[#E0D5C8] bg-[#F5F0EA] text-[#3B2314] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7D9E8C]'
                    />

                    {!isPasswordMatch && (
                        <p className='text-[#E8A0A0] text-sm mt-1'>
                            As senhas não correspondem
                        </p>
                    )}
                </fieldset>

                <div>
                    <button
                        disabled={isSaving}
                        type='submit'
                        className={`w-full p-2 rounded-lg text-white mt-4 ${
                            isSaving
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-[#7D9E8C] hover:bg-[#6D8B7B] cursor-pointer'
                        } transition-colors`}
                    >
                        {isSaving ? "Salvando ..." : "Criar Usuário"}
                    </button>
                </div>

            </form>
        </div>
    )
}

export default RegisterUser