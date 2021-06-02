const router = require('express').Router();
const sequelize = require('../config/connection');
const User = require('../models/User');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    res.render('homepage', {});
});

router.get('/chat/rock', withAuth, (req, res) => {
    res.render('rockchat', {});
});

router.get('/chat/paper', withAuth, (req, res) => {
    res.render('paperchat', {});
});

router.get('/chat/scissors', withAuth, (req, res) => {
    res.render('scissorschat', {});
});

module.exports = router;