/* =========================
   QUIZ ENGINE (Reusable)
   Works with your quiz-ui.css + current spf-quiz.html IDs
   Required IDs:
   timer, progressFill, qCount, question, answers, feedback, nextBtn, endButtons, score
   ========================= */

window.QuizEngine = (() => {
  let CONFIG = null;

  let quizSet = [];
  let currentIndex = 0;
  let score = 0;
  let locked = false;

  // timer
  let seconds = 0;
  let timerInterval = null;

  // label map for A/B/C/D display
  let optionLabelMap = {};

  /* ---------- Helpers ---------- */
  const $ = (id) => document.getElementById(id);

  function existsRequiredIds() {
    const required = [
      "timer", "progressFill", "qCount", "question", "answers",
      "feedback", "nextBtn", "endButtons", "score"
    ];
    const missing = required.filter(id => !$(id));
    if (missing.length) {
      console.error("QuizEngine missing required elements:", missing);
      return false;
    }
    return true;
  }

  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  function setProgressPercent() {
    const fill = $("progressFill");
    const pct = Math.round(((currentIndex) / quizSet.length) * 100);
    fill.style.width = `${pct}%`;
  }

  /* ---------- Storage (Freshness) ---------- */
  function loadRecentIds() {
    try {
      return JSON.parse(localStorage.getItem(CONFIG.storageKeyRecent) || "[]");
    } catch {
      return [];
    }
  }

  function saveRecentIds(ids) {
    localStorage.setItem(CONFIG.storageKeyRecent, JSON.stringify(ids.slice(-50)));
  }

  function pickFreshQuizSet() {
    const recent = loadRecentIds();
    const avoid = recent.slice(-CONFIG.recentAvoid);

    let pool = CONFIG.bank.filter(q => !avoid.includes(q.id));
    if (pool.length < CONFIG.quizCount) pool = CONFIG.bank;

    const chosen = shuffle(pool).slice(0, CONFIG.quizCount);
    saveRecentIds([...recent, ...chosen.map(q => q.id)]);
    return chosen;
  }

  /* ---------- Timer ---------- */
  function stopTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = null;
  }

  function startTimer() {
    stopTimer();
    seconds = 0;
    $("timer").innerText = "00:00";
    timerInterval = setInterval(() => {
      seconds++;
      $("timer").innerText = formatTime(seconds);
    }, 1000);
  }

  /* ---------- UI Rendering ---------- */
  function resetFeedback() {
    const fb = $("feedback");
    fb.classList.remove("show");
    fb.innerHTML = "";
  }

  function showFeedback(html) {
    const fb = $("feedback");
    fb.innerHTML = html;
    fb.classList.add("show");
  }

  function renderQuestion() {
    locked = false;
    resetFeedback();

    // buttons / end state
    $("nextBtn").style.display = "none";
    $("endButtons").style.display = "none";
    $("score").innerText = "";

    // count + progress bar
    $("qCount").innerText = `Question ${currentIndex + 1} of ${quizSet.length}`;
    setProgressPercent();

    // question text
    const q = quizSet[currentIndex];
    $("question").innerText = q.q;

    // answers
    const answersWrap = $("answers");
    answersWrap.innerHTML = "";

    const labels = ["A", "B", "C", "D"];
    const options = shuffle(q.o);

    optionLabelMap = {};
    options.forEach((opt, idx) => {
      optionLabelMap[opt] = labels[idx];

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option";

      btn.innerHTML = `
        <div class="opt-left">
          <div class="opt-pill">${labels[idx]}</div>
          <div class="opt-text">${opt}</div>
        </div>
        <div class="opt-icon"></div>
      `;

      btn.addEventListener("click", () => selectAnswer(btn, opt));
      answersWrap.appendChild(btn);
    });
  }

  function markAllLocked() {
    document.querySelectorAll("#answers .option").forEach(b => b.classList.add("locked"));
  }

  function selectAnswer(clickedBtn, choice) {
    if (locked) return;
    locked = true;

    const q = quizSet[currentIndex];
    const correct = q.a;

    // lock others
    markAllLocked();

    // mark correct & wrong visually
    document.querySelectorAll("#answers .option").forEach(btn => {
      const text = btn.querySelector(".opt-text")?.innerText || "";
      if (text === correct) btn.classList.add("correct");
      if (btn === clickedBtn && choice !== correct) btn.classList.add("wrong");

      // icon
      const icon = btn.querySelector(".opt-icon");
      if (!icon) return;
      if (btn.classList.contains("correct")) icon.innerText = "✓";
      else if (btn.classList.contains("wrong")) icon.innerText = "✕";
      else icon.innerText = "";
    });

    if (choice === correct) {
      score++;
      showFeedback(`<span class="good">Correct!</span> <span style="opacity:.9;">${q.e || ""}</span>`);
    } else {
      const correctLabel = optionLabelMap[correct] || "";
      showFeedback(
        `<span class="bad">Incorrect.</span> Correct: <strong>${correctLabel}. ${correct}</strong>
         <div style="opacity:.9; margin-top:6px;">${q.e || ""}</div>`
      );
    }

    $("nextBtn").style.display = "block";
  }

  function endQuiz() {
    stopTimer();

    // progress to 100%
    $("progressFill").style.width = "100%";

    // hide quiz content
    $("qCount").innerText = "Completed";
    $("question").innerText = " ";
    $("answers").innerHTML = "";
    resetFeedback();
    $("nextBtn").style.display = "none";
    $("endButtons").style.display = "none";
    $("score").innerText = "";

    // ---- Result Card ----
    const percent = Math.round((score / quizSet.length) * 100);
    const resultWrap = $("resultWrap");
    const resultScore = $("resultScore");
    const resultTitle = $("resultTitle");
    const resultSub = $("resultSub");
    const resultMeta = $("resultMeta");

    if (resultWrap) {
      resultWrap.classList.add("show");

      if (resultScore) resultScore.innerText = `${percent}% Score`;

      if (resultTitle) {
        resultTitle.innerText =
          percent >= 80 ? "Congrats!" :
          percent >= 50 ? "Nice try!" :
          "Keep going!";
      }

      if (resultSub) {
        resultSub.innerText = "Quiz completed successfully.";
      }

      if (resultMeta) {
        resultMeta.innerHTML = `
          <div>You answered <strong>${score}</strong> out of <strong>${quizSet.length}</strong> correctly.</div>
          <div>Time taken: <strong>${formatTime(seconds)}</strong></div>
        `;
      }
    }
  }


  /* ---------- Public API ---------- */
  function start(config) {
    CONFIG = {
      bank: config.bank,
      quizCount: config.quizCount ?? 5,
      recentAvoid: config.recentAvoid ?? 8,
      storageKeyRecent: `${config.storagePrefix}_recent`,
    };

    if (!existsRequiredIds()) return;
    if (!Array.isArray(CONFIG.bank) || CONFIG.bank.length === 0) {
      console.error("QuizEngine: bank is missing/empty");
      return;
    }

    quizSet = pickFreshQuizSet();
    currentIndex = 0;
    score = 0;

    startTimer();
    renderQuestion();
  }

  function nextQuestion() {
    if (!quizSet.length) return;
    currentIndex++;
    if (currentIndex < quizSet.length) renderQuestion();
    else endQuiz();
  }

  function submitNow() {
    // end immediately
    endQuiz();
  }

  return { start, nextQuestion, submitNow };
})();
