const form = document.getElementById('checkin-form');
const journalInput = document.getElementById('journal');
const savedMsg = document.getElementById('saved-msg');
const toggle = document.getElementById('theme-toggle');
const quoteBox = document.getElementById('quote-box');

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

// Set random quote
const randomIndex = Math.floor(Math.random() * quotes.length);
quoteBox.textContent = `💬 ${quotes[randomIndex]}`;

// Load saved mood and journal
window.onload = () => {
  const savedMood = localStorage.getItem('mood');
  const savedText = localStorage.getItem('journal');
  const theme = localStorage.getItem('theme') || 'light';

  document.body.classList.add(theme + '-mode');
  toggle.checked = (theme === 'dark');

  if (savedMood) {
    const moodInput = document.querySelector(`input[value="${savedMood}"]`);
    if (moodInput) moodInput.checked = true;
  }
  if (savedText) {
    journalInput.value = savedText;
  }
};

// Handle form submit
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const selectedMood = document.querySelector('input[name="mood"]:checked');
  const journalText = journalInput.value;

  if (selectedMood) {
    localStorage.setItem('mood', selectedMood.value);
  }
  localStorage.setItem('journal', journalText);

  savedMsg.style.display = 'block';
  setTimeout(() => savedMsg.style.display = 'none', 2000);
});
// Theme toggle logic
toggle.addEventListener('change', () => {
  if (toggle.checked) {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
    localStorage.setItem('theme', 'light');
  }
});