const catchAsync = require("../middlewares/catchAsync");
const Team = require('../models/team.model')


// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/Andaz-E-Bayan', { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.Promise = global.Promise;


const createTeam = catchAsync(async (req, res) => {
    const { members, sharedWork, name } = req.body;
    const newTeam = await Team.create({
        members,
        sharedWork,
        name
    });

    console.log("New team created:", newTeam);
    res.status(201).json({
        success: true,
        message: "Team created successfully",
        data: newTeam
    });
})

module.exports.createTeam = createTeam

const deleteTeam = catchAsync(async (req, res) => {
    const { id } = req.body;
    await Team.findByIdAndDelete(id);

    res.status(200).json({
        success: true,
        message: "Team deleted successfully"
    });
})

module.exports.deleteTeam = deleteTeam

const addSharedWork = catchAsync(async (req, res) => {

    const { teamId, content, title, shareId } = req.body;
    console.log("teamId", teamId, "content", content, "title", title, "shareId", shareId);
    const team = await Team.findById(teamId);
    const sharedWorks = team.sharedWork;
    team.sharedWork = team.sharedWork.filter(obj => obj._id != shareId )
    // console.log(team.sharedWork);
    team.sharedWork.push({ content, title });
    await team.save();
    res.status(200).json({
        success: true,
        message: "Shared work added successfully",
        data: team.sharedWork
    });
    
})

// res = {}
// req = {
//     body:{
//         id: "665bf96f0e43d56d7cda978c",
//         content: "کبھی ہم خوبصورت تھے",
//         title: "کبھی ہم خوبصورت تھے"
//     }
// }

// addSharedWork(req, res)

module.exports.addSharedWork = addSharedWork

const getTeams = catchAsync(async (req, res) => {
    // find teams of the user based on the id given in req body
    // const { userId } = req.body;
    const teams = await Team.find().populate('members');
    // console.log(userId);
    // const userTeams = teams.filter(team => team.members.includes(userId));
    res.status(200).json({
        success: true,
        message: "All teams fetched",
        data: teams
    });
})

module.exports.getTeams = getTeams


res = {}

// req={
//     body:{
//         members: ["665332e533b732d06d94ebe9", "6654300b8ab9ce458b7dd990"],
//         sharedWork: [],
//         name: "Team 2"
//     }
// }
req2 = {
    body: {
        members: ["6654300b8ab9ce458b7dd990", "665bf48620135ac77b97f49b"],
        sharedWork: [],
        name: "Team 3"
    }
}

// req3 = {
//     body:{
//         members: ["665bf4ad20135ac77b97f49d", "665332e533b732d06d94ebe9"],
//         sharedWork: [],
//         name: "Team 1"
//     }
// }

// createTeam(req,res)
// createTeam(req2,res)
// createTeam(req3,res)


