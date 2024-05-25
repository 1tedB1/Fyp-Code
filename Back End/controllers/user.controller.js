const catchAsync = require("../middlewares/catchAsync");
const User = require('../models/user.model');
const ErrorHandler = require('../utils/errorHandler');
const jwt = require('jsonwebtoken');


module.exports.singupUser = catchAsync(async (req, res) => {
    console.log("here");
    const { name, email, password, dob, avatar, isAdmin } = req.body;

    // avatar = (avatar == null) ? 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png' : avatar;
    // isAdmin = (isAdmin == null) ? false : isAdmin;
    // console.log(1);

    const user = await User.findOne({ email: email });
    // console.dir(req.body);

    if (user) {
        res.status(201).json({
            message: "user Exists",
            success:false
        })
        return
    }

    const newUser = await User.create({
        name,
        email,
        password,
        dob,

    });

    console.log("New user created:", newUser);
    // res.status(201)
    res.status(201).json({
        success: true,
        message: "User created successfully",
        // data: newUser
    });

});

module.exports.getAllUsers = (catchAsync(async (req, res) => {
    console.log("here");
    const users = await User.find();
    res.status(201).json({
        success: true,
        message: "All users fetched successfully",
        data: users
    });
}))

module.exports.getUser() = catchAsync(async (req, res) => {
    const {token} = req.body
    const decoded = jwt.verify(token, "andazebayan")
    const user = await User.findById(decoded);
    res.status(201).json({
        success: true,
        message: "User logged successfully",
        id: user.id
    });
})

module.exports.loginUser = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    //check if user exists in mongoo db by matching email and password
    const user = await User.findOne({ email: email, password: password })
    if (user) {
        console.log(user.email);
        const token = jwt.sign(user.id, "andazebayan")
        // res.json({ token })
        console.log(user.id);
        res.status(201).json({
            success: true,
            message: "User logged successfully",
            token: token,
            id: user.id
        });


    }
    else {
        console.log("t");
        res.status(201).json({
            success: false,
            message: "User didn't log successfully",
        }
        )
    }
})



// console.log(Date.now());

// req = {
//     body: {
//         name: 'test2',
//         email: 'tes2t@gamil.com',
//         password: "te3st",
//         dob: Date.now()
//     }
// }

// res = {}

// next = () => {
//     console.log("nexta");
// }

// loginUser(req, res);
// singupUser(req, res);



