const mongoose = require('mongoose');
const express = require('express');


const app = express();

//Middleware
app.use(express.json());

//constant for database for creating connection with datbase
const db = 'mongodb+srv://ambi007:ambi007@cluster0.yv4np.mongodb.net/TODO?retryWrites=true&w=majority';

mongoose.connect(db, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => console.log('Connected to MongoDB Database...'))
    .catch(err => console.log('Database Connection Error...' + err))

//Use Routes
app.use('/api/todo', require('./routes/todo'));


//Listen To Port
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


const port = process.env.port || 5000;


app.listen(port, () => {
    console.log('Server is started on Port' + port)
})
