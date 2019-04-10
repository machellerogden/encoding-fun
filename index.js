#!/usr/bin/env node

const streamify = require('async-stream-generator');

async function* bufferImage(chunks) {
    let buffer = Buffer.from([]);
    for await (const chunk of chunks) {
        buffer = Buffer.concat([ buffer, chunk ]);
    }
    yield buffer;
}

async function* streamImage(chunks) {
    for await (const chunk of chunks) {
        yield chunk;
    }
}

//streamify(bufferImage(process.stdin)).pipe(process.stdout);
streamify(streamImage(process.stdin)).pipe(process.stdout);
