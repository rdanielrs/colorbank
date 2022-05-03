import React, {useEffect, useState} from 'react'

import { useParams, useNavigate } from 'react-router-dom'
import api from '../services/api'

import HeaderUserpage from '../components/Userpage/HeaderUserpage' 



const Profile = () => {
    const { id } = useParams()

    const navigate = useNavigate()

    const [ userToken, setUserToken ] = useState("")
    const [ username, setUsername ] = useState("")
    const [ currentPassword, setCurrentPassword ] = useState("")
    const [ newPassword, setNewPassword ] = useState("")
    const [ errorMessage, setErrorMessage ] = useState("")

    const [ isBusy, setIsBusy ] = useState(true)

    const [ profilePageView, setProfilePageView ] = useState("flex")
    

    const [ changePasswordView, setChangePasswordView ] = useState("none")
    const [ changeUsernameView, setChangeUsernameView ] = useState("none")
    

    const [ removeAccountView, setRemoveAccountView ] = useState("none")

    const [ user, setUser ] = useState({username: "", user_palettes: []})

    useEffect(() => {
        let x = document.cookie.split(";")
        if (x.length > 1) {
            let y = x[0].split("token=")
            setUserToken(y[1])
        }

        if (x.length <= 1) {
            navigate("/")
        }
        
    }, [navigate])
    
    useEffect(() => {
        setIsBusy(false)
        if (isBusy === false) {
            api.get(`/users/user/${ id }`, {
                headers: { authorization: `Bearer ${ userToken }` }
            }).then((res) => {
                if (res.status === 200) {
                    
                    setUser(res.data.user)
                    
                }
            })

        }
            
        


    }, [id, isBusy, userToken])

    
    const editUsername = () => {
        setUsername(user.username)
        setChangeUsernameView("flex")
        setProfilePageView("none")
        
    }

    const editPassword = () => {
        setChangePasswordView("flex")
        setProfilePageView("none")
    }

    const cancelEditUsername = () => {
        
        setChangeUsernameView("none")
        setProfilePageView("flex")
        setErrorMessage("")
    }

    const cancelEditPassword = () => {
        setChangePasswordView("none")
        setProfilePageView("flex")
        setErrorMessage("")
    }

    const handleEditUsername = () => {
        let timeoutCounter = 0

        api.put(`/users/username/${ id }`, {
            newUsername: username,
            confirmPassword: currentPassword
        }).then((res) => {
            if (res.status === 200) {
                console.log("Username alterado com sucesso")
                setChangeUsernameView("none")
                setProfilePageView("flex")
                setErrorMessage("")
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

    const handleEditPassword = () => {
        let timeoutCounter = 0
        
        api.put(`/users/password/${ id }`, {
            newPassword: newPassword,
            confirmPassword: currentPassword
        }).then((res) => {

            if (res.status === 200) {
                console.log("Senha alterada com sucesso")  
                setChangePasswordView("none")
                setProfilePageView("flex")
                setErrorMessage("")
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



    const removeAccount = () => {
        setProfilePageView("none")
        setRemoveAccountView("flex")
    }

    const handleRemoveAccount = () => {
        let timeoutCounter = 0

        api.delete(`/users/delete/${id}/${ currentPassword }`).then((res) => {
            if (res.status === 200) {
                document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
                document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
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

    const cancelRemoveAccount = () => {
        setProfilePageView("flex")
        setRemoveAccountView("none")
        setErrorMessage("")
    }


    return(
        <>
            <HeaderUserpage/>

            <div style={{ display: profilePageView }} className="container_profile_page">
                <div className="container_profile">
                    <div className="profile_title">
                        <h1>Sua conta</h1>
                    </div>

                    <div className="profile_content">
                        <div className="text_section">
                            <h2>Nome de usuário</h2>
                            <h3>{ user.username }</h3>
                        </div>

                        <div className="text_section">
                            <h2>Paletas adicionas </h2>
                            <h3>{ user.user_palettes.length }</h3>
                        </div>

                        <div className="account_options_container">
                            <button onClick={editUsername} className="account_option">Alterar nome de usuário</button>
                            <button onClick={editPassword} className="account_option">Alterar senha</button>
                            <button onClick={removeAccount} className="account_option">Remover conta</button>
                        </div>
                        
                    </div>

                    
                </div>

            
            </div>

            <div style={{ display: removeAccountView }} className="remove_account_window">
                <div className="remove_account_title">
                    <h2>Remover conta</h2>
                </div>

                <div className="remove_account_input">
                    <h3>Insira sua senha</h3>
                    <input value={currentPassword} onChange={(e) => { setCurrentPassword(e.target.value) }} type="password" className="remove_input" />
                </div>

                <div className="remove_account_buttons">
                    <button onClick={handleRemoveAccount} className="remove_confirm_button">Remover conta</button>
                    <button onClick={cancelRemoveAccount} className="remove_cancel_button">Cancelar</button>
                </div>

                <div className="warning_text_container">
                    <p className="warning_text">{ errorMessage }</p>
                </div>
            </div>

            <div style={{ display: changeUsernameView }} className="edit_profile_page">
                <div className="container_edit">
                    <div className="edit_title">
                        <h1>Editar nome de usuário</h1>
                    </div>

                    <div className="edit_content">
                        <div className="input_section">
                            <h3>Nome de usuário</h3>
                            <input value={ username } onChange={(e) => {setUsername(e.target.value)}} type="text" className="edit_input" />
                        </div>

                        <div className="input_section">
                            <h3>Insira sua senha atual</h3>
                            <input value={currentPassword} onChange={(e) => {setCurrentPassword(e.target.value)}} type="password" placeholder='Senha' className="edit_input" />
                        </div>


                        <div className="edit_buttons">
                            <button onClick={handleEditUsername} className="edit_confirm_button">Confirmar</button>
                            <button onClick={cancelEditUsername} className="edit_cancel_button">Cancelar</button>
                        </div>

                        <div className="warning_text_container">
                            <p className="warning_text">{ errorMessage }</p>
                        </div>
                    </div>


                </div>
            </div>

            <div style={{ display: changePasswordView }} className="edit_profile_page">
                <div className="container_edit">
                    <div className="edit_title">
                        <h1>Alterar senha</h1>
                    </div>

                    <div className="edit_content">
                        <div className="input_section">
                            <h3>Nova senha</h3>
                            <input value={ newPassword } onChange={(e) => {setNewPassword(e.target.value)}} type="password" placeholder='Nova senha' className="edit_input" />
                        </div>

                        <div className="input_section">
                            <h3>Insira sua senha atual</h3>
                            <input value={currentPassword} onChange={(e) => { setCurrentPassword(e.target.value) }} type="password" placeholder='Senha' className="edit_input" />
                        </div>


                        <div className="edit_buttons">
                            <button onClick={handleEditPassword} className="edit_confirm_button">Confirmar</button>
                            <button onClick={cancelEditPassword} className="edit_cancel_button">Cancelar</button>
                            
                        </div>
                    </div>


                </div>
            </div>
        
        </>
    )
}

export default Profile 
