/* Requirement and instances */
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");

/* Enable json parsing */
app.use(express.urlencoded({extended: false}));
app.use(express.json());

/* Static path */
app.use("/", express.static(__dirname));

/* Any number from the IANA ephemeral port range (49152-65535) */
const port = 50000;

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});

/* List Students */
app.get("/list", (req, resp) => {
    fs.readFile("./students.json", (err, jsonStr) => {
        if (err) {
            console.log("File read failed:", err);
            return;
        }
        resp.send(jsonStr);
    });
});

/* Search Student */
app.post("/search", (req, resp) => {
    fs.readFile("./students.json", (err, jsonStr) => {
        if(err){
            console.log("File read failed:", err);
            return;
        }

        const obj = JSON.parse(jsonStr);

        console.log("Got body: " + req);

        // Perform search
        if(~obj.hasOwnProperty(req.body.id)){
            resp.send({
                found: false,
                name: ""
            });
        }
        else{
            resp.send({
                found: true,
                name: obj[req.body.id]   
            });
        }
    });
});

/* Add Student */


/* Delete Student */
