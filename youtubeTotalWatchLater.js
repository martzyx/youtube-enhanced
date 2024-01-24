function findTimes() {
    const timeEl = document.querySelectorAll(".playlist-items #text.ytd-thumbnail-overlay-time-status-renderer");
    const timeElWL = document.querySelectorAll("ytd-playlist-video-renderer #text.ytd-thumbnail-overlay-time-status-renderer");
    let timeList = [];
    timeEl.forEach((el) => {
        let rawTime = el.getAttribute("aria-label");
        let timeTrimmed = rawTime.trim();
        timeList.push(timeTrimmed);
    });
    return timeList;
}

function parseTime(timeString) {
    const timeParts = {
        hours: 0,
        minutes: 0,
        seconds: 0,
    };

    const parts = timeString.split(", ");

    for (let part of parts) {
        if (part.includes("hour")) {
            timeParts.hours = parseInt(part);
        } else if (part.includes("minute")) {
            timeParts.minutes = parseInt(part);
        } else if (part.includes("second")) {
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

function buildTimeTotal() {
    const totalDuration = sumDurations(findTimes());
    console.log("youtube-watch-total: " + totalDuration + " is the total time of your playlist");
    if (!document.querySelector("#timeDisplay")) {
        var timeDiv = document.createElement("div"); // creating div for textcontent and appending
        timeDiv.id = "timeDisplay";
        timeDiv.style.color = "var(--yt-spec-text-secondary)";
        timeDiv.style.marginLeft = "1em";
        timeDiv.textContent = `Total: ${totalDuration}`;
        var publisherContainer = document.querySelectorAll("#publisher-container");
        publisherContainer.forEach((el) => {
            el.appendChild(timeDiv);
        });
    } else {
        timeDisplayEl = document.querySelector("#timeDisplay");
        timeDisplayEl.textContent = `Total: ${totalDuration}`;
    }
}

function observeProgressElement(progressElement) {
    const observer = new MutationObserver((mutationsList, observer) => {
        for (let mutation of mutationsList) {
            if (mutation.type === "attributes" && mutation.attributeName === "hidden") {
                buildTimeTotal();
            }
        }
    });

    observer.observe(progressElement, { attributes: true });
}

function observeBodyElement() {
    const bodyObserver = new MutationObserver((mutationsList, observer) => {
        const progressElement = document.querySelector("yt-page-navigation-progress");
        if (progressElement) {
            buildTimeTotal();
            observer.disconnect(); // stop observing the body
            observeProgressElement(progressElement); // start observing the progress element
        }
    });

    bodyObserver.observe(document.body, { childList: true, subtree: true });
}

document.addEventListener("DOMContentLoaded", function () {
    observeBodyElement();
});
