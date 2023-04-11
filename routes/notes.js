const notes = require('express').Router();
const fs = require ('fs');
const shortUniqueId = require('short-unique-id');
const path = require('path');
const notesData = require('../db/db.json')

//'GET /api/notes/' should read the 'db.json' file & return all saved notes as JSON
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            // console.log(data);
            res.json(JSON.parse(data))
        }
    });
});

//'GET /api/notes/:id' return specific note
notes.get('/:id', (req, res) => {
    const requestedNoteID = req.params.id;
    
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const parsedNotes = JSON.parse(data);

            for (i = 0; i < parsedNotes.length; i++) {
                if (requestedNoteID === parsedNotes[i].note_id) {
                    return res.json(parsedNotes[i])
                }
            }
        }
    }
})

//'POST /api/notes' receive a new note to save on request body + add to 'db.json' file + return the new note to the client + give each note a unique id when it's saved (npm packages?)
notes.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    // console.log (req.body);

    const { title, text } = req.body;
    const uid = new shortUniqueId({ length: 8 });

    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uid(),
        }

        fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const parsedNotes = JSON.parse(data);

                parsedNotes.push(newNote);

                fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(parsedNotes, null, 4), (err) => err ? console.log (err) : console.log(`New note added!`))

                return res.json(parsedNotes);
            }
        })
    }
});

//'DELETE /api/notes/:id' - read all notes in db.json, remove note with id property, rewrite notes to db.json
// notes.delete('/:id', (req, res) => {
//     console.info(`${req.method} request received to delete note`);
//     const requestedNotesID = req.params.id;

//     fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
//         if (err) {
//             console.log(err);
//         } else {
//             const parsedNotes = JSON.parse(data);

//             for (let i = 0; i < parsedNotes.length; i++) {
//                 if (requestedNotesID === parsedNotes[i].note_id) {
//                     return parsedNotes.splice([i], 1);
//                 }
//             }

//             fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(parsedNotes, null, 4), (err) => err ? console.log (err) : console.log(`Note ${requestedNotesID} removed!`));

//             return res.json(parsedNotes);
//         }
//     }
// })

module.exports = notes;