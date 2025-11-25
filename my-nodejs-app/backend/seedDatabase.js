/*
    This is a short script ran by "node seedDatabase.js"
    If the pdfs.db file is present in /backend delete it 
    before running.

    This file is used to put the pdfs in /documents into
    the database, as well as assign their metadata. I never
    bothered to figure out how to do that without resetting
    the database, which was quite lazy.

    It uses timeout to ensure the database is ready before
    data is inserted, errors occur otherwise.
*/

const PDFDatabase = require('./modules/PDFDatabase');

// Add your 3 PDFs here
const pdfsToAdd = [
    {
        filename: 'Dryocampa_rubicunda.pdf',
        title: 'Dryocamp rubicunda',
        description: 'An article on the rosy maple moth.'
    },
    {
        filename: 'Moth.pdf',
        title: 'Moths',
        description: 'An article on Moths'
    },
    {
        filename: 'Saturniidae.pdf',
        title: 'Sautrniidae Family',
        description: 'An article on the Saturniidae Family of moths, which the rubicunda belongs to.'
    }
];

// Wait a moment before seeding database to ensure its been initialized
setTimeout(() => {
    pdfsToAdd.forEach(pdf => {
        PDFDatabase.addPDF(pdf.filename, pdf.title, pdf.description, (err, id) => {
            if (err) {
                console.error(`Error adding ${pdf.filename}:`, err.message);
            } else {
                console.log(`Added ${pdf.filename} with ID ${id}`);
            }
        });
    });

    // Exit after all inserts are done
    setTimeout(() => {
        console.log('Database seeding complete!');
        process.exit();
    }, 1000);
}, 1000);