const logged = require('../middlewares/logged');
const express = require('express');
const router = express.Router();

router.post('/', logged, async (req, res) => {

    res.send('at checkout post')
})

module.exports = router;