const express = require('express');
const {handleGenerateUrl, handleGetAnalytics} = require('../Controllers/url');
const router = express.Router();

router.post('/', handleGenerateUrl);

router.get("/analytics/:shortUrl", handleGetAnalytics);


module.exports = router;
