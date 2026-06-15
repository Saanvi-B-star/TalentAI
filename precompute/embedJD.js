const { pipeline } = require('@xenova/transformers');
const fs = require('fs');

async function embedJD() {
    console.log('Loading model...');
    const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

    const jdText = fs.readFileSync('./data/job_description.md', 'utf-8');

    console.log('Embedding JD...');
    const output = await extractor(jdText, { pooling: 'mean', normalize: true });
    const embedding = Array.from(output.data);

    fs.writeFileSync('./data/jd_embedding.json', JSON.stringify(embedding));
    console.log(`Done. Embedding saved (${embedding.length} dims)`);
}

embedJD();