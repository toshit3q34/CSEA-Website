const express = require('express');
const router = express.Router();
const InternExp = require('../models/InternExp');

router.get('/', async (req, res) => {
    try {
        const experiences = await InternExp.find();
        res.json(experiences);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const experience = new InternExp({
        internName: req.body.internName,
        position: req.body.position,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        linkedin: req.body.linkedin,
        year: req.body.year
    });

    try {
        const newExperience = await experience.save();
        res.status(201).json(newExperience);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;