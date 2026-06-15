// test-sample.js

const fs = require("fs");

const candidates = JSON.parse(
    fs.readFileSync("./data/sample_candidates.json", "utf8")
);

console.log(`Loaded ${candidates.length} candidates\n`);

for (const candidate of candidates.slice(0, 5)) {
    console.log(
        candidate.candidate_id,
        "-",
        candidate.profile.current_title
    );
}