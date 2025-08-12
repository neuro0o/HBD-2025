document.addEventListener("DOMContentLoaded", () => {
  /**
   * Array of message objects to be displayed in sequence
   * Each object may include the following:
   * - text: The text message to be displayed
   * - background: The background color of the message
   * - animation: Entry animation for the message
   * - textEffect: Text Effect for the messages
   * - image: File path for optional image to be included alongside the message
  */
  const messages = [
    { text: "Hi!", background: "#5a4763", animation: "blur-in", textEffect: "" },
    { text: "How have you been?", background: "#3d5e59", animation: "zoom-out", textEffect: "text-fade" },
    { text: "It's been a while, hasn't it?", background: "#705346", animation: "bounce-in", textEffect: "pulse" },

    { text: "Another year has passed,", background: "#4e5b6e", animation: "scale-down", textEffect: "" },
    { text: "quietly,", background: "#684554", animation: "box-in", textEffect: "fade-slide" },
    { text: "heavily.", background: "#54536c", animation: "circle-reveal", textEffect: "" },

    { text: "Life hasn't been kind,", background: "#3f6359", animation: "blur-in", textEffect: "" },
    { text: "and I know how hard it's been for you especially.", background: "#653e3e", animation: "scale-down", textEffect: "fade-slide" },
    { text: "There were moments when you almost gave up,", background: "#52405c", animation: "zoom-out", textEffect: "" },
    { text: "and yet,", background: "#386660", animation: "blur-in", textEffect: "" },
    { text: "somehow,", background: "#7c4756", animation: "box-in", textEffect: "bounce-in" },
    { text: "you kept going.", background: "#386068", animation: "circle-reveal", textEffect: "" },

    { text: "That alone takes strength,", background: "#4e3f66", animation: "fade-slide", textEffect: "blur-in" },
    { text: "more than most will ever understand.", background: "#6c5741", animation: "bounce-in", textEffect: "" },

    { text: "You've done very well.", background: "#38645f", animation: "blur-in", textEffect: "" },
    { text: "I'm proud of you,", background: "#7a3f4c", animation: "circle-reveal", textEffect: "fade-slide" },
    { text: "not for being perfect,", background: "#4e4b59", animation: "bounce-in", textEffect: "" },
    { text: "but for simply surviving,", background: "#80434e", animation: "box-in", textEffect: "" },
    { text: "when it felt like the world didn't care if you did.", background: "#3f5e6b", animation: "scale-down", textEffect: "" },

    { text: "Today, on your special day,", background: "#44665f", animation: "fade-slide", textEffect: "" },
    { text: "I hope light finds you gently,", background: "#7c4340", animation: "circle-reveal", textEffect: "" },
    { text: "not in a burst, but in a hush.", background: "#623d51", animation: "zoom-out", textEffect: "" },
    { text: "Like sunlight pooling on the ground,", background: "#854950", animation: "box-in", textEffect: "" },
    { text: "willing to wait,", background: "#3c626f", animation: "blur-in", textEffect: "" },
    { text: "willing to stay,", background: "#58495b", animation: "bounce-in", textEffect: "" },
    { text: "until you're ready.", background: "#623d51", animation: "zoom-out", textEffect: "" },

    { text: "And above all,", background: "#853f45", animation: "fade-slide", textEffect: "" },
    { text: "I hope you pull through the days ahead,", background: "#3c6762", animation: "scale-down", textEffect: "" },
    { text: "not because you have to,", background: "#865b36", animation: "bounce-in", textEffect: "" },
    { text: "but because you deserve to see what the future still holds for you.", background: "#3f4f6b", animation: "blur-in", textEffect: "" },

    { text: "I hope you get to live the dreams you've carried for so long.", background: "#643c52", animation: "circle-reveal", textEffect: "" },
    { text: "I hope your wishes find their way home to you.", background: "#326b65", animation: "bounce-in", textEffect: "" },
    { text: "And I'm wishing you nothing but the best,", background: "#7c3e51", animation: "fade-slide", textEffect: "" },
    { text: "for today,", background: "#894546", animation: "box-in", textEffect: "" },
    { text: "for tomorrow,", background: "#3d6c74", animation: "blur-in", textEffect: "" },
    { text: "and for all that's still to come.", background: "#594976", animation: "zoom-out", textEffect: "" },

    { text: "Happiest Birthday to you, my dear.", background: "#8b3e4a", animation: "bounce-in", textEffect: "" },
    { text: "Whatever happens,", background: "#326d6c", animation: "blur-in", textEffect: "" },
    { text: "no matter what,", background: "#675e84", animation: "box-in", textEffect: "" },
    { text: "please know that,", background: "#924453", animation: "circle-reveal", textEffect: "" },

    { text: "you are seen,", background: "#3f706d", animation: "bounce-in", textEffect: "" },
    { text: "you are valued,", background: "#8f3e51", animation: "blur-in", textEffect: "" },
    { text: "you matter.", background: "#856948", animation: "scale-down", textEffect: "" },
    { text: "Always.", background: "#685b8f", animation: "fade-slide", textEffect: "" },

    { text: "Happy Birthday!", background: "#5a4763", animation: "circle-reveal", textEffect: "", image: "img/hb.gif" }
  ];


  // Global Variables
  let index = 0; // index of current message being shown
  const container = document.getElementById('message-container');
  const messageArea = document.getElementById('message-content');
  const startBtn = document.getElementById('start-btn');
  const replayBtn = document.getElementById('replay-btn');
  const bgMusic = document.getElementById('bgm');

  /**
   * Function to dynamically calculate the display duration for a message based on characters
   * 
   * @param {string} text - The message text to be evaluated
   * @param {number} baseTime - Minimum duration (ms)
   * @param {number} timePerChar - Extra time per character (ms)
   * @param {number} maxTime - Maximum allowed duration (ms)
   * @return {number} - Computed duration for this message
   */
  function getDurationFromText(text, baseTime = 2000, timePerChar = 50, maxTime = 7000) {
    const calculatedDuration = baseTime + text.length * timePerChar;
    return Math.min(calculatedDuration, maxTime); // Time cap to avoid long wait (7000ms max)
  }

  // Function to render single message based on current index of messages array
  function showMessage() {
    // Stop if reached the end of the message array
    if (index >= messages.length) {
      replayBtn.style.display = 'block'; // Show replay option
      return;
    }

    // Extract current message data (entry animation + text effect)
    const msg = messages[index];
    const classList = `${msg.animation} ${msg.textEffect}`.trim();

    // Build HTML for message and optional image
    const textHtml = `<div class="${classList}">${msg.text}</div>`;
    const imageHtml = msg.image ? `<img src="${msg.image}" alt="image" class="message-image"/>` : "";
    
    // Inject HTML into message area
    messageArea.innerHTML = `${textHtml}${imageHtml}`;

    // Update background color of the current message
    container.style.backgroundColor = msg.background;

    index++;
    
    // Calculate message delay
    const delay = getDurationFromText(msg.text);
    setTimeout(showMessage, delay);
  }

  // Function to start the entire message sequence from the beginning
  function startSequence() {
    index = 0;
    startBtn.style.display = 'none';
    replayBtn.style.display = 'none';
    messageArea.innerHTML = '';
    container.style.backgroundColor = '#222831'; // Initial color

    // Play BGM
    bgMusic.currentTime = 0;
    bgMusic.play();

    showMessage();
  }

  // Function to reset the interface to its initial state when replay button is clicked
  function resetToInitialState() {
    index = 0;

    // Stop BGM
    bgMusic.pause();
    bgMusic.currentTime = 0;

    // Restore title screen
    messageArea.innerHTML = `
      <div class="rotating-title">
        <span class="prefix">A</span>
        <span id="rotating-word">pause</span>
      </div>
    `;
    container.style.backgroundColor = '#222831';

    // Show start button, hide replay button
    startBtn.style.display = 'block';
    replayBtn.style.display = 'none';

    // 🔁 Reset title animation
    clearInterval(window.titleRotationInterval); // stop previous loop
    window.titleRotationInterval = startRotatingTitle(); // start new one
  }


  // Event listeners to hook buttons to their respective actions
  startBtn.addEventListener('click', startSequence);
  replayBtn.addEventListener('click', resetToInitialState);

});

