const router = require('express').Router();

// router.use('/', require('./swagger'));
router.use('/contacts', require('./contacts'));

router.get('*', (req, res) => {
  res.status(404).send('404 Not found.');
});

module.exports = router;