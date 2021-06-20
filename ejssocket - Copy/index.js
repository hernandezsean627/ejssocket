if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}


const express = require('express')
const app = express();
const server = require('http').createServer(app)
const mongoose = require('mongoose');
const Msg = require('./models/messages');
const io = require('socket.io')(server, { cors: { origin: "*"}})

const dbUrl = process.env.DB_URL

mongoose.connect( dbUrl
, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})


app.set('view engine', 'ejs')

app.get('/', async(req, res) => {
  const msgs = await Msg.find({})
  res.render('home', {msgs})
    
})

const port = process.env.PORT || 3001;
server.listen(port, () => {
    console.log(`Server running in port ${port} `)
 });

io.on('connection', (socket) => {
  
    socket.on('chat message', msg => {
      const message = new Msg({msg})
      message.save().then(() => {
        io.emit('chat message', msg);
      })
      
    });
  });
