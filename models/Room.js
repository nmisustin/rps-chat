const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Room extends Model {}

Room.init(
    {
        id: {

        }
    }
)

module.exports = Room;