const express = require('express');
const router = express.Router();

const { handleCreateAccount } = require('../controllers/user.js');

router.post('/create', async (req, res) => {
	await handleCreateAccount(req, res);
});

module.exports = router;