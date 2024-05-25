import React from 'react'

function Card({imgPath, text}) {
    return (
        <div className='card'>
            <img src={imgPath} alt="dfdf" width='200px' />
            <p>{text}</p>
        </div>
    )
}

export default Card