import React from 'react'
import HeaderUserpage from '../components/Userpage/HeaderUserpage'
import FooterUserpage from '../components/Userpage/FooterUserpage'

const About = () => {
    return (
        <>
            <HeaderUserpage/>
            <div className="container_about_page">
                <div className="title_about_page">
                    <h1>Sobre</h1>
                </div>


                <div className="section_container">
                    <div className="section_title_container">
                        <h2>1 - Como utilizar</h2>
                    </div>

                    <div className="description_about_page">
                        <p>Crie uma conta na página de <a className='text_link' href="/register">registro</a> com um nome de usuário único e senha. Feito isso, você poderá criar paletas com até nove cores para exibição na página inicial do usuário.</p>
                        <p>A tela de criação de cores pede um título e o código da cor que você quer incluída na paleta. Contanto que este código defina uma cor (Hex, RGB ou simplesmente o nome de uma cor), ela será inserida na paleta de cores. Tendo preenchido todos os campos necessários, a paleta pode ser publicada pelo usuário, tornando-se visível assim que armazenada no banco de dados.</p>
                        <p>As cores pertencentes a cada paleta individual podem ser vistas e copiadas com simples interações no mouse: para ver o código da cor, basta passar o mouse por cima da cor que você deseja ver. Para copiar o código da cor para a área de transferência, clique na sua caixa individual. Em tablets ou aparelhos celulares, apenas clique nas cores de uma paleta.Suas cores e seus respectivos códigos serão exibidos numa tela exclusiva para sistemas portáteis.</p>
                    </div>
                </div>

                <div className="section_container">
                    <div className="section_title_container">
                        <h2>2 - Objetivos</h2>
                    </div>

                    <div className="description_about_page">
                        <p>1 - Criar uma plataforma onde paletas de cores podem ser armazenadas e acessadas de forma dinâmica, proporcionando ao usuário uma seleção organizada e de fácil uso.</p>
                        <p>2 - Demonstrar conhecimentos front e back-end a partir da criação de uma interface gráfica que interage diretamente com um servidor que recebe dados inseridos pelo usuário.</p>
                        <p>3 - Expandir conhecimentos web-development e se manter em dia com as tecnologias e ferramentas atuais do mercado de trabalho.</p>
                    </div>
                 </div>

                
                <div className="section_container">
                    <div className="section_title_container">
                        <h2>3 - Bibliotecas e frameworks utilizados</h2>
                    </div>

                    <div className="description_about_page">
                        <p>Cliente: React, react-router-dom; Servidor: Express, Bcrypt, MongoDB, JWT, Axios.</p>
                        <p>A área visual é construída a partir do React e seu sistema de componentização, contando com um total de 12 páginas e componentes conectados a um único arquivo, que recebe todos os arquivos de estilização e rotas do site.</p>
                        <p>O servidor do site utiliza o Express para configurar as suas rotas, que armazenam e trocam informações com um banco de dados MongoDB. Além disso, o site emprega a biblioteca de criptografia de senhas Bcrypt para gerar senhas seguras e acessíveis apenas ao usuário. As sessões de cada usuário recebem validação por tokens, gerados pela biblioteca JWT. Estes tokens são gerados de forma única e determinam se uma ação ou página é autorizada ou não.</p>
                        <p>Na área client-side, a troca de informações é feita com o Axios, que recebe a URL do servidor em um arquivo separado e permite que requisições HTTP sejam feitas em qualquer página com uma simples importação de arquivos.</p>
                    </div>
                </div>

                 <div className="section_container">
                    <div className="section_title_container">
                        <h2>4 - Limitações e metas</h2>
                    </div>

                    <div className="description_about_page">
                        <p>Em seu estado atual, o site possui limitações técnicas decorrentes de funções ainda não implementadas ou fora de conhecimento. Essas limitações são: </p>
                        <p>Falta de sistema de envio e recebimento de e-mail, falta de páginas dedicadas a paletas respectivas e impossibilidade de editar e customizar contas e paletas.</p>
                        <p>As metas para o futuro do site constituem não só a inclusão de funções ainda não presentes como também melhoras e ferramentas além do que o site atualmente proporciona, tornando-o ainda mais útil e viável para o uso diário.</p>
                    </div>
                </div>

                <div className="section_container">
                    <div className="section_title_container">
                        <h2>5 - Conclusão</h2>
                    </div>

                    <div className="description_about_page">
                        <p>Com a finalização das funcionalidades primárias do projeto, conclui-se que a área de desenvolvimento web atual se encontra em constante e rápida evolução, criando um cenário onde conhecimentos e qualificações atuais se tornam a prioridade de qualquer desenvolvedor atual.</p>
                    </div>
                </div>

            </div>
        
            <FooterUserpage/>
        </>
    )
}

export default About