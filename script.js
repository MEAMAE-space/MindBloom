// Load on start
window.onload = function () {
  displayLastCheckin();
  showRandomQuote();
  renderHistory();
  renderChart();
};

// Handle form submit
const form = document.getElementById("checkin-form");
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const mood = document.querySelector("input[name='mood']:checked")?.value;
  const journal = document.getElementById("journal").value.trim();
  const date = new Date().toISOString().split("T")[0];

  if (mood && journal) {
    const entry = { mood, journal, date };
    localStorage.setItem("lastEntry", JSON.stringify(entry));

    let history = JSON.parse(localStorage.getItem("history")) || [];
    history.push(entry);
    localStorage.setItem("history", JSON.stringify(history));

    alert("✅ Entry saved!");
    form.reset();
    displayLastCheckin();
    renderHistory();
    renderChart();
  } else {
    alert("Please select a mood and write a journal entry.");
  }
});

// Display last entry
function displayLastCheckin() {
  const entry = JSON.parse(localStorage.getItem("lastEntry"));
  if (entry) {
    document.getElementById("saved-date").textContent = entry.date;
    document.getElementById("saved-mood").textContent = entry.mood;
    document.getElementById("saved-journal").textContent = entry.journal;
  }
}

// Render full history
function renderHistory() {
  const list = document.getElementById("history-list");
  list.innerHTML = "";
  const history = JSON.parse(localStorage.getItem("history")) || [];

  history.slice(-10).reverse().forEach(entry => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${entry.date}</strong> - ${entry.mood}<br><em>${entry.journal}</em>`;
    list.appendChild(li);
  });
}

// Render mood trend chart
function renderChart() {
  const history = JSON.parse(localStorage.getItem("history")) || [];
  const recent = history.slice(-7);
  const labels = recent.map(e => e.date);
  const data = recent.map(e => moodToScore(e.mood));

  const ctx = document.getElementById("moodChart").getContext("2d");
  if (window.moodChart) window.moodChart.destroy();

  window.moodChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Mood Score',
        data: data,
        backgroundColor: '#c0eac0',
        borderColor: '#2d8659',
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      scales: {
        y: {
          suggestedMin: 0,
          suggestedMax: 2,
          ticks: {
            callback: val => ['😞','😐','😊'][val]
          }
        }
      }
    }
  });
}

function moodToScore(mood) {
  return { '😞': 0, '😐': 1, '😊': 2 }[mood] ?? 1;
}

const quotes = [
  "“You don't have to control your thoughts. You just have to stop letting them control you.” — Dan Millman",
  "“Every day may not be good... but there's something good in every day.” — Alice Morse Earle",
  "“Feelings are much like waves. We can't stop them but we can choose which ones to surf.” — Jonatan Mårtensson",
  "“Breathe. Let go. This very moment is all you know you have for sure.” — Oprah Winfrey",
  "“Be kind to yourself. You're doing the best you can.” — Unknown",
  "“Rest and self-care are so important. When you take time to replenish your spirit, it allows you to serve others from the overflow.” — Eleanor Brownn",
  "“It's okay to not be okay. Just don't give up.” — Unknown",
  "“Start where you are. Use what you have. Do what you can.” — Arthur Ashe",
  "“The best way out is always through.” — Robert Frost",
  "“Peace comes from within. Do not seek it without.” — Buddha",
  "“Nothing can dim the light that shines from within.” — Maya Angelou",
  "“Give yourself the same care and attention you give to others.” — Unknown",
  "“Your present circumstances don't determine where you can go; they merely determine where you start.” — Nido Qubein",
  "“Healing takes time, and that's okay.” — Unknown",
  "“You are doing better than you think.” — Unknown",
   "“Start where you are. Use what you have. Do what you can.” — Arthur Ashe",
   "“Don't believe everything you think.” — Unknown",
  "“Inhale the future, exhale the past.” — Unknown",
  "“Small steps every day.” — Unknown",
  "“Joy is not in things; it is in us.” — Richard Wargner"
];

function showRandomQuote() {
  const quoteBox = document.getElementById('quote-box');
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteBox.textContent = quotes[randomIndex];
}