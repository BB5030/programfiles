const temp = require("node-dht-sensor");
const lcd = require('./myLcd.js');
const fan = require('./myFan.js');

const humidtemp = {
    type: 22,
    pin: 21,
    humid: 0.0,
    temper: 0.0,
    hTemp: 0.0,
    out: () => {
        let str = ' ';
        temp.read(humidtemp.type, humidtemp.pin, (err, temp, humi) => {
            if (!err) {
                humidtemp.temper = temp.toFixed(1);
                humidtemp.humid = humi.toFixed(1);
                str = humidtemp.temper + 'C ' + humidtemp.humid + '%'
                lcd.printMessage2(str);
            }
        });

        if (humidtemp.hTemp <= humidtemp.humid) {
            fan.TurnOn();
        }
        else
            fan.TurnOff();

        humidtemp.hTemp = humidtemp.humid;
    }
}

process.on('SIGINT', () => {
    fan.TurnOff();
    process.exit();
});

module.exports.out = function () { humidtemp.out(); };