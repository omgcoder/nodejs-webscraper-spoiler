const cheerio = require('cheerio');
const request = require('request');
const readlineSync = require('readline-sync');
let url = 'https://www.google.ca/search?';

let title = readlineSync.question('What is a good movie you want to see?');
let spoilerTime = readlineSync.questionInt('On a scale of 1 to 10, how much do you wanna see it?');
if (title === '' || spoilerTime === 0 || spoilerTime > 10) {
    console.log('Please type in valid inputs!');
    return;
} else {
    console.log(`**SPOILER WARNING** about to spoil the movie ${title} in ${spoilerTime} seconds`);
    spoilerSearch();
}

function spoilerSearch() {
    spoilerTime = spoilerTime * 1000;
    setTimeout(function () {
        let uri = `https://api.themoviedb.org/3/search/movie?api_key=3e1463f29687afc23953ada1f9a719cd&query=${title}`
        request(uri, function (error, response, body) {
            if (error) {
                console.log("Can't find your movie selection... pick another?");
                return;
            } else {
                let resValue = JSON.parse(body);
                console.log(resValue.results[0].overview);
            }
        })
    }, spoilerTime);
}

url = `https://www.google.ca/search?q=film+${title}`;
request(url, function (error, response, body) {
    if (error) {
        console.log(error);
    } else {
        const $ = cheerio.load(body);
        const scrapeResults = [];
        const title = $("h3").each(function (i, elem) {
            scrapeResults[i] = $(this).text();
            console.log(scrapeResults[i]);
        })
    }
})




