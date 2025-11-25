/*
    This module takes filenames, goes to its supposed directory
    and then tries to access the file. If it succeds the file is valid
    if not, the file doesn't exist.
*/


const fs = require('fs');
const path = require('path');

const PDFDirectory = path.join(__dirname, '..', 'public', 'documents');

module.exports = {
    validatePDF: async function (filename) {
        const filePath = path.join(PDFDirectory, filename);

        try {
            await fs.promises.access(filePath, fs.constants.F_OK);
            return true;
        } catch {
            return false;
        }
    }
};