import React from 'react'

const ColorDemo = (props) => {
    return(
        <>
            <div style={{ backgroundColor: props.colorCode }} className='colorBlock'></div>
        </>
    )
}

export default ColorDemo