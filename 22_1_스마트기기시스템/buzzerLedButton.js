const TurnOn = (level) => {
    if (level === 0) {
        cnt++;
        switch (cnt % 3) {
            case 0: rled.digitalWrite(1);
                gled.digitalWrite(0);
                bled.digitalWrite(0);
                break;
            case 1: rled.digitalWrite(0);
                gled.digitalWrite(1);
                bled.digitalWrite(0);
                break;
            case 2: rled.digitalWrite(0);
                gled.digitalWrite(0);
                bled.digitalWrite(1);
                break;
            default: break;
        }
        buzzer.digitalWrite(1);
        setTimeout(TurnOffBuzzer, 100);
    }
}
const TurnOffBuzzer = () => {
    buzzer.digitalWrite(0);
}

button.on('interrupt', TurnOn);

process.on('SIGINT', function () {
    rled.digitalWrite(0);
    gled.digitalWrite(0);
    bled.digitalWrite(0);
    buzzer.digitalWrite(0);
    process.exit();
});