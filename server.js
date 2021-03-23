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
app.get("/list", async (req, resp) => {
    resp.send(await readJSON("./students.json"));
});

/* Search Student */
app.post("/search", async (req, resp) => {
    const obj = JSON.parse(await readJSON("./students.json"));

    // Perform search
    if(obj.hasOwnProperty(req.body.id)){
        resp.send({
            found: true,
            name: obj[req.body.id]   
        });
    }
    else{
        resp.send({
            found: false,
            name: ""
        });
    }
});

/* Add Student */
app.post("/add", async (req, resp) => {
    const obj = JSON.parse(await readJSON("./students.json"));
    obj[req.body.id] = req.body.name;

    // Write back to JSON
    fs.writeFile("./students.json", JSON.stringify(obj, null, 4), (err) => {
        if(err){
            console.log("Write file failed: " + err);
        }
    })

    // Respond with updated JSON string
    resp.send(JSON.stringify(obj));
});
/* Delete Student */


/* Read JSON file */
function readJSON(path){
    return new Promise((res, rej) => {
        fs.readFile(path, (err, str) => {
            if(err){
                console.log("File read failed:", err);
                rej();
            }
            res(str);
        });
    })
}