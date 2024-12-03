const fs = require("fs");

const reports = fs
  .readFileSync("input.txt", { encoding: "utf-8" })
  .split("\n")
  .map((report) => report.split(" ").map((i) => parseInt(i)));

const sameSign = (diffs) => {
  const positives = diffs.filter((el) => el > 0);
  const l = positives.length;
  const dl = diffs.length;
  return l === 0 || l === dl;
};

const badDiffs = (diffs) => {
  return diffs.filter((diff) => Math.abs(diff) === 0 || Math.abs(diff) > 3);
};

const isSafe = (report) => {
  let diffs = [];
  for (let i = 1; i < report.length; i++) {
    const diff = report[i] - report[i - 1];
    diffs.push(diff);
  }
  //console.log(report, diffs, sameSign(diffs), badDiffs(diffs).length === 0);

  return sameSign(diffs) && badDiffs(diffs).length === 0;
};

const problemSolver = (report) => {
  if (isSafe(report)) {
    return true;
  }

  let copy;

  for (let i = 0; i < report.length; i++) {
    copy = [...report];
    copy.splice(i, 1);
    if (isSafe(copy)) {
      console.log("Safe solved", report, copy);
      return true;
    }
  }

  return false;
};

const safeReports = reports.filter(isSafe);
const solved = reports.filter(problemSolver);
console.log(safeReports.length, solved.length);
