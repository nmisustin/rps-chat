const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const http = require('http')
const socketio = require('socket.io')

const app = express();
const PORT = process.env.PORT || 3001;
const server = http.createServer(app);
const io = socketio(server)

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(routes);

io.on('connection', socket => {
    console.log('new connection')

    socket.emit('message', 'You are now connected')
    socket.emit('recievedMessage', 'testing')

    socket.on('userMessage', msg => {
        console.log(msg);
        socket.broadcast.emit('recievedMessage', msg);
    })
})

sequelize.sync({ force: false }).then(() => {
    server.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});