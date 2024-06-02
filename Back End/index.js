//create an express server
const express = require('express');
const app = express();

// // const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// // const config = require('./DB.js');
//use cors to allow cross origin resource sharing
app.use(cors());
app.use(express.json());


//connect to mongoose
mongoose.connect('mongodb://localhost:27017/Andaz-E-Bayan', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;



const userRoute = require('./routes/user.route')
const contentRoute = require('./routes/article.route')
const feedbackRoute = require('./routes/feedback.route')
const tagRoute = require('./routes/tag.route')
const compRoute = require('./routes/competition.route')
const teamRoute = require('./routes/team.route')


app.use('/api/v1', userRoute);
app.use('/api/v1', contentRoute);
app.use('/api/v1', feedbackRoute);
app.use('/api/v1', tagRoute);
app.use('/api/v1', compRoute);
app.use('/api/v1', teamRoute);


//testing purpose 
// console.log(user);



// app.post('/test', async (req, res) => {})

//Debugigng purposes
const listRoutes = () => {
    const routes = [];
    app._router.stack.forEach(middleware => {
        if (middleware.route) { // if it is a route
            routes.push({
                path: middleware.route.path,
                method: Object.keys(middleware.route.methods).join(', ').toUpperCase()
            });
        } else if (middleware.name === 'router') { // router middleware 
            middleware.handle.stack.forEach(handler => {
                if (handler.route) {
                    routes.push({
                        path: handler.route.path,
                        method: Object.keys(handler.route.methods).join(', ').toUpperCase()
                    });
                }
            });
        }
    });
    console.log('Routes:', routes);
};


listRoutes()

const modelNames = Object.keys(mongoose.models);

// Iterate over the model names and get the associated schemas
Object.keys(mongoose.models).forEach(modelName => {
    console.log(modelName);
});
// console.dir(app);
// ended 

// app.post('/register', async (req, res) => {
//     try {
//         const user = await User.create(
//             {
//                 name: req.body.name,
//                 password: req.body.password,
//                 email: req.body.email
//             }
//         )

//         res.json({ status: 'ok' })
//     } catch (error) {
//         res.json({ status: 'fail' })
//     }
// });

// app.post('/login', async (req, res) => {
//     console.log(req.body)

//     const user = await User.findOne({ email: req.body.email, password: req.body.password })
//     console.log(user);
//     if (!user) {
//         console.log(user);
//         return res.json({ status: "fail" })
//     }
//     if(user){
//         return res.json({ status: "ok" })
//     }
//     // else{
//     //     return res.json({ status: "fail" })
//     // }
// });

// post(path, async function(req, resp))
// app.post('/test', async (req, res) => {
//     try {
// const account = await Account.create(
//     {
//         name: "first",
//         password: "first",
//         blockedAccounts:[]
//     }
// )
// const user = await User.create(
//     {
//         dateOfBirth: "1/1/1",
//         account: account._id
//     }
// )
// res.json({ status: 'ok' })
//     } catch (error) {
//         res.json({ status: 'fail' })
//     }

// })


// //run express server on port 4000
const port = process.env.PORT || 4000;
const server = app.listen(port, function () {
    console.log('Listening on port ' + port);
});
