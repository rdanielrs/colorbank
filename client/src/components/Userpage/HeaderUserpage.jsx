import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const HeaderUserpage = () => {
    const [ overlayMobileView, setOverlayMobileView ] = useState("none")
    const [ accButtonsView, setAccButtonsView ] = useState("none")
    

    const [ mobileMenuState, setMobileMenuState ] = useState(0)

    var mobileMenuWidth = 0


    const navigate = useNavigate()

    useEffect(() => {
        let x = document.cookie.split(";")
        if (x.length > 1) {
            setAccButtonsView("block")
            
            
        }

        if (x.length <= 1) {
            setAccButtonsView("none")
        }
        
    }, [])

    const redirectToHomePage = () => {
        let x = document.cookie.split("id=") 
        navigate(`/userpage/${ x[1] }`)

    }

    const redirectToAccount = () => {
        let x = document.cookie.split("id=")
        navigate(`/profile/${x[1]}`)
        
    }

    const redirectToAbout = () => {
        navigate("/about")
    }

    const redirectToContact = () => {
        navigate("/contact")
    }

    const logOut = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        navigate("/")
    }

    const showMobileMenu = () => {
        if (overlayMobileView === "none") {
            setOverlayMobileView("flex")

            var mobileMenuInterval = setInterval(function() {
                mobileMenuWidth += 10
                setMobileMenuState(mobileMenuWidth)

                if (mobileMenuWidth === 200) {
                    clearInterval(mobileMenuInterval)
                }
            }, 1)
        }

        if (overlayMobileView === "flex") {
            setOverlayMobileView("none")
            mobileMenuWidth = 0
            setMobileMenuState(0)
        }


    }

    return(
        <>
            <header>
                <div className="container_header_userpage">
                    <div className="header_userpage">
                        <div className="title_header">
                            <h2>Banco de cores</h2>
                        </div>

                        <div className="menu_header">
                            <ul className="header_options">
                                <li><button onClick={redirectToHomePage} className="header_button">Início</button></li>
                                <li><button style={{ display: accButtonsView }} onClick={redirectToAccount} className="header_button">Minha conta</button></li>

                                <li><button onClick={redirectToAbout} className="header_button">Sobre</button></li>
                                <li><button onClick={redirectToContact} className="header_button">Contato</button></li>
                                <li><button style={{ display: accButtonsView }} onClick={logOut} className="header_button">Sair</button></li>
                                
                            </ul>

                            <button onClick={showMobileMenu} className="header_button_mobile"><i className="fa fa-bars" aria-hidden="true"></i></button>
                        </div>


                    </div>
                </div>
            </header>

            <div onClick={showMobileMenu} style={{ display: overlayMobileView }} className="overlay_mobile_header">

            </div>

            <div style={{ display: overlayMobileView, width: mobileMenuState }} className="mobile_header">
                <div className="container_mobile_button_close">
                    <button onClick={showMobileMenu} className="header_button_mobile"><i className="fa fa-bars" aria-hidden="true"></i></button>
                </div>
                <ul className="mobile_header_options">
                    <li><button onClick={redirectToHomePage} className="header_button">Início</button></li>
                    <li style={{ display: accButtonsView }}><button onClick={redirectToAccount} className="header_button">Minha conta</button></li>

                    <li><button onClick={redirectToAbout} className="header_button">Sobre</button></li>
                    <li><button onClick={redirectToContact} className="header_button">Contato</button></li>
                    <li style={{ display: accButtonsView }}><button onClick={logOut} className="header_button">Sair</button></li>
                </ul>
            </div>
        
        </>
    )
}

export default HeaderUserpage