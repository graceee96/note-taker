const express = require('express');
const path = require('path');
const fs = require ('fs');

const PORT = 3001;

const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//HTML route - 'GET /notes' returns 'notes.html' file
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')))

//HTML route - 'GET *' should return 'index.html' file
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));


//make another file ('notes.js') in routes folder
//'GET /api/notes/ should read the 'db.json' file & return all saved notes as JSON


//'POST /api/notes' receive a new note to save on request body + add to 'db.json' file + return the new note to the client + give each note a unique id when it's saved (npm packages?)


app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));