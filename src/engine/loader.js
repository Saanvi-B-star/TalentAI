const fs = require('fs');
const zlib = require('zlib');
const readline = require('readline');

async function streamCandidates(filePath, onCandidate) {
    const isGzipped = filePath.endsWith('.gz');
    const fileStream = fs.createReadStream(filePath);
    const stream = isGzipped
        ? fileStream.pipe(zlib.createGunzip())
        : fileStream;

    const rl = readline.createInterface({ input: stream, crlfDelay: Infinity });
    let count = 0;

    for await (const line of rl) {
        if (!line.trim()) continue;
        try {
            const candidate = JSON.parse(line);
            await onCandidate(candidate, count);
            count++;
        } catch (e) {
            console.warn(`Skipping malformed line ${count}`);
        }
    }
    return count;
}

module.exports = { streamCandidates };