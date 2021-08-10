const reportsTemplate = require('../../views/admin/reports');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {

    res.send(reportsTemplate());
});

module.exports = router;