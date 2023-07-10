
import { alarm } from './types'

const timepicker = document.getElementById('alarm') as HTMLInputElement;
timepicker.addEventListener('click', () => {
    timepicker.focus();
});
displayAlarms();
  
timepicker.addEventListener('blur', () => {
    // Check if the time input value has changed
    if (timepicker.value !== '') {
        const time = timepicker.value.split(':');
        // const hours = time[0];
        // const minutes = time[1];
        const alarm = {
            time: timepicker.value
        };


        fetch("http://10.0.0.45:3000/alarm", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json' // Specify the content type of the request body
            },
            body: JSON.stringify(alarm) // Convert the data to JSON string
        })
        // .then(response => response.json())
        .then(response => response.text())
        .then(result => {
            //TODO Handle the response from the server
            //show error if something went crazy
            console.log(result);
        })
        .catch(error => {
            // Handle any errors that occur during the request
            console.error(error);
        }); 
    }
});
//display set alarms from file
function displayAlarms() {
    fetch("http://10.0.0.45:3000/alarm")
    .then(response => response.json())
    .then(alarms => {
        alarms.forEach((alarm: alarm) => {
            //@ts-ignore
            document.getElementById('alarms').innerHTML += JSON.stringify(alarm) + '<br>';
        });
    })
}


