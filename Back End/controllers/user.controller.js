const catchAsync = require("../middlewares/catchAsync");
const User = require('../models/user.model');
const ErrorHandler = require('../utils/errorHandler');
const jwt = require('jsonwebtoken');
// const Grid = require('gridfs-stream');
const Grid = require("gridfs-stream");
const bodyParser = require('body-parser');
const path = require('path');
const { Readable } = require('stream');

// const mongoose = require('mongoose');

// // mongoose.connect('mongodb://localhost:27017/Andaz-E-Bayan', { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.Promise = global.Promise;
// // Grid.mongo = mongoose.mongo;

// var conn = mongoose.createConnection(..);
// let gfs = 2;
// console.log("hiiiiiiiiiiiiiiii");
// conn.once('open', function () {
//     gfs = Grid(conn.db, mongoose.mongo);
//     gfs.collection('uploads')
//     console.log("1",gfs);
//     // all set!
// })

// console.log(gfs);



module.exports.singupUser = catchAsync(async (req, res) => {
    // console.log("sign here");
    let { name, email, password, dob, avatar, isAdmin } = req.body;
    console.log(req.body);
    avatar = (avatar == null) ? 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png' : avatar;
    // isAdmin = (isAdmin == null) ? false : isAdmin;
    // console.log(1);
    // console.log(avatar);
    const user = await User.findOne({ email: email });


    // console.log(2,gfs);

    // var writestream = gfs.createWriteStream([avatar]);
    // fs.createReadStream('/some/path').pipe(writestream);

    console.dir(req.body);

    if (user) {
        res.status(201).json({
            message: "user Exists",
            success: false
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

module.exports.editProfile = catchAsync(async (req, res) => {
    const { email, password, name, dob, img } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email: email });
    if (!user) {
        res.status(201).json({
            success: false,
            message: "User not found",
        });
        return
    }
    user.email = email;
    user.password = password;
    user.name = name;
    // user.dob = dob;
    user.img = img;
    console.log(user);
    await user.save();
    res.status(201).json({
        success: true,
        message: "User edited successfully",
    });

})

module.exports.getAllUsers = (catchAsync(async (req, res) => {
    // console.log("here");
    const users = await User.find().populate(
        {
            path: 'blockedUsers',
        }
    ).populate(
        {
            path: 'articles',
        }
    );
    res.status(201).json({
        data: users
    });
}))

module.exports.getUser = catchAsync(async (req, res) => {
    // console.log("hi");
    const { token } = req.body
    // console.log("hi",token);
    const decoded = jwt.verify(token, "andazebayan")
    const user = await User.findById(decoded).populate(
        {
            path: 'blockedUsers',
        }
    ).populate(
        {
            path: 'articles',
        }
    );
    res.status(201).json({
        success: true,
        message: "User logged successfully",
        id: user.id
    });
})

module.exports.loginUser = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    //check if user exists in mongoo db by matching email and password
    const user = await User.findOne({ email: email, password: password }).populate(
        {
            path: 'blockedUsers',
        }
    ).populate(
        {
            path: 'articles',
        }
    );
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

module.exports.blockUser = catchAsync(async (req, res) => {
    const { userId, blockedUserId } = req.body;
    // console.log(req.body);
    const user = await User.findById(userId);
    const blockedUser = await User.findById(blockedUserId);
    // console.log("user", user);
    // console.log(blockedUser);
    if (!user || !blockedUser) {
        res.status(201).json({
            success: false,
            message: "User not found",
        });
        return
    }
    if (!user.blockedUsers.includes(blockedUserId))
        user.blockedUsers.push(blockedUserId);
    await user.save();
    res.status(201).json({
        success: true,
        message: "User blocked successfully",
    });
}
)

module.exports.unblockUser = catchAsync(async (req, res) => {
    console.log(req.body);
    const { userId, blockedUserId } = req.body;
    const user = await User.findById(userId);
    const blockedUser = await User.findById(blockedUserId);
    console.log(user.blockedUsers);
    // console.log(blockedId);
    if (user.blockedUsers.includes(blockedUserId)) {
        user.blockedUsers.pop(blockedUserId);
        res.status(201).json({
            success: false,
            message: "User not found",
        });
        await user.save();
    }
    // if (!user || !blockedUser) {
    //     res.status(201).json({
    //         success: false,
    //         message: "User not found",
    //     });
    //     return
    // }
    // console.log("before",user.blockedUsers);
    // user.blockedUsers.pop(blockedId);
    // console.log("after",user.blockedUsers)
    await user.save();
    res.status(201).json({
        success: true,
        message: "User unblocked successfully",
    });

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



