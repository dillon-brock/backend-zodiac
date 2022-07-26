const { Router } = require('express');
const router = Router();

const baseURL = 'http://ohmanda.com/api/horoscope/';

router.get('/:name', async (req, res) => {
  const fetchURL = baseURL + req.params.name + '/';
  const horoscope = await fetch(fetchURL);
  res.json(await horoscope.json());
});

module.exports = router;
