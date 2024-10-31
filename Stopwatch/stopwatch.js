const datePicker = document.getElementById('datePicker');
datePicker.valueAsDate = new Date();
const timeDisplay = document.getElementById('timeDisplay');
let intervalId = null;
let elapsedTime = 0;



async function initializeStopwatch() {
    await new Promise(resolve => setTimeout(resolve, 100)); // Here I am simulating a Mock delay
    console.log("Stopwatch initialized.");
}

async function startTimer() {
    if (intervalId !== null) return;
    await initializeStopwatch();
    intervalId = setInterval(() => {
        elapsedTime++;
        updateDisplay();
    }, 1000);
}

function stopTimer() {
    clearInterval(intervalId);
    intervalId = null;
}

async function resetTimer() {
    stopTimer();
    elapsedTime = 0;
    await updateDisplay(true);
}

function updateDisplay(isReset = false) {
    return new Promise(resolve => {
        const hours = Math.floor(elapsedTime / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((elapsedTime % 3600) / 60).toString().padStart(2, '0');
        const seconds = Math.floor(elapsedTime % 60).toString().padStart(2, '0');
        timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;

        if (isReset) {
            // Here I simulate a delay to reset the display
            setTimeout(() => {
                console.log("Stopwatch display reset.");
                resolve();
            }, 100);
        } else {
            resolve();
        }
    });
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('stop').addEventListener('click', stopTimer);
document.getElementById('reset').addEventListener('click', () => resetTimer());
