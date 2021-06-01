const Chat = require('./Chat');
const User = require('./User');
const Message = require('./Message')
const Room = require('./Room');

User.hasMany(Message, {
    foreignKey: 'user_id'
});

Message.belongsTo(User, {
    foreignKey: 'user_id,'
});

User.belongsTo(Room, {
    through: Login,
    foreignKey: 'room_id',
})