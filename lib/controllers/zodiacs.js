const { Router } = require('express');
const router = Router();


const zodiacSigns = require('../../data/zodiacSigns.js');

router
  .get('/search', (req, res) => {
    const splitDate = req.query['date'].split('/').slice(0, 2);
    const formattedDate = new Date(splitDate.join('/'));
    let zodiac;
    if ((Number(splitDate[0]) === 12 && Number(splitDate[1]) >= 22) || (Number(splitDate[0]) === 1 && Number(splitDate[1]) <= 20)) {
      zodiac = zodiacSigns.find((zodiac) => zodiac.name === 'capricorn');
      res.json(zodiac);
    }
    else {
      zodiac = zodiacSigns.find((zodiac) => {
        const startDate = new Date(zodiac.dates.slice(0, 6));
        const endDate = new Date(zodiac.dates.slice(9));
        return startDate <= formattedDate && endDate >= formattedDate;
      });
      res.json(zodiac);
    }
  })
  .get('/:id', (req, res) => {
    const zodiacs = zodiacSigns.find((zodiac) => zodiac.id === req.params.id);
    res.render('sign', { name: zodiacs.name, dates: zodiacs.dates, symbol: zodiacs.name, id: 'id: ' + zodiacs.id });
  })
  .get('/', (req, res) => {
    const zodiac = zodiacSigns.map((zodiac) => ({ id: zodiac.id, name: zodiac.name }));
    res.json(zodiac);
  });

module.exports = router;
