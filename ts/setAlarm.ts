import { v4 as uuidv4 } from 'uuid';

import express from 'express'
import cors from 'cors'

import {alarm} from './data'
import fs from 'fs'

const app = express();
app.use(cors());
app.use(express.json())   //parse request body as JSON

const filePath = 'alarm.json';

app.post('/alarm/',async (req, res) => {
    // Handle the request and send a response
    try {
        //get new alarm(s) from request body
        const {time,days,enabled} = req.body;
        //read existing alarms from file
        //TODO WHAT IF FILE DOESN'T EXIST OR EMPTY?
        const savedAlarms: alarm[] = await readFromFile();
        const newAlarms: alarm = {id: uuidv4(), time: time, days: days, active: enabled};
        
        //combine existing alarms with new alarms
        savedAlarms.push(newAlarms);

        writeToFile(savedAlarms);
        res.status(200).send('Alarm set');
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});


app.get('/alarm/', async (req, res) => {
    try {
        let alarms = await readFromFile();
        res.status(200).json(alarms);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});
app.put('/alarm/:id', async (req, res) => {
    try {
        //get updated alarm from request body
        const jsonData = req.body;
        const updatedAlarm: alarm = jsonData;

        //read existing alarms from file
        const savedAlarms: alarm[] = await readFromFile();

        //find the index of the alarm to update
        const index = savedAlarms.findIndex( (alarm:alarm) => alarm.id === updatedAlarm.id);

        //if the alarm is not found, return a 404 error
        if (index === -1) {
            res.status(500).send('Alarm not found');
            return;
        }

        //update the alarm at the specified index
        savedAlarms[index] = updatedAlarm;

        //write the updated alarms to file
        writeToFile(savedAlarms);

        res.status(200).send('Alarm updated');
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.delete('/alarm/:id', async (req, res) => {
    try {
        //get ID of alarm to delete
        const id = req.params.id;

        //read existing alarms from file
        //TODO WHAT IF FILE DOESN'T EXIST OR EMPTY?
        const savedAlarms: alarm[] = await readFromFile();

        //find index of alarm to delete
        const index = savedAlarms.findIndex((alarm:alarm) => alarm.id === id);
        if (index === -1) {
            res.status(500).send('Alarm not found');
            return;
        }

        //remove alarm from array
        savedAlarms.splice(index, 1);

        writeToFile(savedAlarms);
        res.status(200).send('Alarm deleted');
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

function writeToFile(alarms:alarm[]) {
    
    fs.writeFileSync(filePath, JSON.stringify(alarms));
    //use fs to write to file
    // fs.appendFile(filePath, alarm  + '\n', (err) => {
    //     if (err) throw new Error(err.message);
    //     console.log('The file has been updated!');
    // });
}

function readFromFile():Promise<alarm[]> {
    //use fs to read from file
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            try {
                const alarms = JSON.parse(data);
                resolve(alarms);
            } catch (err) {
                console.error(err);
                reject("Error parsing JSON");
            }
        });
    });
}

const port = 3000; // Choose the desired port number
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});