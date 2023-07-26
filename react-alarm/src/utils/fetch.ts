import { alarm } from "../../../ts/types"

type F = (...args: alarm[]) => void
type uploadEntry = {alarm:alarm,timeout:NodeJS.Timeout}


export const throttledUpdate = throttle(updateAlarm,1000);
export const throttledCreate = throttle(createAlarm,1000);
export const throttledDelete = throttle(deleteAlarm,1000);
export const fetchURL = "http://10.0.0.10:3000/alarm";

/**
 * disallow spamming of fetch request by adding deboucning map to throttle request
 * 
 * For every change to an alarm that the user makes on the UI 
 * the cache will wait timeDelay number of ms to send the fetch request
 * if the user modifies the alarm within the timeDelay the alarm will be updated and the 
 * timeDelay will start over
 * 
 */

function throttle(fn: F, timeDelay: number): F {
    const cache:Map<string,uploadEntry> = new Map();
    return function (alarm:alarm) {
        const has = cache.has(alarm.id);
        if (has) {
            const timeout = cache.get(alarm.id)?.timeout;
            clearTimeout(timeout);
        } 
        cache.set(alarm.id,{alarm: alarm, timeout: setTimeout(() => fn(alarm),timeDelay)})
    }
}

function updateAlarm(alarm:alarm) {
    fetch(`${fetchURL}/${alarm.id}`, {
        method: 'PUT',
        body: JSON.stringify(alarm),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log(response.status)
    })
    .catch(error => {
        // Handle error
        console.error(error);
    });
};
function createAlarm(alarm:alarm) {
    fetch(`${fetchURL}`, {
        method: 'POST',
        body: JSON.stringify(alarm),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log(response.status)
    })
    .catch(error => {
        // Handle error
        console.error(error);
    });
};
function deleteAlarm(alarm:alarm) {
    fetch(`${fetchURL}/${alarm.id}`, {
        method: 'DELETE',
        body: JSON.stringify(alarm),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log(response.status)
    })
    .catch(error => {
        // Handle error
        console.error(error);
    });
}

