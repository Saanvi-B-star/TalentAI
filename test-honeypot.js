// // test-honeypot.js

const fs = require("fs");
const { isHoneypot } = require("./src/engine/honeypotFilter");

const candidates = JSON.parse(
    fs.readFileSync("./data/sample_candidates.json", "utf8")
);

let flagged = 0;

for (const candidate of candidates) {
    if (isHoneypot(candidate)) {
        console.log(
            `FLAGGED: ${candidate.candidate_id}`
        );
        flagged++;
    }
}

console.log(`\nTotal flagged: ${flagged}`);
console.log(`Total candidates: ${candidates.length}`);



//test sample 
const { isHoneypot } = require("./src/engine/honeypotFilter");

const fakeCandidate = {
    profile: {
        years_of_experience: 2
    },
    skills: [
        {
            name: "Python",
            proficiency: "expert",
            duration_months: 0
        }
    ],
    career_history: []
};

console.log(isHoneypot(fakeCandidate));