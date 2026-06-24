const timeElement = document.querySelector("#time");
const dateElement = document.querySelector("#date");

function updateClock() {
  const now = new Date();

  timeElement.textContent = new Intl.DateTimeFormat("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(now);

  dateElement.textContent = new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(now);

  timeElement.dateTime = now.toISOString();
}

updateClock();
setInterval(updateClock, 1000);
