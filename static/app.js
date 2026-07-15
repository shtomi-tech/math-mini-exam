(() => {
  "use strict";

  const EXAM = window.MINI_EXAMS.mini_01;
  const STORAGE_KEY = "math-mini-exam:mini_01:active";
  const RESULT_KEY = "math-mini-exam:mini_01:last-result";
  const TOTAL_SECONDS = EXAM.durationMinutes * 60;
  let state = null;
  let timerId = null;

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const allQuestions = () => EXAM.groups.flatMap((group) => group.questions.map((q) => ({ group, q })));

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  }

  function answerText(value) {
    return Array.isArray(value) ? value.join(",") : String(value ?? "");
  }

  function normalize(value) {
    return String(value ?? "").trim().replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xFEE0)).replace(/[−ー－]/g, "-").replace(/\s+/g, "");
  }

  function questionCount() {
    return allQuestions().length;
  }

  function renderMath(root = document.body) {
    if (window.renderMathInElement) {
      window.renderMathInElement(root, { delimiters: [{ left: "\\[", right: "\\]", display: true }, { left: "$", right: "$", display: false }] });
    }
  }

  function readActive() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); } catch { return null; }
  }

  function saveActive() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function updateMode(label) { $("#modeLabel").textContent = label; }

  function renderIntro() {
    $("#examTitle").textContent = EXAM.title;
    $("#examNote").textContent = EXAM.note;
    const active = readActive();
    if (active?.status === "active") {
      $("#startBtn").textContent = "続きから再開する";
      $("#resumeHint").textContent = `前回の受験を保存しています。残り ${formatTime(Math.max(0, Math.ceil((active.deadline - Date.now()) / 1000)))}。`;
    } else {
      $("#startBtn").textContent = "試験を開始する";
      $("#resumeHint").textContent = "";
    }
  }

  function begin() {
    const existing = readActive();
    if (existing?.status === "active" && existing.deadline > Date.now()) {
      state = existing;
    } else {
      state = { status: "active", startedAt: Date.now(), deadline: Date.now() + TOTAL_SECONDS * 1000, name: $("#studentName").value.trim() || "ゲスト", answers: {} };
      saveActive();
    }
    $("#intro").classList.add("hidden");
    $("#result").classList.add("hidden");
    $("#exam").classList.remove("hidden");
    document.body.classList.remove("result-mode");
    updateMode("試験中");
    renderExam();
    startTimer();
  }

  function formatTime(seconds) {
    const safe = Math.max(0, seconds);
    return `${String(Math.floor(safe / 60)).padStart(2, "0")}:${String(safe % 60).padStart(2, "0")}`;
  }

  function startTimer() {
    clearInterval(timerId);
    const tick = () => {
      const remaining = Math.max(0, Math.ceil((state.deadline - Date.now()) / 1000));
      $("#timer").textContent = formatTime(remaining);
      $("#timer").classList.toggle("urgent", remaining <= 300);
      if (remaining <= 0) submit(true);
    };
    tick();
    timerId = setInterval(tick, 1000);
  }

  function renderExam() {
    $("#answeredCount").textContent = `${allQuestions().filter(({ q }) => isAnswered(q)).length} / ${questionCount()}`;
    $("#examSheet").innerHTML = EXAM.groups.map((group) => `
      <section class="exam-group panel">
        <div class="group-heading"><div><p class="eyebrow">QUESTION ${escapeHtml(group.number)}</p><h2>${escapeHtml(group.title)}</h2></div><span class="tag">${escapeHtml(group.tag)}</span></div>
        <div class="question-list">${group.questions.map(renderQuestion).join("")}</div>
      </section>
    `).join("");
    bindQuestionEvents();
    renderMath($("#examSheet"));
  }

  function renderQuestion(q) {
    const current = state.answers[q.id];
    if (q.type === "numeric") {
      const values = Array.isArray(current) ? current : [];
      return `<article class="question" data-question="${q.id}">
        <div class="question-head"><span class="question-number">${escapeHtml(q.label)}</span><span>${q.points}点</span></div>
        <div class="question-stem">${q.stem}</div>
        <div class="numeric-fields">${q.prompts.map((prompt, index) => `<label><span>${prompt}</span><input inputmode="numeric" autocomplete="off" data-answer-index="${index}" value="${escapeHtml(values[index] || "")}" aria-label="${escapeHtml(prompt.replace(/\$/g, ""))}"></label>`).join("")}</div>
      </article>`;
    }
    const selected = Array.isArray(current) ? current : (typeof current === "number" ? [current] : []);
    return `<article class="question" data-question="${q.id}">
      <div class="question-head"><span class="question-number">${escapeHtml(q.label)}</span><span>${q.points}点</span></div>
      <div class="question-stem">${q.stem}</div>
      <div class="options ${q.type === "multi" ? "multi-options" : ""}">${q.options.map((option, index) => `<button type="button" class="option ${selected.includes(index) ? "selected" : ""}" data-option-index="${index}" aria-pressed="${selected.includes(index)}"><span class="option-mark">${String.fromCharCode(65 + index)}</span><span>${option}</span></button>`).join("")}</div>
      ${q.type === "multi" ? '<p class="hint">複数選択</p>' : ""}
    </article>`;
  }

  function bindQuestionEvents() {
    $$('[data-question] input[data-answer-index]').forEach((input) => input.addEventListener("input", () => {
      const article = input.closest("[data-question]");
      const q = allQuestions().find(({ q }) => q.id === article.dataset.question).q;
      const values = q.prompts.map((_, index) => article.querySelector(`[data-answer-index="${index}"]`).value);
      state.answers[q.id] = values;
      saveActive();
      updateAnsweredCount();
    }));
    $$('[data-question] .option').forEach((button) => button.addEventListener("click", () => {
      const article = button.closest("[data-question]");
      const q = allQuestions().find(({ q }) => q.id === article.dataset.question).q;
      const index = Number(button.dataset.optionIndex);
      if (q.type === "multi") {
        const current = Array.isArray(state.answers[q.id]) ? [...state.answers[q.id]] : [];
        const at = current.indexOf(index);
        if (at >= 0) current.splice(at, 1); else current.push(index);
        current.sort((a, b) => a - b);
        state.answers[q.id] = current;
      } else state.answers[q.id] = index;
      saveActive();
      renderExam();
    }));
  }

  function isAnswered(q) {
    const value = state?.answers?.[q.id];
    if (q.type === "numeric") return Array.isArray(value) && value.every((entry) => normalize(entry) !== "");
    return Array.isArray(value) ? value.length > 0 : typeof value === "number";
  }

  function updateAnsweredCount() {
    $("#answeredCount").textContent = `${allQuestions().filter(({ q }) => isAnswered(q)).length} / ${questionCount()}`;
  }

  function openSubmitDialog() {
    const unanswered = allQuestions().filter(({ q }) => !isAnswered(q)).length;
    $("#dialogText").textContent = unanswered ? `未回答が${unanswered}問あります。このまま提出しますか？` : "回答を採点して終了します。";
    $("#submitDialog").classList.remove("hidden");
    $("#confirmSubmit").focus();
  }

  function grade(q) {
    const value = state.answers[q.id];
    if (q.type === "numeric") {
      const actual = Array.isArray(value) ? value : [];
      const correct = q.answers.reduce((sum, answer, index) => sum + (normalize(actual[index]) === normalize(answer) ? 1 : 0), 0);
      return { correct, total: q.answers.length, points: q.points * correct / q.answers.length };
    }
    const actual = q.type === "multi" ? (Array.isArray(value) ? [...value].sort((a, b) => a - b) : []) : value;
    const expected = q.type === "multi" ? [...q.answer].sort((a, b) => a - b) : q.answer;
    const correct = JSON.stringify(actual) === JSON.stringify(expected);
    return { correct: correct ? 1 : 0, total: 1, points: correct ? q.points : 0 };
  }

  function submit(auto = false) {
    if (!state || state.status !== "active") return;
    if (!auto && $("#submitDialog").classList.contains("hidden")) { openSubmitDialog(); return; }
    clearInterval(timerId);
    const results = allQuestions().map(({ group, q }) => ({ group, q, result: grade(q) }));
    const total = results.reduce((sum, item) => sum + item.result.points, 0);
    state = { ...state, status: "submitted", submittedAt: Date.now(), score: Math.round(total), results: results.map(({ q, result }) => ({ id: q.id, ...result })) };
    localStorage.removeItem(STORAGE_KEY);
    localStorage.setItem(RESULT_KEY, JSON.stringify(state));
    $("#submitDialog").classList.add("hidden");
    renderResult(auto);
  }

  function displayAnswer(q) {
    const value = state.answers[q.id];
    if (q.type === "numeric") return Array.isArray(value) ? value.map((entry) => entry || "—").join(" / ") : "—";
    const indices = q.type === "multi" ? (Array.isArray(value) ? value : []) : (typeof value === "number" ? [value] : []);
    return indices.length ? indices.map((index) => String.fromCharCode(65 + index)).join(", ") : "—";
  }

  function expectedAnswer(q) {
    if (q.type === "numeric") return q.answers.join(" / ");
    const indices = q.type === "multi" ? q.answer : [q.answer];
    return indices.map((index) => String.fromCharCode(65 + index)).join(", ");
  }

  function renderResult(auto) {
    $("#intro").classList.add("hidden");
    $("#exam").classList.add("hidden");
    $("#result").classList.remove("hidden");
    document.body.classList.add("result-mode");
    updateMode("採点済み");
    $("#score").textContent = state.score;
    $("#resultSummary").textContent = `${state.name}さん、${auto ? "時間切れのため自動提出しました。" : "提出を受け付けました。"}`;
    $("#resultSheet").innerHTML = EXAM.groups.map((group) => `<section class="result-group panel"><div class="group-heading"><div><p class="eyebrow">QUESTION ${escapeHtml(group.number)}</p><h2>${escapeHtml(group.title)}</h2></div><span class="tag">${group.points}点</span></div>${group.questions.map((q) => {
      const result = state.results.find((entry) => entry.id === q.id);
      const ok = result.correct === result.total;
      return `<article class="review ${ok ? "correct" : "incorrect"}"><div class="question-head"><span class="question-number">${escapeHtml(q.label)}</span><strong>${ok ? "正解" : "確認"} ${result.points}/${q.points}点</strong></div><div class="question-stem">${q.stem}</div><p><span class="label">あなたの回答</span> ${escapeHtml(displayAnswer(q))}　<span class="label">正答</span> ${escapeHtml(expectedAnswer(q))}</p><details><summary>解説を表示</summary><div class="solution">${q.solution}</div></details></article>`;
    }).join("")}</section>`).join("");
    renderMath($("#resultSheet"));
  }

  $("#startBtn").addEventListener("click", begin);
  $("#submitBtn").addEventListener("click", openSubmitDialog);
  $("#cancelSubmit").addEventListener("click", () => $("#submitDialog").classList.add("hidden"));
  $("#confirmSubmit").addEventListener("click", () => submit(false));
  $("#retryBtn").addEventListener("click", () => {
    state = null;
    $("#studentName").value = "";
    $("#result").classList.add("hidden");
    $("#intro").classList.remove("hidden");
    document.body.classList.remove("result-mode");
    updateMode("開始前");
    renderIntro();
  });
  $("#printBtn").addEventListener("click", () => {
    const examVisible = !$("#exam").classList.contains("hidden");
    const resultVisible = !$("#result").classList.contains("hidden");
    if (examVisible || resultVisible) { window.print(); return; }
    const previousState = state;
    state = { answers: {} };
    renderExam();
    $("#intro").classList.add("hidden");
    $("#exam").classList.remove("hidden");
    const restore = () => {
      state = previousState;
      $("#exam").classList.add("hidden");
      $("#intro").classList.remove("hidden");
      renderIntro();
    };
    window.addEventListener("afterprint", restore, { once: true });
    window.print();
  });
  window.addEventListener("beforeunload", () => { if (state?.status === "active") saveActive(); });

  renderIntro();
  renderMath();
})();
