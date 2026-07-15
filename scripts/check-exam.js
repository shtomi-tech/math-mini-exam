const fs = require("fs");
const path = require("path");
const vm = require("vm");

const source = fs.readFileSync(path.join(__dirname, "..", "static", "data.js"), "utf8");
const context = { window: {} };
vm.createContext(context);
vm.runInContext(source, context);
const exam = context.window.MINI_EXAMS.mini_01;
const questions = exam.groups.flatMap((group) => group.questions);
const errors = [];
const points = exam.groups.reduce((sum, group) => sum + group.points, 0);
if (points !== exam.totalPoints) errors.push(`group points ${points} !== total ${exam.totalPoints}`);
if (questions.length !== 12) errors.push(`question count ${questions.length} !== 12`);
for (const group of exam.groups) {
  const groupPoints = group.questions.reduce((sum, q) => sum + q.points, 0);
  if (groupPoints !== group.points) errors.push(`${group.number}: question points ${groupPoints} !== ${group.points}`);
  for (const q of group.questions) {
    if (!q.id || !q.stem || !q.solution) errors.push(`${q.id || "unknown"}: missing required field`);
    if (q.type === "numeric" && q.answers.length !== q.prompts.length) errors.push(`${q.id}: answer/prompt mismatch`);
    if (!["numeric", "choice", "multi"].includes(q.type)) errors.push(`${q.id}: unknown type ${q.type}`);
  }
}
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`OK: ${exam.title} / ${questions.length} questions / ${exam.totalPoints} points`);
