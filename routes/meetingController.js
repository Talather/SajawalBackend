const express = require('express');
const router = express.Router();
const nodemailerController = require('./nodemailerController');

router.post('/', nodemailerController.scheduleMeeting);

module.exports = router;
