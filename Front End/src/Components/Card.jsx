import React from 'react'

function Card({ imgPath, text, heading }) {
    return (
        <div className='card'>
            <img src={imgPath} alt="dfdf" width='200px' />
            {/* <br /> */}
            <div>
                <h4 className='card-heading'>{heading}</h4>
                {/* <br />
            <hr /> */}

                <p>{text}</p>
            </div>

        </div>
    )
}

export default Card