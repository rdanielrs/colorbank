import React, { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'



import { format } from 'date-fns'

import HeaderUserpage from '../components/Userpage/HeaderUserpage'


import api from '../services/api'


const Userpage = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [ colorInsert, setColorInsert ] = useState("")
    const [ paletteTitle, setPaletteTitle ] = useState("")
    const [ userToken, setUserToken ] = useState("")
    var menuWidth = 0

    const [ colorList, setColorList ] = useState([])
    const [ warningText, setWarningText ] = useState("")
    

    const [ isBusy, setIsBusy ] = useState(true)
    const [ wasRemoved, setWasRemoved ] = useState(false)
    const [ wasAdded, setWasAdded ] = useState(false)
    

   

    const [ paletteList, setPaletteList ] = useState([])
    const [ paletteId, setPaletteId ] = useState("0")
    const [ paletteView, setPaletteView ] = useState({ id: "", title: "Paleta 5", colors: [], created_at: "" })

    const [ menuState, setMenuState ] = useState(0)
    

    //setters de telas
    const [ addNewState, setAddNewState ] = useState("none")
    const [ userDisplayState, setUserDisplayState ] = useState("grid")
    const [ noPaletteState, setNoPaletteState ] = useState("flex")

    const [ azView, setAzView ] = useState("flex")
    const [ zaView, setZaView ] = useState("none")

    const [ newestView, setNewestView ] = useState("flex")
    const [ oldestView, setOldestView ] = useState("none")

    const [ biggestView, setBiggestView ] = useState("flex")
    const [ smallestView, setSmallestView ] = useState("none")
    
    const [ removeView, setRemoveView ] = useState("none")
    const [ mobilePaletteView, setMobilePaletteView ] = useState("none")

    
    const [ viewOverlay, setViewOverlay ] = useState("none")
    const [ paletteTitleView, setPaletteTitleView ] = useState("none")

    const [ menuOverlayView, setMenuOverlayView ] = useState("none")

    const [ showcaseView, setShowcaseView ] = useState("none")
    
    
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


    const paletteTitleRef = React.createRef()
    const colorInsertRef = React.createRef()


    useEffect(() => {
        setIsBusy(false)
        if (isBusy === false) {
            api.get(`/users/user/${ id }`, {
                headers: { authorization: `Bearer ${ userToken }` }
            }).then((res) => {
                if (res.status === 200) {
                    setPaletteList(res.data.user.user_palettes)
                    setWasRemoved(false)
                    setWasAdded(false)
                }
            })
        }
    }, [isBusy, id, userToken, wasRemoved, wasAdded])

    useEffect(() => {
        if (paletteList.length === 0) {
            setNoPaletteState("flex")
            setUserDisplayState("none")
        }

        if (paletteList.length > 0 && addNewState === "none") {
            setNoPaletteState("none")
            setUserDisplayState("grid")

        }

        if (paletteList.length === 0 && addNewState === "flex") {
            setNoPaletteState("none")
        }

    }, [paletteList, addNewState])


    const handleAddColor = () => {
        if (CSS.supports("color", colorInsert) === true && colorList.length <= 8) {
            const defineColorId = Math.floor(Math.random() * 100001)
            setColorList([...colorList, { colorId: defineColorId, colorCode: colorInsert }])
            setShowcaseView("block")
            setWarningText("")
            
                
        } else {
            setWarningText("Cor inserida não válida ou tamanho máximo excedido.")
        }

        setColorInsert('')
    }


    const handleAddPalette = () => {
       setAddNewState("flex")
       setUserDisplayState("none")
       setNoPaletteState("none")
    }

    const saveNewPalette = () => {
        if (colorList.length > 0 && paletteTitle.length > 0) {
            api.get(`/users/user/${ id }`, {
                headers: { authorization: `Bearer ${ userToken }` }
            }).then((res) => {
                if (res.status === 200) {
                    api.post(`/users/${ id }`, {
                        title: paletteTitle,
                        colors: colorList
                    }).then((res) => {
                        if (res.status === 200) {
                            setWasAdded(true)
                        }
                    })
    
                    setColorList([])
                    setPaletteTitle("")
                    setShowcaseView("none")
                    setUserDisplayState("none")
                }
            })
        } else {
            setWarningText("Tamanho inválido em título ou lista de cores.")
        }
        
    }

    const cancelNewPalette = () => {
        setPaletteTitle("")
        setWarningText("")
        setShowcaseView("none")
        setColorList([])
        
    }

    const returnToUserpage = () => {
        setAddNewState("none")
        setUserDisplayState("grid")

        setPaletteTitle("")
        setColorList([])

        if (paletteList.length === 0) {
            setNoPaletteState("flex")
        } else {
            setNoPaletteState("none")
        }
    }

   

    const sortSelect = (event) => {
        switch(event.target.id) {
            default:
                break;
            case "a-z":
                api.get(`/users/user/${ id }/sort/a-z`).then((res) => {
                    setPaletteList(res.data.sorted)
                    setAzView("none")
                    setZaView("flex")
                    setNewestView("flex")
                    setOldestView("none")
                    setBiggestView("flex")
                    setSmallestView("none")
                    setRemoveView("flex")
                    
                })
                break;
            case "z-a":
                api.get(`/users/user/${ id }/sort/z-a`).then((res) => {
                    setPaletteList(res.data.sorted)
                    setAzView("flex")
                    setZaView("none")
                    setNewestView("flex")
                    setOldestView("none")
                    setBiggestView("flex")
                    setSmallestView("none")
                    setRemoveView("flex")
                })
                break;

            case "newest":
                api.get(`/users/user/${ id }/sort/newest`).then((res) => {
                    setPaletteList(res.data.sorted)
                    setAzView("flex")
                    setZaView("none")
                    setNewestView("none")
                    setOldestView("flex")
                    setBiggestView("flex")
                    setSmallestView("none")
                    setRemoveView("flex")

                })
                break;
            case "oldest":
                api.get(`/users/user/${ id }/sort/oldest`).then((res) => {
                    setPaletteList(res.data.sorted)
                    setAzView("flex")
                    setZaView("none")
                    setNewestView("flex")
                    setOldestView("none")
                    setBiggestView("flex")
                    setSmallestView("none")
                    setRemoveView("flex")

                })
                break;
            
            case "biggest":
                api.get(`/users/user/${ id }/sort/biggest`).then((res) => {
                    setPaletteList(res.data.sorted)
                    setAzView("flex")
                    setZaView("none")
                    setNewestView("flex")
                    setOldestView("none")
                    setBiggestView("none")
                    setSmallestView("flex")
                    setRemoveView("flex")

                })
                break;

            case "smallest":
                api.get(`/users/user/${ id }/sort/smallest`).then((res) => {
                    setPaletteList(res.data.sorted)
                    setAzView("flex")
                    setZaView("none")
                    setNewestView("flex")
                    setOldestView("none")
                    setBiggestView("flex")
                    setSmallestView("none")
                    setRemoveView("flex")
                })
                break;
            case "remove":
                api.get(`/users/user/${id}`, {
                    headers: { authorization: `Bearer ${ userToken }` }
                }).then((res) => {
                    if (res.status === 200) {
                        setPaletteList(res.data.user.user_palettes)
                    }
                })

                setAzView("flex")
                setZaView("none")
                setNewestView("flex")
                setOldestView("none")
                setBiggestView("flex")
                setSmallestView("none")
                setRemoveView("none")
                break;

        }
    }


    const nextInput = (event) => {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
            switch(event.target.id) {
                default: 
                    break;

                case "palette_title_id":
                    colorInsertRef.current.focus()
                    break;
                
                case "color_insert_id":
                    handleAddColor()
                    break;
            }
        }
       
    }

    


   const confirmDelete = (event) => {
        setPaletteId(event.target.id)
        setPaletteTitleView(paletteList[Number(event.target.parentElement.id)].title)
        setViewOverlay("flex")

        console.log(event.target.id)
   }

   const handleDelete = () => {
        api.get(`/users/user/${ id }`, {
            headers: { authorization: `Bearer ${ userToken }` }
        }).then((res) => {
            if (res.status === 200) {
                api.delete(`/users/${ id }/${ paletteId }`).then((res) => {
                    if (res.status === 200) {
                        setWasRemoved(true)
                        setViewOverlay("none")
                    }
                })
            } 
        })

        setAzView("flex")
        setZaView("none")
        setNewestView("flex")
        setOldestView("none")
        setBiggestView("flex")
        setSmallestView("none")
        setRemoveView("none")

   }

   const cancelDelete = () => {
       setViewOverlay("none")
       setPaletteId()
   }

   const showColorCode = (event) => {
        event.target.firstChild.style.display = "block"

   }

   const hideColorCode = (event) => {
        try {
            event.target.firstChild.style.display = "none"
            
        } catch {
            console.log("Deu merda")
            
        }
   }

   const copyToClipboard = (event) => {
       if (window.innerWidth <= 762) {
           console.log("Tela")
           setPaletteView(paletteList[Number(event.target.parentElement.id)])
           setMobilePaletteView("flex")
           
       } else {
            navigator.clipboard.writeText(event.target.firstChild.textContent)
            console.log("Hex copiado")

       }
   }

   const showMenu = () => {
        if (menuOverlayView === "none") {
            setMenuOverlayView("flex")

            var menuInterval = setInterval(function(){
                menuWidth += 10
                setMenuState(menuWidth)
                if (menuWidth === 200) {
                    clearInterval(menuInterval)
                }
            }, 1)

        }

        if (menuOverlayView === "flex") {
            setMenuOverlayView("none")
            menuWidth = 0
            setMenuState(0)
        }
    }
   
   const closeMobileWindow = () => {
        setMobilePaletteView("none")
   }

   const mobileCopyToClipboard = (event) => {
       console.log(event.target.id)
       console.log(paletteView.colors)
   }
   
    return(
        <>
            <HeaderUserpage/>

            <div className="container_color_handler">
                <div className="container_upper_color_handler">
                    <div className="upper_color_handler">
                        <div className="title_color_handler_container">
                            <h2>Suas paletas</h2>
                        </div>


                        <div className="new_palette_container">
                            <button onClick={handleAddPalette} className="color_handling_button">+ Adicionar paleta</button>
                        </div>

                        <div className="menu_button_container">
                            <button onClick={showMenu} className="menu_button">
                                <i className="fa fa-bars"></i>
                            </button>
                        </div>

                        <div className="filter_select_container">
                            <p className='filter_by_label'>Filtrar por: </p>
                            <div className="select_container">
                                <button id='a-z' style={{ display: azView }} onClick={(e) => sortSelect(e)} className="filter_select_button"> <i className="fa fa-chevron-down"></i>A-Z</button>

                                <button id='z-a' style={{ display: zaView }} onClick={(e) => sortSelect(e)} className="filter_select_button"> <i className="fa fa-chevron-up"></i>Z-A</button>

                                <button id='newest' style={{ display: newestView }} onClick={(e) => sortSelect(e)} className="filter_select_button"> <i className="fa fa-chevron-down"></i>Data de criação</button>

                                <button id='oldest' style={{ display: oldestView }} onClick={(e) => sortSelect(e)} className="filter_select_button"> <i className="fa fa-chevron-up"></i>Data de criação</button>

                                <button id='biggest' style={{ display: biggestView }} onClick={(e) => sortSelect(e)} className="filter_select_button"> <i className="fa fa-chevron-down"></i>Tamanho</button>

                                <button id='smallest' style={{ display: smallestView }} onClick={(e) => sortSelect(e)} className="filter_select_button"> <i className="fa fa-chevron-up"></i>Tamanho</button>

                                <button id='remove' className='filter_select_button' style={{ display: removeView }} onClick={(e) => sortSelect(e)}>Remover filtros</button>

                               
                            </div>
                        </div>

                    </div>
                </div>

                <div className="container_lower_color_handler">
                    <div className="lower_color_handler">
                        <div style={{ display: addNewState }} className="container_add_palette">
                            <div className="return_button_container">
                                <button onClick={returnToUserpage} className="return_button">Voltar</button>
                            </div>
                            <div className="title_add_palette">
                                <h2>Nova paleta</h2>
                            </div>

                            <div className="container_input_palette">
                                <input onKeyPress={(e) => {nextInput(e)}} ref={paletteTitleRef} value={paletteTitle} onChange={(e) => setPaletteTitle(e.target.value)} placeholder='Título' id='palette_title_id' type="text" className="palette_title_insert" />

                                <input onKeyPress={(e) => {nextInput(e)}} ref={colorInsertRef} value={colorInsert} onChange={(e) => setColorInsert(e.target.value)} placeholder='Hex, RGB, etc' id='color_insert_id' type="text" className="palette_color_insert" />

                                <button className='add_color_button' onClick={handleAddColor}>Adicionar cor</button>
                            </div>

                            <p className='warning_text'>{ warningText }</p>

                            <div className="save_palette_container">
                                <button onClick={saveNewPalette} className="save_palette_button">Adicionar</button>
                                <button onClick={cancelNewPalette} className="cancel_palette_button">Cancelar</button>
                            </div>

                            



                            <div style={{ display: showcaseView }} className="preview_palette_showcase">

                                <div className="title_palette_showcase">
                                    <h3>Cores</h3>
                                </div>

                                <div className="color_list_viewer">
                                    
                                    { colorList.map((color) => (<div key={colorList.indexOf(color)} style={{ backgroundColor: color.colorCode }} className='color_list_preview' id={color.colorId}>
                                        
                                    </div>)) }

                                </div>  
                            </div>

                        </div>

                        <div style={{ display: noPaletteState }} className="container_no_palettes">
                            <h1>Você ainda não tem paletas</h1>
                        </div>

                        <div style={{ display: userDisplayState }} className="container_user_display">

                            
                            { paletteList.map((palette) => (
                                <div key={paletteList.indexOf(palette)} className='user_display'>
                                    <div key={palette.id} id={ paletteList.indexOf(palette) } className="palette_color_collection">
                                        { palette.colors.map((color) => palette.colors.indexOf(color) <= 8 && (
                                            <div onClick={(e) => copyToClipboard(e)} onMouseOver={(e) => showColorCode(e)} onMouseOut={ hideColorCode } id={ color.colorId } key={color.colorId} className='palette_color_view' style={{ backgroundColor: color.colorCode }}>
                                                <p className='colorCodeViewer' style={{ display: "none"}}>{ color.colorCode }</p>
                                            </div>
                                        )) }

                                    </div>

                                    <div className="palette_user_info">
                                        <div className="title_user_info">
                                            <h3>{ palette.title }</h3>

                                            <p className='time_label'>{ format(new Date(palette.created_at), "dd/MM/yyyy, hh:mm") }</p>
                                        </div>

                                        <div id={ paletteList.indexOf(palette) } className="container_delete_button">
                                            <button onClick={confirmDelete} className="delete_palette_button" id={ palette.id}>
                                                Remover
                                            </button>

                                            <div onClick={confirmDelete} id={ paletteList.indexOf(palette) } className="delete_palette_button_mobile">
                                                <i className="fa fa-trash"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )) }


                        </div>

                    </div>
                </div>
            </div>
            
            <div onClick={cancelDelete} style={{ display: viewOverlay }} className="overlay_page">

                <div className="confirm_window">
                    <div className="confirm_container">
                        <div className="container_text_remove">
                            <p>Remover paleta "{ paletteTitleView }"?</p>
                        </div>
                        <div className="buttons_container">
                            <button onClick={handleDelete} className="confirm_delete_button">Confirmar</button>
                            <button onClick={cancelDelete} className="cancel_delete_button">Cancelar</button>
                        </div>
                    </div>

                </div>
             </div>


            <div style={{ display: mobilePaletteView }} className="mobile_palette_display">

                <div className="close_window_container">
                    <button onClick={closeMobileWindow} className="close_window">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                <div className="mobile_palette_display_title">
                    <h2>{ paletteView.title }</h2>
                </div>

                <div className="container_colors_mobile">
                    { paletteView.colors.map((color) => (<div key={color.colorId} className='color_container'>
                        <div className="mobile_color_info">
                            <div className="mobile_div_info">
                                <button onClick={(e) => mobileCopyToClipboard(e)} id={ paletteView.colors.indexOf(color) } className="copy_color">
                                    <i className="fa-solid fa-clone"></i>
                                </button>
                                <div style={{ backgroundColor: color.colorCode }} className="mobile_color_block"></div>
                            </div>
                            <div className="mobile_text_info">
                                <p className='mobile_color_code'>{ color.colorCode }</p>
                            </div>
                        </div>
                        
                    </div>)) }
                </div>

            </div>

            <div onClick={showMenu} style={{ display: menuOverlayView  }} className="mobile_menu_overlay">
                
            </div>

            <div style={{ display: menuOverlayView, width: menuState }} className="mobile_menu">
                    <div className="mobile_menu_title">
                        <p>Filtrar por: </p>
                    </div>
                    <ul className='mobile_menu_list'>
                        <li><button id='a-z' style={{ display: azView }} onClick={(e) => sortSelect(e)} className="mobile_filter_select_button"> <i className="fa fa-chevron-down"></i>A-Z</button></li>

                        <li><button id='z-a' style={{ display: zaView }} onClick={(e) => sortSelect(e)} className="mobile_filter_select_button"> <i className="fa fa-chevron-up"></i>Z-A</button></li>

                        <li><button id='newest' style={{ display: newestView }} onClick={(e) => sortSelect(e)} className="mobile_filter_select_button"> <i className="fa fa-chevron-down"></i>Data de criação</button></li>

                        <li><button id='oldest' style={{ display: oldestView }} onClick={(e) => sortSelect(e)} className="mobile_filter_select_button"> <i className="fa fa-chevron-up"></i>Data de criação</button></li>

                        <li><button id='biggest' style={{ display: biggestView }} onClick={(e) => sortSelect(e)} className="mobile_filter_select_button"> <i className="fa fa-chevron-down"></i>Tamanho</button></li>

                        <li><button id='smallest' style={{ display: smallestView }} onClick={(e) => sortSelect(e)} className="mobile_filter_select_button"> <i className="fa fa-chevron-up"></i>Tamanho</button></li>

                        <li><button id='remove' className='mobile_filter_select_button' style={{ display: removeView }} onClick={(e) => sortSelect(e)}>Remover filtros</button></li>
                    </ul>
                </div>

        </>
    )
}

export default Userpage