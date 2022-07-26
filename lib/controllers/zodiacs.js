const { Router } = require('express');
const router = Router();

const zodiacSigns = require('../../data/zodiacSigns.js');

router
  .get('/search', (req, res) => {
    const formattedDate = new Date(req.query['date'].split('/').slice(0, 2).join('/'));
    const zodiac = zodiacSigns.find((zodiac) => {
      return new Date(zodiac.dates.split(' ').slice(0, 2).join(' ')) <= formattedDate && new Date(zodiac.dates.split(' ').slice(3, 5).join(' ')) >= formattedDate;
    });
    res.json(zodiac);
  })
  .get('/:id', (req, res) => {
    const zodiacs = zodiacSigns.find((zodiac) => zodiac.id === req.params.id);
    res.json(zodiacs);
  })
  .get('/', (req, res) => {
    const zodiac = zodiacSigns.map((zodiac) => ({ id: zodiac.id, name: zodiac.name }));
    res.json(zodiac);
  });

module.exports = router;
