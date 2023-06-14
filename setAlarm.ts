import express from 'express'
import cors from 'cors'

import fs from 'fs'
const app = express();
app.use(cors());

app.post('/api/data', (req, res) => {
    // Handle the request and send a response
    req.on('data', (data) => {
        const time = JSON.parse(data.toString());
        const hours = time.hours;
        const minutes = time.minutes;
        const timeString = `${hours}:${minutes}`;
        writeToFile(timeString);
    });
    res.send('Data received');
});


function writeToFile(time:string) {
    //use fs to write to file
    fs.writeFile('alarm.txt', time, (err) => {
       if (err) throw err;
       console.log('The file has been saved!');
    });

}

function readFromFile() {
    //use fs to read from file
    fs.readFile('alarm.txt', 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data);
    });
}

const port = 3000; // Choose the desired port number
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});