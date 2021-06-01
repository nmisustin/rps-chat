const router = require('express').Router();
const sequelize = require('../config/connection');
const User = require('../models/User');

router.get('/', (req, res) => {
    res.render('homepage', {});
});
<<<<<<< HEAD

router.get('/chat', (req, res) => {
    res.render('chat', {});
});

module.exports = router;