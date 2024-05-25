import React from 'react'
import Card  from "./Card";
function Cards() {
    return (
        <div className="cards">
            <Card imgPath={'src\\assets\\logo.png'}
                text={'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci sequi minima ullam quis quibusdam omnis aperiam? Nostrum eum aliquam perferendis ratione, a repudiandae. Accusamus beatae voluptas, velit dolore accusantium sint?'}>
            </Card>
            <Card imgPath={'src\\assets\\logo.png'}
                text={'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci sequi minima ullam quis quibusdam omnis aperiam? Nostrum eum aliquam perferendis ratione, a repudiandae. Accusamus beatae voluptas, velit dolore accusantium sint?'}>
            </Card>
            <Card imgPath={'src\\assets\\logo.png'}
                text={'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci sequi minima ullam quis quibusdam omnis aperiam? Nostrum eum aliquam perferendis ratione, a repudiandae. Accusamus beatae voluptas, velit dolore accusantium sint?'}>

            </Card>


        </div>
    )
}

export default Cards