const { streamCandidates } = require("./src/engine/loader");

async function test() {
    let count = 0;

    await streamCandidates("./data/candidates.jsonl", (candidate) => {
        if (count < 5) {
            console.log(
                candidate.candidate_id,
                "-",
                candidate.profile.current_title
            );
        }
        count++;
    });

    console.log(`\nTotal Candidates: ${count}`);
}

test();