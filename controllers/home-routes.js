const router = require('express').Router();
const sequelize = require('../config/connection');
const User = require('../models/User');

router.get('/', (req, res) => {
    res.render('homepage', {});
});

router.get('/chat', (req, res) => {
    res.render('chat', {});
});

router.get('/rockchat', (req, res) => {
    res.render('rockchat', {});
});

router.get('/paperchat', (req, res) => {
    res.render('paperchat', {});
});

router.get('/scissorschat', (req, res) => {
    res.render('scissorschat', {});
});

module.exports = router;