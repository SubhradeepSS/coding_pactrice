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
 * Complete the 'getWinnerTotalGoals' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. STRING competition
 *  2. INTEGER year
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

async function getWinnerTotalGoals(competition, year) {
    const competition_url = `https://jsonmock.hackerrank.com/api/football_competitions?year=${year}&name=${competition}`
    const match_url = `https://jsonmock.hackerrank.com/api/football_matches?year=${year}&competition=${competition}`
    
    const compet_res = JSON.parse(await myFetch(competition_url))
    const winner = compet_res.data[0].winner
    
    const match_res_1 = JSON.parse(await myFetch(`${match_url}&team1=${winner}`))
    let goals = match_res_1.data.reduce((acc, match) => acc + parseInt(match.team1goals), 0)
    
    for(let i=2; i<= match_res_1.total_pages; i++) {
        const match_res_i = JSON.parse(await myFetch(`${match_url}&team1=${winner}&page=${i}`))
        goals += match_res_i.data.reduce((acc, match) => acc + parseInt(match.team1goals), 0)
    }
    
    const match_res_2 = JSON.parse(await myFetch(`${match_url}&team2=${winner}`))
    goals += match_res_2.data.reduce((acc, match) => acc + parseInt(match.team2goals), 0)
    
    for(let i=2; i<= match_res_2.total_pages; i++) {
        const match_res_i = JSON.parse(await myFetch(`${match_url}&team2=${winner}&page=${i}`))
        goals += match_res_i.data.reduce((acc, match) => acc + parseInt(match.team2goals), 0)
    }
    
    return goals
}
async function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const competition = readLine();

    const year = parseInt(readLine().trim(), 10);

    const result = await getWinnerTotalGoals(competition, year);

    ws.write(result + '\n');

    ws.end();
}
