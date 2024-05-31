// const jwt = require('jsonwebtoken');

// const i = jwt.sign("hi", "key")


// // console.log(i);

// console.log(jwt.verify(i,"key"));

// let state = {
//     name: 'name',
//     age: 20
// }

//  state = {
//     ...state,
//     age: 21,
//     name: "neew "
// }


// console.log(state);


let state = {
    name: 'name',
    age: 20
}

let {name, ag} = state;
console.log(name, ag==null);