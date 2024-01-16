const timeEl = document.querySelectorAll('.playlist-items #text.ytd-thumbnail-overlay-time-status-renderer');
let timeList = [];
timeEl.forEach((el) => {
        let rawTime = el.getAttribute('aria-label');
        let timeTrimmed = rawTime.trim();
        timeList.push(timeTrimmed)
});

function parseTime(timeString) {
    const timeParts = {
        hours: 0,
        minutes: 0,
        seconds: 0
    };

    const parts = timeString.split(', ');

    for (let part of parts) {
        if (part.includes('hour')) {
            timeParts.hours = parseInt(part);
        } else if (part.includes('minute')) {
            timeParts.minutes = parseInt(part);
        } else if (part.includes('second')) {
            timeParts.seconds = parseInt(part);
        }
    }

    return timeParts;
}

function sumDurations(durations) {
    let totalSeconds = 0;

    for (let duration of durations) {
        const { hours, minutes, seconds } = parseTime(duration);
        totalSeconds += hours * 3600 + minutes * 60 + seconds;
    }

    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}

// Example usage
const durations = ["1 hour, 29 minutes, 52 seconds", "37 minutes, 33 seconds"];
const totalDuration = sumDurations(timeList);
console.log(totalDuration); // Output will be the total duration
