const notes = require('express').Router();
const fs = require ('fs');
const shortUniqueId = require('short-unique-id');

//'GET /api/notes/ should read the 'db.json' file & return all saved notes as JSON
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    fs.readFile('./db/db.json', 'utf8', (data) => res.json(JSON.parse(data)));
})

//'POST /api/notes' receive a new note to save on request body + add to 'db.json' file + return the new note to the client + give each note a unique id when it's saved (npm packages?)
notes.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    console.log (req.body);

    const { title, text } = req.body;
    const uid = new shortUniqueId({ length: 8 });

    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uid(),
        }

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const parsedNotes = JSON.parse(data);

                parsedNotes.push(newNote);

                fs.writeFile('./db/db.json', JSON.stringify(parsedNotes, null, 4), (err) => err ? console.log (err) : console.log(`New note added!`))
            }
        })
    } else {
        console.log('Error in adding tip')
    }
});

module.exports = notes;