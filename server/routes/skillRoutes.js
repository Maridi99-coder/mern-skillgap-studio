const express = require('express');
const router = express.Router();
const { analyzeSkillGap } = require('../controllers/skillController');

router.post('/analyze', analyzeSkillGap);

module.exports = router;