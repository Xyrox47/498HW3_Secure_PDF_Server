const path = require('path');
const express = require('express');

module.exports = function createRouter(PDFDiscovery, PDFValidation) {
    const router = express.Router();

    router.get('/', (req, res) => {
        res.render('home', {
            title: 'TOTALLY NOT WILD WEST FORUM',
            currentPage: 'home',

            // isLoggedIn: req.session.isLoggedIn,
            // username: req.session.username
        });
    });

    router.get('/documennts', async (req, res) => {
        const PDFList = await PDFDiscovery.getPDFList();

        res.render('PDFs', {
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

        const filePath = path.join(__dirname, '..', 'PDFs', fileName);

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