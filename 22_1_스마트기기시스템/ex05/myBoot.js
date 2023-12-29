const network = require(‘network’);
const lcd = require(‘./myLcd.js’);

lcd.init();

network.get_active_interface((err,interfaces) => {
    if(interfaces !== undefined){
        if(interfaces.name == ‘wlan0’){
            lcd.printMessage1(interfaces.ip_address);
            lcd.printMessage2(‘201839485’);
        }
    }
});