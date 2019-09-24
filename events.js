// events (publish subscribe) pattern
const events = {};

export const on = (eventName, fn) => {
    events[eventName] = events[eventName] || [];
    events[eventName].push(fn);
};
export const off = (eventName, fn) => {
    if (events[eventName]) {
        for (let i = 0; i < events[eventName].length; i++) {
            if (events[eventName][i] === fn) {
                events[eventName].splice(i, 1);
                break;
            }
        }
    }
};
export const trigger = (eventName, data) => {
    if (events[eventName]) {
        events[eventName].forEach(function(fn) {
            return fn(data);
        });
    }
};
