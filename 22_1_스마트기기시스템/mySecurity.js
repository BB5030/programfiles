const gpio = require('pigpio').Gpio;
const touch = new gpio(19, { mode: gpio.INPUT });
const button = new gpio(26, { mode: gpio.INPUT });
const echo = new gpio(23, { mode: gpio.INTPUT, alert: true });
const trig = new gpio(24, { mode: gpio.OUTPUT });
const rled = new gpio(21, { mode: gpio.OUTPUT });
const gled = new gpio(20, { mode: gpio.OUTPUT });
const relay = new gpio(16, { mode: gpio.OUTPUT });

var tCount = 0;
var bCount = 0;

trig.digitalWrite(0);
button.glitchFilter(10000);

const security = () => {
    let tData = touch.digitalRead();
    let bData = button.digitalRead();
    let startTick, distance, diff;
    if (tData != 0) { tCount++; }
    if ((tCount % 2) == 1) {
        echo.on('alert', (level, tick) => {
            if (level == 1) { startTick = tick; }
            else {
                const endTick = tick;
                diff = endTick - startTick;
                distance = diff / 58;
                if (distance < 21) { outputs(distance); }
            }
        });
        if (!bData) { bCount++; }
        if ((bCount % 2) == 1) {
            turnOffRelay();
        }
        else {
            turnOnRelay(distance);
        }
    }
    else { distance = 100000; }
};

const outputs = (dis) => {
    if (dis <= 5) {
        rled.pwmWrite(255);
        gled.pwmWrite(255);
    }
    else if (dis > 5 && dis <= 10) {
        rled.pwmWrite(170);
        gled.pwmWrite(170);
    }
    else if (dis > 10 && dis <= 20) {
        rled.pwmWrite(50);
        gled.pwmWrite(50);
    }
    else {
        rled.pwmWrite(0);
        gled.pwmWrite(0);
    }
};

const turnOnRelay = (dis) => {
    if (dis <= 10) { relay.digitalWrite(1); }
    else { relay.digitalWrite(0); }
};

const turnOffRelay = (dis) => {
    relay.digitalWrite(0);
};

process.on('SIGINT', () => {
    rled.digitalWrite(0);
    gled.digitalWrite(0);
    relay.digitalWrite(0);
    process.exit();
});

setInterval(() => { security(); }, 1000);
setInterval(() => { trig.trigger(10, 1); }, 200);