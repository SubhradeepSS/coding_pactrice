/*  */

'use strict';

const fs = require('fs');
const https = require('https');

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

const request = require('request');

function myFetch(url) {
  return new Promise((resolve, reject) => {
    request(url, function (error, response, body) {
      if(error) reject(error)

      else resolve(body)
    });
  });
}

async function getCountryName(code) {
    // write your code here
    // API endpoint: https://jsonmock.hackerrank.com/api/countries?page=<PAGE_NUMBER>
    const url = "https://jsonmock.hackerrank.com/api/countries"
    const res = JSON.parse(await myFetch(url))
    // console.log(res)
    
    for(let i=1; i<= res.total_pages; i++){
        const res_i = JSON.parse(await myFetch(`${url}?page=${i}`))
        const cont = res_i.data.filter(obj => obj.alpha2Code === code)
        // console.log()
        if(cont.length > 0) {
            return cont[0].name
        }
    }
}

async function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const code = readLine().trim();

  const name = await getCountryName(code);

  ws.write(`${name}\n`);

}
