const { Router } = require('express');
const router = Router();

const zodiacSigns = require('../../data/zodiacSigns.js');

router
  .get('/search', (req, res) => {
    const signsWithDates = zodiacSigns.map((zodiac) => ({ 
      id: zodiac.id,
      startDate: new Date(zodiac.dates.split(' ').slice(0, 2)),
      endDate: new Date(zodiac.dates.split(' ').slice(3, 5))
    }));
    const formattedDate = new Date(req.query['date'].split('/').slice(0, 2).join('/'));
    const sign = signsWithDates.find((sign) => sign.startDate <= formattedDate && sign.endDate >= formattedDate);
    const zodiac = zodiacSigns.find((zodiac) => zodiac.id === sign.id);
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
