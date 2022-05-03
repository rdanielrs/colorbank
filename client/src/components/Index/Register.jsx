import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import api from '../../services/api'

const Register = () => {
    const [ regUsername, setRegUsername ] = useState('')
    const [ regPassword, setRegPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')
    
    const [ errorMessage, setErrorMessage ] = useState("")

    const usernameRef = React.createRef()
    const passwordRef = React.createRef()
    const confirmPasswordRef = React.createRef()

    const navigate = useNavigate()
   

    const handleAddUsers = () => {
        let timeoutCounter = 0


        api.post('users', {
            username: regUsername,
            password: regPassword,
            confirm_password: confirmPassword,
            user_palettes: []
        }).then((res) => {
            if (res.status === 200) {
                navigate("/")
            }
            
        })

        var errorTimeout = setTimeout(function() {
            setErrorMessage("Nome de usuário ou senha inválidos")
            timeoutCounter += 1
            
            if (timeoutCounter > 0) {
                clearTimeout(errorTimeout)
            }

        }, 500)
 
    }

    const handleNextInput = (event) => {
        if (event.code === "Enter") {
            switch(event.target.id) {
                default:
                    break;
                case "usernameId":
                    passwordRef.current.focus()
                    break;
                case "passwordId":
                    confirmPasswordRef.current.focus()
                    break;
                case "confirmPasswordId":
                    handleAddUsers()
                    break;
            }
        }
    }

    const sendToLogin = () => {
        navigate("/")
    }
    

    return(
        <>
            <div className="container_register">
                <div className="register_window">
                    <div className="window_title">
                        <h2>Cadastro</h2>
                    </div>

                    <div className="username_insert_container">
                        <h3 className="section_title_h3">Nome de usuário</h3>
                        <input ref={usernameRef} id='usernameId' onKeyPress={(e) => handleNextInput(e)} onChange={(e) => {setRegUsername(e.target.value)}} value={regUsername} type="text" className="username_insert" />
                    </div>
                    
                    <div className="password_insert_container">
                        <h3 className="section_title_h3">Senha</h3>
                        <input ref={passwordRef} id='passwordId' onKeyPress={(e) => handleNextInput(e)} onChange={(e) => {setRegPassword(e.target.value)}} value={regPassword} type="password" className="password_insert" />
                    </div>

                    <div className="password_insert_container">
                        <h3 className="section_title_h3">Confirme sua senha</h3>
                        <input ref={confirmPasswordRef} id='confirmPasswordId' onKeyPress={(e) => handleNextInput(e)} onChange={(e) => {setConfirmPassword(e.target.value)}} value={confirmPassword} type="password" className="password_insert" />
                    </div>

                    <div className="button_register_container">
                        <button onClick={handleAddUsers} className="button_register">Cadastrar</button>
                    </div>

                    <div className="register_button_container">
                        <button onClick={sendToLogin} className="noAccount">Já tenho conta.</button>
                        <p className="warning_p">{ errorMessage }</p>
                    </div>

                    
                </div>
            </div>
        
        </>
    )
}

export default Register