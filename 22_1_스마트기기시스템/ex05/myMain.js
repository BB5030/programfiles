const humidtemp = require('./myHt.js');
const HTPIN = 21;

const network = require('network');
const lcd = require('./myLcd.js');

const fan = require('./myFan.js');

lcd.init();

network.get_active_interface((err, interfaces) => {
    if (interfaces !== undefined) {
        if (interfaces.name == 'wlan0') {
            lcd.printMessage1(interfaces.ip_address);
        }
    }
});

setInterval(() => { humidtemp.out(); }, 5000);

process.on('SINGINT', () => {
    fan.TurnOff();
    process.exit();
});