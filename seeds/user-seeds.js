const sequelize = require('../config/connection');
const User = require('../models');

const userdata = [
    {
        username: 'alexg',
        password: 'password1'
    },
    {
        username: 'nikkim',
        password: 'password1'
    },
    {
        username: 'nikold',
        password: 'password1'
    },{
        username: 'test4',
        password: 'password1'
    },{
        username: 'test5',
        password: 'password1'
    },
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;