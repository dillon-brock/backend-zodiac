const { Router } = require('express');
const router = Router();

const zodiacSigns = require('../../data/zodiacSigns.js');

router
    .get('/:id', (req, res) => {
        const zodiacs = zodiacSigns.find((zodiac) => zodiac.id === req.params.id);
        res.json(zodiacs);
    })
    .get('/', (req, res) => {
        const zodiac = zodiacSigns.map((zodiac) => ({ id: zodiac.id, name: zodiac.name }));
        res.json(zodiac);
    });

module.exports = router;