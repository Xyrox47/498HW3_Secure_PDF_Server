
const fs = require('fs');
const path = require('path');

const pdfDirectory = path.join(__dirname, '..', 'pdfs');

module.exports = {
    validatePDF: async function (filename) {
        const filePath = path.join(pdfDirectory, filename);

        try {
            await fs.promises.access(filePath, fs.constants.F_OK);
            return true;
        } catch {
            return false;
        }
    }
};