/*
    This is pretty much the app.get section that was in server.js
    copy pasted, but using the router function in express.
*/

const path = require('path');
const express = require('express');

module.exports = function createRouter(PDFDiscovery, PDFValidation) {
    const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const PDFList = await PDFDiscovery.getPDFList();
        
        res.render('home', {
            title: 'Rubicunda Fan Site',
            currentPage: 'home',
            PDFs: PDFList  // Add this
        });
    } catch (error) {
        console.error('Error loading PDFs:', error);
        res.render('home', {
            title: 'Rubicunda Fan Site',
            currentPage: 'home',
            PDFs: []  // Empty array on error
        });
    }
});

    router.get('/documents', async (req, res) => {
        const PDFList = await PDFDiscovery.getPDFList();

        res.render('documents', {
            title: "PDF Library",
            PDFs: PDFList
        });
    });

    //
    router.get('/documents/:name', async (req, res) => {
        const fileName = req.params.name;

        const isValid = await PDFValidation.validatePDF(fileName);
        if (!isValid) {
            return res.status(404).send("PDF not found");
        }

        const filePath = path.join(__dirname, '..', 'public', 'documents', fileName);   

        res.sendFile(filePath, (err) => {
            if (err) {
                console.error('Error sending PDF:', err);
                res.status(500).send("Error reading the PDF file.");
            }
        });
    });

    // 404 Errors
    router.use((req, res) => {
        res.status(404).render('404', {
            title: "404 - Not Found",
            url: req.originalUrl
        });
    });

    return router;
};