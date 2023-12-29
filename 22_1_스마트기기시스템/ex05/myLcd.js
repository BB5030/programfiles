const LCD = require('raspberrypi-liquid-crystal');
const lcd = new LCD(1, 0x27, 16, 2);
const Lcd = {
    message: ['Line1', 'Line2'],
    init: () => {
        lcd.beginSync();
        lcd.clearSync();
    },
    printMessage1: (line1) => {
        lcd.setCursorSync(0, 0);
        lcd.printSync(line1);
    },
    printMessage2: (line2) => {
        lcd.setCursorSync(0, 1);
        lcd.printSync(line2);
    }
};

module.exports.init = function () { Lcd.init(); };
module.exports.printMessage1 = function (line1) { Lcd.printMessage1(line1); };
module.exports.printMessage2 = function (line2) { Lcd.printMessage2(line2); };