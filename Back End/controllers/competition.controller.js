const catchAsync = require("../middlewares/catchAsync");
const Competition = require('../models/competition.model')

// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/Andaz-E-Bayan', { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.Promise = global.Promise;


const createCompetition = catchAsync(async (req, res) => {
    // start date, end date, participants,entries, winner, name, description,  prize, competition status

    const { startDate, endDate, participants, entries, winner, name, description, prize, status, tags } = req.body;
    const newCompetition = await Competition.create({
        startDate,
        endDate,
        participants,
        entries,
        winner,
        name,
        description,
        prize,
        status,
        tags
    });

    console.log("New competition created:", newCompetition);
    res.status(201).json({
        success: true,
        message: "Competition created successfully",
        data: newCompetition
    });
})

module.exports.createCompetition = createCompetition;

const getAllCompetitions = catchAsync(async (req, res) => {
    // console.log("Getting all competitions");
    const competitions = await Competition.find().populate(
        {
            path: 'participants',

        }
    ).populate(
        {
            path: 'entries',

        }
    ).populate(
        {
            path: 'winner',

        }
    ).populate(
        {
            path: 'tags',

        }

    );
    // console.log(competitions);
    competitions.forEach(
        competition => {
            if (competition.endDate < Date.now()) {
                // console.log("Competition ended");
                competition.competitionStatus = "completed"
                competition.save()
            }
        }
    )
    res.status(200).json({
        success: true,
        message: "All competitions fetched successfully",
        data: competitions
    });
})
// console.log(getAllCompetitions);
module.exports.getAllCompetitions = getAllCompetitions;

const addEntry = catchAsync(async (req, res) => {
    const { competitionId, entryId,participantId } = req.body;
    const competition = await Competition.findById(competitionId)
    if (!competition.entries.includes(entryId)) {
        competition.entries.push(entryId);
    }
    if(!competition.participants.includes(participantId)){
        competition.participants.push(participantId)
    }
    competition.save()
    res.status(200).json({
        success: true,
        message: "Entry added successfully",
        data: competition
    });
})

console.log("a", addEntry);
module.exports.addEntry = addEntry;




// req = {
//     body: {
//         name:"comp 1",
//         startDate: Date.now(),
//         endDate: new Date(2,2,2),
//         description: "desc",
//         prize: "prize",
//         competitionStatus: "live"
//     }
// }

// res = {}
// getAllCompetitions(req, res)
// createCompetition(req, res)


