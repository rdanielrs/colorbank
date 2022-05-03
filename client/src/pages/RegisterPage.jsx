import React from 'react'
import HeaderIndex from '../components/Index/HeaderIndex'
import Register from '../components/Index/Register'

const RegisterPage = () => {
    return(
        <>
            <HeaderIndex/>
            <div className="container_register_field">
                <Register/>

                <div className="infographics_register">
                    <div className="info_register_container">
                        <div className="info_register_title">
                            <h2>Informações</h2>
                            <p className="register_subtitle">Ao criar uma conta, tenha em mente que:</p>
                        </div>
                    </div>
                    
                   
                    <div className="list_tips_container">
                        <ul className="list_tips">
                            <li>Em nenhuma circunstância utilize senhas pertencentes a contas pessoais importantes.</li>
                            <li>O nome de usuário deve ser único.</li>
                            <li>Em seu estado atual, a aplicação não permite a restauração de senhas, logo, é recomendado que ela seja de fácil memorização ou salva em outro local seguro.</li>
                            <li>Ainda que não seja recomendado o uso de senhas repetidas, é importante notar que a aplicação ainda conta com criptografia de senhas, aumentando a segurança do usuário.</li>
                        </ul>
                    </div>
                </div>

            </div>
        
        </>
    )
}

export default RegisterPage