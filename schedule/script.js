const sheetURL = "https://opensheet.vercel.app/1TCahYwzCLO-jZZUrgrHiPb8-WCjSyJjZKzokNlgESEk/schedule";

let currentDay = 1;
let daysData = [];

function updateNavigation() {
  // Show only the current day's schedule box
  document.querySelectorAll(".outer-schedule-box").forEach((box, idx) => {
    box.style.display = (idx + 1 === currentDay) ? "flex" : "none";
  });

  // Update center label
  const dayInfo = daysData[currentDay - 1];
document.getElementById("day-label").innerText = dayInfo?.date?.trim()
  ? `Day ${currentDay} (${dayInfo.date})`
  : `Day ${currentDay}`;


  // Keep buttons in layout but hide visually
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");

  prevBtn.style.visibility = currentDay === 1 ? "hidden" : "visible";
  nextBtn.style.visibility = currentDay === daysData.length ? "hidden" : "visible";
}

function navigate(dir) {
  currentDay += dir;
  updateNavigation();
}

async function fetchSchedule() {
  try {
    const res = await fetch(sheetURL);
    const data = await res.json();

    const container = document.querySelector(".schedule-container");
    container.innerHTML = "";

    // Group events by Day
    const grouped = {};
    data.forEach(evt => {
      const d = (evt.Day || "").trim();
      if (!d) return;
      if (!grouped[d]) grouped[d] = { date: evt.Date, events: [] };
      grouped[d].events.push(evt);
    });

    // Preserve order and store day/date info
    daysData = Object.keys(grouped).sort((a, b) => a - b).map(day => ({
      day,
      date: grouped[day].date
    }));

    // Create DOM for each day
    Object.keys(grouped).sort((a, b) => a - b).forEach((day, idx) => {
      const outer = document.createElement("div");
      outer.className = "outer-schedule-box";

      grouped[day].events.forEach(evt => {
        const box = document.createElement("div");
        box.className = "schedule-box";
let html = "";

if (evt.Title?.trim()) {
  html += `<h2>${evt.Title}</h2>`;
}
if (evt.Description?.trim()) {
  html += `<p>${evt.Description}</p>`;
}

const start = evt["Start Time"]?.trim();
const end = evt["End Time"]?.trim();

if (start || end) {
  html += `<h3>${start || ""}${start && end ? " - " : ""}${end || ""}</h3>`;
}

box.innerHTML = html;

        outer.appendChild(box);
      });

      container.appendChild(outer);
    });

    updateNavigation();
  } catch (e) {
    console.error("Error fetching schedule:", e);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchSchedule();
  document.getElementById("prev").addEventListener("click", () => navigate(-1));
  document.getElementById("next").addEventListener("click", () => navigate(1));
});
