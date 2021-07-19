const express = require('express')
const app = express();

const cors = require('cors')

const mongoose = require('mongoose');
const Movie = require('./models/movie');

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const dbUrl = 'mongodb+srv://mernproject:mernproject@cluster0.kymbq.mongodb.net/merntest?retryWrites=true&w=majority'

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

app.get('/movies', async (req, res) => {
    const movies = await Movie.find({});
    res.json( { movies })
});


app.post('/movies', async (req, res) => {
    const movie = new Movie(req.body.movie);
    await movie.save();
    
})

const port = 3001;

app.listen(port, () => {
  console.log("Listening on port: ", port);
});