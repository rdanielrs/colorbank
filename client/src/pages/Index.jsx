import React, { useState } from 'react'
import HeaderIndex from '../components/Index/HeaderIndex'
import Login from '../components/Index/Login'



const Index = () => {
    const [ currentColor, setCurrentColor ] = useState('')

    const [ infoColorDisplay, setInfoColorDisplay ] = useState("none")
    

    const [ colorList ] = useState([/* azul */"#023e8a", "#0077b6", "#0096c7", "#00b4d8", "#48cae4", "#90e0ef", "#ade8f4", "#caf0f8", /*verde*/ "#b7e4c7", "#95d5b2", "#74c69d", "#52b788", "#40916c", "#2d6a4f", "#1b4332", "#081c15", /* amarelo */ "#ff7b00", "#ff8800", "#ff9500", "#ffa200", "#ffaa00", "#ffb700", "#ffc300", "#ffd000", /*laranja*/ "#ffba08", "#faa307", "#f48c06", "#e85d04", "#dc2f02", "#d00000", "#9d0208", "#6a040f", /* rosa*/ "#800f2f", "#a4133c", "#c9184a", "#ff4d6d", "#ff758f", "#ff8fa3", "#ffb3c1", "#ffccd5", /*roxo*/ "#e0aaff", "#c77dff", "#9d4edd", "#7b2cbf", "#5a189a", "#3c096c", "#240046", "#10002b"])

   



    const showCurrentColor = (event) => {
        setInfoColorDisplay("flex")
        setCurrentColor(event.target.style.backgroundColor)
    }  

    const hideCurrentColor = () => {
        setInfoColorDisplay("none")
    }

    return(
        <>
            <HeaderIndex/>

            <div className="container_mid_page">
                <div  className="login_window">
                    <Login/>
                </div>   

                <div className="infographics">
                    <div className="infographics_title">
                        <h2>Sobre esta aplicação</h2>
                    </div>

                    <div className="infographics_content">
                        <div className="description">
                            <p>Página criada com React e NodeJS com o objetivo de facilitar o armazenamento e catalogação de paletas de cores dos seus respectivos projetos.</p>
                            <p>Crie paletas com até nove cores. Em desktops, passe o mouse por cima da cor que você deseja ver. Para copiar esta cor, clique nela. Em aparelhos portáteis, clique no conjunto de cores pertencentes à uma paleta: uma tela será aberta, exibindo suas cores de forma acessível para sistemas touchscreen.</p>
                        </div>

                        <div className="color_reel_container">

                            { colorList.map((color) => (<div key={colorList.indexOf(color)} style={{ backgroundColor: color, }} id={colorList.indexOf(color)} onMouseOver={(e) => showCurrentColor(e)} onMouseOut={hideCurrentColor} className='colorBlock'></div>)) }

                        </div>
                    </div>

                    <div className="bottom_info">
                        <a href="/about" className="bottom_about_link">Mais informações</a>
                        <a href="/contact" className="bottom_contact_link">Contato</a>
                    </div>

                </div>

                <div className="container_info_color">
                    <div style={{ display: infoColorDisplay }} className="info_color">
                        <div className="text_info_color">
                            <p>{ currentColor }</p>
                        </div>

                        <div className="color_box_container">
                            <div style={{ backgroundColor: currentColor, border: `3px solid ${currentColor}` }} className="color_box"></div>
                        </div>

                    </div>
                </div>

            </div>


        </>
    )
}

export default Index