const fs = require('fs')
const path = rquire('path');

const PDFDirectory = path.join(__dirname, '..', 'documents');

modules.exports = {
    getPDFList: async function () {
        const files = await fs.promises.readdir(pdfDirectory);
        
        return files
            .filter(f => f.endsWith('.pdf'))
            .map(f => ({
                filename: f,
                title: f.replace('.pdf', ''),
                description: "Example description here"
            }));
    }
};
