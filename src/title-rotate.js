function startRotatingTitle() {
  const words = [
    { text: "breath", color: "#f1c40f" },
    { text: "pause", color: "#5e94b3" },
    { text: "reminder that you're loved ♥", color: "#b35e8d" }
  ];

  let index = 0;
  const rotatingWord = document.getElementById("rotating-word");
  const prefix = document.querySelector(".prefix");

  if (!rotatingWord || !prefix) return;

  function updatePrefixShift() {
    const wordWidth = rotatingWord.offsetWidth;
    const baseSpacing = 12;
    const stretchFactor = 0.03;
    const margin = Math.min(baseSpacing + wordWidth * stretchFactor, 36);
    prefix.style.marginRight = `${margin}px`;
  }

  function renderWord(wordObj) {
    rotatingWord.innerHTML = "";
    rotatingWord.style.color = wordObj.color;

    [...wordObj.text].forEach(letter => {
      const span = document.createElement("span");
      span.classList.add("letter");
      span.textContent = letter;
      rotatingWord.appendChild(span);
    });

    updatePrefixShift();
  }

  function rotateToNextWord() {
    const currentLetters = rotatingWord.querySelectorAll(".letter");

    currentLetters.forEach((letter, i) => {
      setTimeout(() => {
        letter.classList.add("out");
      }, i * 50);
    });

    index = (index + 1) % words.length;

    setTimeout(() => {
      const nextWordObj = words[index];
      rotatingWord.style.color = nextWordObj.color;
      rotatingWord.innerHTML = "";

      [...nextWordObj.text].forEach((char, i) => {
        const span = document.createElement("span");
        span.className = "letter behind";
        span.textContent = char;
        rotatingWord.appendChild(span);

        setTimeout(() => {
          span.classList.remove("behind");
          span.classList.add("in");
        }, 50 * i);
      });

      updatePrefixShift();
    }, currentLetters.length * 50 + 300);
  }

  renderWord(words[index]);
  return setInterval(rotateToNextWord, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
  window.titleRotationInterval = startRotatingTitle();
});