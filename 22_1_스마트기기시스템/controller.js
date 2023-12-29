const gpio = require('pigpio').Gpio;
const touch = new gpio(13, {mode:gpio.INPUT});
const light = new gpio(19, {mode:gpio.INPUT});
const buzzer = new gpio(12, {mode:gpio.OUTPUT});
const rled = new gpio(16, {mode:gpio.OUTPUT});
const gled = new gpio(20, {mode:gpio.OUTPUT});
const bled = new gpio(21, {mode:gpio.OUTPUT});

var cnt=0;
var temp=1;

const Controller=()=>{
    let tData = touch.digitalRead();

    if(tData){
        rled.digitalWrite(1);
        gled.digitalWrite(1);
        bled.digitalWrite(1);
        cnt++;
    }
    if((cnt%2)==0){
        rled.digitalWrite(0);
        gled.digitalWrite(0);
        bled.digitalWrite(0);
        turnoffbuzzer();
    }
   
    let lData = light.digitalRead();
    if((lData==1)&&(lData!=temp)){
        turnonbuzzer();
        setTimeout(turnoffbuzzer, 200);
        temp = lData;
    }
    else if((lData==0)&&(lData!=temp)){
        turnonbuzzer();
        setTimeout(turnoffbuzzer, 100);
        setTimeout(turnonbuzzer, 100);
        setTimeout(turnoffbuzzer, 200);
        temp = lData;
    }
}
const turnoffbuzzer=()=>{ buzzer.digitalWrite(0); }
const turnonbuzzer=()->{ buzzer.digitalWrite(1); }
process.on('SIGINT',function(){
    rled.digitalWrite(0);
    gled.digitalWrite(0);
    bled.digitalWrite(0);
    buzzer.digitalWrite(0);
    console.log("program exit");
    process.exit();
});
setInterval(Controller, 1000);     