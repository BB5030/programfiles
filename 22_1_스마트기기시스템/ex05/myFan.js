const gpio = require('pigpio').Gpio;
const relay = new gpio(26, { mode: gpio.OUTPUT });

const TurnOn = () => {
    relay.digitalWrite(1);
}

const TurnOff = () => {
    relay.digitalWrite(0);
}

module.exports.TurnOn = function () { TurnOn(); };
module.exports.TurnOff = function () { TurnOff(); };