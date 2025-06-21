const paragraph = document.getElementById('paragraph').innerText;
    const inputBox = document.getElementById('inputBox');
    const result = document.getElementById('result');
    const timerEl = document.getElementById('timer');

    let timeLeft = 30;
    let timerStarted = false;
    let timer;

    inputBox.addEventListener('input', () => {
      if (!timerStarted) {
        startTimer();
        timerStarted = true;
      }
    });

    function startTimer() {
      timer = setInterval(() => {
        timeLeft--;
        timerEl.innerText = `Time left: ${timeLeft}s`;

        if (timeLeft === 0) {
          clearInterval(timer);
          endTest();
        }
      }, 1000);
    }

    function endTest() {
      inputBox.disabled = true;

      const typedText = inputBox.value.trim();
      const typedWords = typedText.split(/\s+/);
      const originalWords = paragraph.trim().split(/\s+/);

      let correctWords = 0;
      for (let i = 0; i < typedWords.length; i++) {
        if (typedWords[i] === originalWords[i]) {
          correctWords++;
        }
      }

      const wpm = correctWords * 2; // 30 seconds = 0.5 min → multiply by 2
      const accuracy = ((correctWords / typedWords.length) * 100).toFixed(2);

      result.innerHTML = `
        <p><strong>WPM:</strong> ${wpm}</p>
        <p><strong>Accuracy:</strong> ${isNaN(accuracy) ? 0 : accuracy}%</p>
        <p><strong>Correct Words:</strong> ${correctWords}</p>
        <p><strong>Total Words Typed:</strong> ${typedWords.length}</p>
      `;
    }