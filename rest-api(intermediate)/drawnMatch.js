'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}



/*
 * Complete the 'getNumDraws' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER year as parameter.
 */
const request = require('request');

function myFetch(url) {
  return new Promise((resolve, reject) => {
    request(url, function (error, response, body) {
      if(error) reject(error)

      else resolve(body)
    });
  });
}

async function getNumDraws(year) {
    const url = `https://jsonmock.hackerrank.com/api/football_matches?year=${year}`
    let ans = 0
    
    // max 10 goals mentioned in ques
    for(let i=0; i<=10; i++) {
        const res = JSON.parse(await myFetch(`${url}&team1goals=${i}&team2goals=${i}`))
        ans += res.total
    }
    return ans;
}

async function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const year = parseInt(readLine().trim(), 10);

    const result = await getNumDraws(year);

    ws.write(result + '\n');

    ws.end();
}
