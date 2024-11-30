const express = require('express');
const router = express.Router();
const contactFormController = require('./contactFormControllers');

router.post('/', contactFormController.submitContactForm);

module.exports = router;
