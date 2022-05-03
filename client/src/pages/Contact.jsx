import React from 'react'
import HeaderUserpage from '../components/Userpage/HeaderUserpage'

const Contact = () => {
    return(
        <>
            <HeaderUserpage/>
            <div className="container_about_page">
                <div className="about_page_info">
                    <div className="about_page_title">
                        <h1>Contato</h1>
                    </div>
                    <div className="about_page_content">
                        <h3>Telefone: (99) 999189-4579</h3>
                        <h3>E-mail: daniel.r.sousa1911@gmail.com</h3>
                        <h3>LinkedIn: <a href="https://www.linkedin.com/in/daniel-rodrigues-78b732224/" className="text_link">Daniel Rodrigues</a></h3>
                        <h3>Github: <a href="https://github.com/rdanielrs" className="text_link">rdanielrs</a></h3>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact