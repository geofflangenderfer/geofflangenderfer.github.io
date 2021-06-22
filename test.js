#!/usr/bin/env node

import { readFile, writeFile } from 'fs/promises';
import puppeteer from 'puppeteer';
import fetch from 'node-fetch';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    let contestants = JSON.parse(await readFile("userScoreRegion.json", "utf8"));
    console.log(contestants.length)
    for (let i=0;i<2;i++) {
        let data = null
        let c = contestants[i]
        if (c.data_region === 'CN') {
            data = await extractChina(c)
        } else {
            data = await extractUS(c,page)
        }
        for (const key in data){
            c[key] = data[key]
        }

        console.log(c);
    }
    await writeFile('test.txt', JSON.stringify(contestants), function (err) {
      if (err) return console.log(err);
      console.log('nice');
    });
    await browser.close();
})();

async function extractChina(contestant) {
    let out = await extractSubmissions(contestant)
    let attended = await extractAttended(contestant)
    out['attended'] = attended
    return out
}
async function extractAttended(contestant) {
    const response = await fetch("https://leetcode-cn.com/graphql/", {
      "headers": {
        "accept": "*/*",
        "accept-language": "en",
        "content-type": "application/json",
        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\"",
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-csrftoken": "xfA9Yh67x3qxSETGyRY2lnQ95Dnoe1YDcP3U6i3EdfG9WU5wyadbvQVPYqSAT8yv",
        "x-definition-name": "userContestRanking,globalRatingRanking,userContestScore,contestUnratedContests",
        "x-operation-name": "userContest",
        "x-timezone": "America/Cancun",
        "cookie": <get_from_chrome_dev_console>
      },
      "referrer": `https://leetcode-cn.com/u/${contestant.user_slug}/`,
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": `{\"operationName\":\"userContest\",\"variables\":{\"userSlug\":\"${contestant.user_slug}\"},\"query\":\"query userContest($userSlug: String!) {\\n  userContestRanking(userSlug: $userSlug) {\\n    currentRatingRanking\\n    ratingHistory\\n    levelHistory\\n    contestRankingHistoryV2\\n    contestHistory\\n    __typename\\n  }\\n  globalRatingRanking(userSlug: $userSlug)\\n  userContestScore(userSlug: $userSlug)\\n  contestUnratedContests\\n}\\n\"}`,
      "method": "POST",
      "mode": "cors"
    });

    let attended = await response.json()
    attended = JSON.parse(attended.data.userContestScore)
    return attended.length
}
async function extractSubmissions(contestant) {
    let response = await fetch("https://leetcode-cn.com/graphql/", {
      "headers": {
        "accept": "*/*",
        "accept-language": "en",
        "content-type": "application/json",
        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\"",
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-csrftoken": "xfA9Yh67x3qxSETGyRY2lnQ95Dnoe1YDcP3U6i3EdfG9WU5wyadbvQVPYqSAT8yv",
        "x-definition-name": "userProfileUserQuestionProgress",
        "x-operation-name": "userQuestionProgress",
        "x-timezone": "America/Cancun",
        "cookie": <get_from_chrome_dev_console>
      },
      "referrer": `https://leetcode-cn.com/u/${contestant.user_slug}/`,
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": `{\"operationName\":\"userQuestionProgress\",\"variables\":{\"userSlug\":\"${contestant.user_slug}\"},\"query\":\"query userQuestionProgress($userSlug: String!) {\\n  userProfileUserQuestionProgress(userSlug: $userSlug) {\\n    numAcceptedQuestions {\\n      difficulty\\n      count\\n      __typename\\n    }\\n    numFailedQuestions {\\n      difficulty\\n      count\\n      __typename\\n    }\\n    numUntouchedQuestions {\\n      difficulty\\n      count\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}`,
      "method": "POST",
      "mode": "cors"
    });
    let data = await response.json()
    data = data.data.userProfileUserQuestionProgress.numAcceptedQuestions
    let easy = data[0].count
    let medium = data[1].count
    let hard = data[2].count
    return {
        "easy": easy,
        "medium": medium,
        "hard": hard,
    }
}
async function extractUS(contestant, page) {
    let url = `https://leetcode.com/${contestant.user_slug}/`
    await page.goto(url, {timeout: 0, waitUntil: 'networkidle0'});
    const data = await page.evaluate(() => {
        let attended = document.querySelector("#profile-root > div.content-wrapper__2N7X > div > div.profile-content__3PmZ > div.cards-container__310X > div:nth-child(1) > div > div:nth-child(3) > div.ant-col.ant-col-8 > div > div.css-x9b7oa").innerText;
        let easy = document.querySelector("#profile-root > div.content-wrapper__2N7X > div > div.profile-content__3PmZ > div.cards-container__310X > div:nth-child(2) > div > div:nth-child(2) > div > div:nth-child(1) > div.css-x9b7oa > span.difficulty-ac-count__jhZm").innerText;
        let medium = document.querySelector("#profile-root > div.content-wrapper__2N7X > div > div.profile-content__3PmZ > div.cards-container__310X > div:nth-child(2) > div > div:nth-child(2) > div > div:nth-child(2) > div.css-x9b7oa > span.difficulty-ac-count__jhZm").innerText;
        let hard = document.querySelector("#profile-root > div.content-wrapper__2N7X > div > div.profile-content__3PmZ > div.cards-container__310X > div:nth-child(2) > div > div:nth-child(2) > div > div:nth-child(3) > div.css-x9b7oa > span.difficulty-ac-count__jhZm").innerText;
//        let yearlySubmissions = document.querySelector("#profile-root > div.content-wrapper__2N7X > div > div.profile-content__3PmZ > div:nth-child(2) > div > div.ant-card-head > div > div").innerText;
//        let acceptancePercentage = document.querySelector("#profile-root > div.content-wrapper__2N7X > div > div.profile-content__3PmZ > div.cards-container__310X > div:nth-child(2) > div > div.stats-visual-wrapper__2jzx > div.css-160uff4-PercentContainer.e5i1odf0 > div.css-139q828-PercentContent.e5i1odf6 > div > div.css-1b3bb7o-PercentNumber.e5i1odf1 > span:nth-child(1)").innerText;
        return {
            "attended": attended,
            "easy": easy,
            "medium": medium,
            "hard": hard//,
//            "yearlySubmissions": yearlySubmissions.split(" ")[0],
//            "acceptancePercentage": acceptancePercentage

        };
    });
    return data;
}
