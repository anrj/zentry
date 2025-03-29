  const quotes = [
    "Focus on progress, not perfection.",
    "Was this distraction really worth delaying your goal?",
    "Do it now; sometimes 'later' becomes 'never'.",
    "Your future self will thank you for this focus.",
    "Less scrolling, more achieving.",
    "Just start – momentum will follow.",
    "Remember why you blocked this site.",
    "Small steps now lead to big results later.",
    "Get back to what truly matters.",
    "Turn \"I'll do it later\" into \"I'm doing it now\".",
    "Deep work requires blocking out the noise.",
    "Is this moving you closer to your objective?",
    "Don't trade long-term goals for short-term comfort.",
    "Create more, consume less.",
    "The best time to start was yesterday. The next best time is now.",
    "Protect your focus like it's your most valuable asset.",
    "What's the *one thing* you should be doing right now?",
    "Escape the scroll hole, return to your purpose.",
    "Every minute spent focused is an investment in your future.",
    "Resist the urge for instant gratification.",
    "Your attention is finite; spend it wisely.",
    "Don't let easy distractions derail meaningful work.",
    "Action cures procrastination.",
    "Build the habit of focus, one block at a time."
  ];

  document.addEventListener('DOMContentLoaded', () => {
      const messageDiv = document.querySelector('.message');
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const randomQuote = quotes[randomIndex];
      messageDiv.innerText = randomQuote;
  });