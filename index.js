const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://kyenite:medeldb@cluster0.ad4k20p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/MEANCRUD', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:')); 
db.once('open', function() {
    console.log('Connected to MongoDB'); 
});

app.use('/accounts', require('./routes/accounts'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
