const express = require('express');
const router = express.Router();
const Team = require('../models/Team');


router.get('/', async (req, res) => {
    try {
        const teams = await Team.find();
        res.json(teams);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post('/', async (req, res) => {
    const team = new Team({
        name: req.body.name,
        pos: req.body.pos,
        url: req.body.url
    });

    try {
        const newTeam = await team.save();
        res.status(201).json(newTeam);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
