const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Message extends Model {
    
}

Message.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        message_text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        room_id: {

        }
    }
);

module.exports = Message;

