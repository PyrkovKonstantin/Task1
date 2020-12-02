const express = require('express');
const router = express.Router();
const User = require('../controller/User');

router.get('/', async (_req, res, next) => {
    try {
        const result = await User.getAdmins();
        res.send(result);
    } catch (err) {
        next(err);
    }
});
router.post('/registr', async (req, res, next) => {
    try {
        const { login, email, password } = req.body;
        const result = await User.registr(login, email, password);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await User.login( email, password);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.put('/reset', async (req, res, next) => {
    try {
        const result = await User.resetPassword(req.params.id);
        res.send(result);
    } catch (err) {
        next(err);
    }
});
module.exports = router;