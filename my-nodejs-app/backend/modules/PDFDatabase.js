/*
    This module manages the SQLite database which stores metadata
    for the various pdf files.

    It starts by connecting or creating the database, before 
    defining the first function, initializeDatabase.

    initializeDatabase creates the table if it isn't alreadu made
    It creates four columns, id, filename, title, and description
    and prints a message after it finishes based on its success.

    It exports 3 functions:

    getAllPDFs selects all PDF records in the database and returns
    an array of all matching rows.

    getPDFByFilename returns a specific pdf's data/row by its name
    I'm not sure if I ever used this function

    addPDF inserts a new PDF record into the database, this is the 
    main function used to insert pdfs for testing purposes.
*/

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database file location
const dbPath = path.join(__dirname, '..', 'pdfs.db');

// Create/connect to database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to SQLite database');
        initializeDatabase();
    }
});

// Create table if it doesn't exist
function initializeDatabase() {
    db.run(`
        CREATE TABLE IF NOT EXISTS pdfs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            filename TEXT NOT NULL UNIQUE,
            title TEXT NOT NULL,
            description TEXT
        )
    `, (err) => {
        if (err) {
            console.error('Error creating table:', err);
        } else {
            console.log('PDFs table ready');
        }
    });
}

module.exports = {
    // Get all PDFs with metadata
    getAllPDFs: function(callback) {
        db.all('SELECT * FROM pdfs', [], (err, rows) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, rows);
            }
        });
    },

    // Get single PDF by filename
    getPDFByFilename: function(filename, callback) {
        db.get('SELECT * FROM pdfs WHERE filename = ?', [filename], (err, row) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, row);
            }
        });
    },

    // Add a new PDF
    addPDF: function(filename, title, description, callback) {
        db.run(
            'INSERT INTO pdfs (filename, title, description) VALUES (?, ?, ?)',
            [filename, title, description],
            function(err) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, this.lastID);
                }
            }
        );
    }
};