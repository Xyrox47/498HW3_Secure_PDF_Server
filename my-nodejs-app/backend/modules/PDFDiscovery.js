/*
    This module connects the existing pdfs to the metadata stored 
    in the database in order to display them on  the website

    It works by returning a promise filled with the information. 
    The promise itself mainly consists of a map call that for each
    pdf found in the documents folder, searches for a matching 
    database entry. If found, return the metadata and attach it to
    a new object containing the file and the metadata.
*/

const fs = require('fs');
const path = require('path');
const PDFDatabase = require('./PDFDatabase');

const PDFDirectory = path.join(__dirname, '..', 'public', 'documents');

module.exports = {
    getPDFList: async function () {
        // Get files from filesystem
        const files = await fs.promises.readdir(PDFDirectory);
        const pdfFiles = files.filter(f => f.endsWith('.pdf'));
        
        // Get metadata from database
        return new Promise((resolve, reject) => {
            PDFDatabase.getAllPDFs((err, dbPDFs) => {
                if (err) {
                    reject(err);
                    return;
                }
                
                // Combine filesystem and database data
                const pdfList = pdfFiles.map(filename => {
                    const dbEntry = dbPDFs.find(p => p.filename === filename);
                    
                    if (dbEntry) {
                        return {
                            filename: filename,
                            title: dbEntry.title,
                            description: dbEntry.description
                        };
                    } else {
                        // PDF exists but no database entry
                        return {
                            filename: filename,
                            title: filename.replace('.pdf', ''),
                            description: 'No description available'
                        };
                    }
                });
                
                resolve(pdfList);
            });
        });
    }
};