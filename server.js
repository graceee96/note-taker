const express = require('express');
const path = require('path');
const api = require('./routes/index.js')

const PORT = 3001;

const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

//HTML route - 'GET /notes' returns 'notes.html' file
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')))

//HTML route - 'GET *' should return 'index.html' file
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));