import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
//import { Redirect } from 'react-router-dom'
import api from '../../services/api'

const Login = () => {
    const navigate = useNavigate()

    const [ usernameInput, setUsernameInput ] = useState("")
    const [ passwordInput, setPasswordInput ] = useState("")
    
    const [ remember, setRemember ] = useState(false)
    const [ errorMessage, setErrorMessage ] = useState("")

    const passwordRef = React.createRef()

    useEffect(() => {
        let x = document.cookie.split("id=")
        
        if (x.length > 1) {
            navigate(`/userpage/${ x[1] }`)      

        }
    }, [navigate])
   
    const handleLogin = () => {
        let timeoutCounter = 0

        api.post("/users/login", {
            username: usernameInput,
            password: passwordInput
        }).then((response) => {
            if (response.status === 200) {
                handleAuth(response.data)
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

    const handleAuth = (data) => {
        api.get(`/users/user/${ data.userId }`, {
            headers: { authorization: `Bearer ${ data.token }` }
        })

        if (remember === true) {
            document.cookie = `token=${ data.token };SameSite=Lax;max-age=${259200};path=/`
            document.cookie = `id=${ data.userId };SameSite=Lax;max-age=${259200};path=/`
            navigate(`/userpage/${ data.userId }`)

        }

        if (remember === false) {
            document.cookie = `token=${ data.token };SameSite=Lax;path=/`
            document.cookie = `id=${ data.userId };SameSite=Lax;path=/`
            navigate(`/userpage/${ data.userId }`)

        }
    }

    const sendToRegister = () => {
        navigate("/register")
    }

    const handleNextInput = (event) => {
        if (event.code === "Enter") {
            switch (event.target.id) {
                default:
                    break;
                case "usernameId":
                    passwordRef.current.focus()
                    break;
                case "passwordId":
                    handleLogin()
                    break;
            }
        }
    }

    


    return(
        <>
            <div className="container_login">
                <div className="login_page">

                    <div className="login_container">
                        <div className="window_title">
                            <h2>Login</h2>
                        </div>

                        <div className="username_insert_container">
                            <h3 className="section_title_h3">Nome de usuário</h3>
                            <input id='usernameId' onKeyPress={(e) => handleNextInput(e)} value={ usernameInput } onChange={(e) => { setUsernameInput(e.target.value) }} type="text" className="username_insert" />
                        </div>

                        <div className="password_insert_container">
                            <h3 className="section_title_h3">Senha</h3>
                            <input id='passwordId' ref={passwordRef} onKeyPress={(e) => handleNextInput(e)} value={passwordInput} onChange={(e) => { setPasswordInput(e.target.value) }} type="password" className="password_insert" />
                        </div>

                        <div className="button_user_container">
                            <button className="button_login" onClick={handleLogin}>Entrar</button>
                        </div>

                        <div className="reminder_checkbox_container">
                            <input onChange={(e) => setRemember(e.target.checked)} type="checkbox" name="" id="rememberMe"/>
                            <label htmlFor="rememberMe">Mantenha-me conectado</label>
                        </div>

                        <div className="register_button_container">
                            <button onClick={sendToRegister} className="noAccount">Não tenho conta</button>
                        </div>

                        <div className="container_warning_text">
                            <p className="warning_p">{ errorMessage }.</p>
                        </div>
                        
                        
                    </div>
                </div>
            </div>
        </>
    )
}


export default Login