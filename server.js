/* Requirement and instances */
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");

/* Enable json parsing */
app.use(express.urlencoded({extended : true}));
app.use(express.json());

/* Static path */
app.use("/", express.static(__dirname));

/* Any number from the IANA ephemeral port range (49152-65535) */
const port = 50000;

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});

/* List Students */
app.get("/list", (req, res) => {
    fs.readFile('./students.json', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err);
            return;
        }
        res.send(jsonString);
    });
});

/* Search Student */


/* Add Student */


/* Delete Student */
