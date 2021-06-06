const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const http = require('http')
const socketio = require('socket.io')

const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: 'This is our secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}

const app = express();
const PORT = process.env.PORT || 3001;
const server = http.createServer(app);
const io = socketio(server);

app.use(session(sess))
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(routes);

const users = [];
io.on('connection', socket => {
    socket.emit('connection', 'new connection');
    socket.on('create', room => {
        socket.join(room);
        socket.on('username', username => {
            console.log(username);
            console.log(users);
            if(users.indexOf(username)=== -1){
                console.log('entered')
                users.push(username);
            }
            else{
                console.log('did not enter')
            }
            console.log(users);
            socket.to(room).emit('users', users);
        })
        socket.on('userMessage', msg => {
            console.log(msg);
            socket.broadcast.to(room).emit('recievedMessage', msg);
        })
        socket.on('disconnect', user => {
            users.splice(users.indexOf(user), 1);
            console.log(users);
            socket.to(room).emit('users', users);
        })
    })
    socket.emit('message', 'You are now connected')
})

sequelize.sync({ force: false }).then(() => {
    server.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});