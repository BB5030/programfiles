const gpio=require('pigpio').Gpio;
const mcpadc=require('mcp-spi-adc');

const SPI_SPEED=1000;
const LIGHT=0;
const SOUND=1;
const rled=new gpio(21, {mode:gpio.OUTPUT});
const trig=new gpio(20, {mode:gpio.OUTPUT});
const echo=new gpio(16, {mode:gpio.INPUT, alert:true});

var timerid, timeout=200;
var lData=-1;
var sData=-1;

const Light=mcpadc.openMcp3208(LIGHT,
        {speedHz:SPI_SPEED},
        (err)=>{
            if(err){console.log('light reset fail');}
        });

const Sound=mcpadc.openMcp3208(SOUND,
        {speedHz:SPI_SPEED},
        (err)=>{
            if(err){console.log('sound reset fail');}
        });

const analogSecurity=()=>{
    Light.read((error,reading)=>{
        lData=reading.rawValue;
    });
    Sound.read((error,reading)=>{
        sData=reading.rawValue;
    });
    let sLevel;
    if(lData!=-1){
        if(lData>2200){
            if(sData>2200){sLevel=4;}
            else if(sData>1000&&sData<=2200){sLevel=3;}
            else if(sData>500&&sData<=1000){sLevel=2;}
            else {sLevel=1;}

            Triggering(sLevel);
        }
        else if(lData>1000&&lData<=2200){
            Triggering(0);
        }
        else if(lData>500&&lData<=1000){
            console.log(“소리 측정값 : %d”, sData);
        }
        lData=-1;
    }
    timerid=setTimeout(analogSecurity,timeout);
}

trig.digitalWrite(0);

const Triggering=(sLv)=>{
    let startTick, distance, diff;
    echo.on('alert',(level,tick)=>{
        if(level==1){startTick=tick;}
        else{
            const endTick=tick;
            diff=endTick-startTick;
            distance=diff/58;
            if(distance>5&&distance<=10){
                console.log("인접한 거리 : %icm",distance);
                rled.digitalWrite(0);
            }
            else if(distance<=5){
                console.log("인접한 거리 : %icm",distance);
                if(sLv>=3){rled.digitalWrite(1);}
                else{rled.digitalWrite(0);}
            }
            else {rled.digitalWrite(0);}
        }
    });
};

process.on('SIGINT',()=>{
    Light.close(()=>{});
    Sound.close(()=>{});
    rled.digitalWrite(0);
    process.exit();
});

setInterval(()=>{trig.trigger(10,1);},1000);
setImmediate(analogSecurity);