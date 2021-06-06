const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const http = require('http')
const socketio = require('socket.io')

const session = require('express-session');
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

const rooms = {
    rock: {},
    paper: {},
    scissors: {},
}
const games = {};
function gameLogic(game){
    if(game.weapon_1 === 'rock'&& game.weapon_2 === 'scissors'|| game.weapon_1 === 'scissors'&& game.weapon_2 === 'paper'|| game.weapon_1 === 'paper'&& game.weapon_2 ==='rock'){
        game.message = `${game.player_1} beat ${game.player_2} in a game of rock paper scissors!`;
    }
    else if (game.weapon_2 === 'rock' && game.weapon_1 === 'scissors'|| game.weapon_2 === 'scissors' && game.weapon_1=== 'paper'|| game.weapon_2==='paper'&& game.weapon_1 === 'rock'){
        game.message = `${game.player_2} beat ${game.player_1} in a game of rock paper scissors!`;
    }
    else if (game.weapon_1 === game.weapon_2){
        game.message = `${game.player_1} and ${game.player_2} tied in a game of rock paper scissors!`;
    }
    else{
        console.log('There was an error!');
    }
}
io.on('connection', socket => {
    let user = '';
    socket.emit('connection', 'new connection');
    socket.on('create', room => {
        socket.join(room);
        io.in(room).emit('ready', `a user has joined ${room}`)
        socket.on('username', username => {
            user = username;
            console.log(rooms[room]);
            if(!(username in rooms[room])){
                console.log('entered')
                rooms[room][username] = socket.id;
            }
            io.in(room).emit('users', Object.keys(rooms[room]));
            console.log('connecting',rooms)
        })
        socket.on('userMessage', msg => {
            console.log(msg);
            socket.broadcast.to(room).emit('recievedMessage', msg);
        })
        socket.on('startGame', users => {
            console.log(users);
            const user_1 = rooms[room][users.player_1];
            const user_2 = rooms[room][users.player_2];
            io.to(user_1).emit('challenge', `${users.player_2} has challenged you to a game of rock paper scissors! Click your weapon!`);
            io.to(user_2).emit('challenge', `You challenged ${users.player_1} to a game of rock paper scissors! Click your weapon!`);
            games[users.player_1] = users;
            games[users.player_2] = users;
        });
        socket.on('fight', data => {
            console.log(data);
            console.log(games);
           const g = games[data.user];
           console.log(g);
           if(data.user === g.player_1){
               g.weapon_1 = data.weapon;
               if('weapon_2' in g){
                   gameLogic(g);
                   io.to(room).emit('gameResult', g.message);
                   delete games[g.player_1];
                   delete games[g.player_2];
                   console.log('games end',games);
               }
           }
           else if(data.user === g.player_2){
               g.weapon_2 = data.weapon;
               if('weapon_1' in g){
                   gameLogic(g);
                   io.to(room).emit('gameResult', g.message);
                   delete games[g.player_1];
                   delete games[g.player_2];
                   console.log('games end',games);
               }
           }
           else{
               console.log('there was an error!')
           }
        })
        socket.on('disconnect', () => {
            delete rooms[room][user];
            console.log(rooms[room]);
            io.in(room).emit('users', Object.keys(rooms[room]));
            console.log('disconnecting', user, ' ' ,rooms);
        })
    })
})

sequelize.sync({ force: false }).then(() => {
    server.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});