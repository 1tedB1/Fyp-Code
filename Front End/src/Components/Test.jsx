import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function Test() {
    async function handleSubmit(e) {
        e.preventDefault()
        const res = await fetch('http://localhost:4000/test', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name:"name",
                password : "pass"
            })

        })
        const data = await res.json()
        console.log(data.hi);
    }

    return (
        <form action="get" onSubmit={handleSubmit}>
            <input type="text" name="name" id="name" placeholder='name' />
            <br />
            <input type="password" name="pass" id="pass" placeholder='pass' />
            <br />
            <button>sumbit</button>
        </form>

    )
}

export default Test

// the select wla
// import React, { useState } from 'react';
// import Select from 'react-select';

// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' },
// ];

// export default function App() {
//   const [selectedOption, setSelectedOption] = useState(null);

//   return (
//     <div className="App">
//       <Select
//         defaultValue={selectedOption}
//         onChange={setSelectedOption}
//         options={options}
//       />
//     </div>
//   );
// }
