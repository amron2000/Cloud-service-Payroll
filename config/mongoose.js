const mongoose = require('mongoose');
const mysql = require('mysql');
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb+srv://amron2000:amron1234567@cluster0.bophe.mongodb.net/students?retryWrites=true&w=majority');  
const db = mongoose.connection;  


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Success db');
});





