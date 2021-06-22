let attended = document.querySelector("#profile-root > div.content-wrapper__2N7X > div > div.profile-content__3PmZ > div.cards-container__310X > div:nth-child(1) > div > div:nth-child(3) > div.ant-col.ant-col-8 > div > div.css-x9b7oa").innerText
let easy = document.querySelector("#profile-root > div.content-wrapper__2N7X > div > div.profile-content__3PmZ > div.cards-container__310X > div:nth-child(2) > div > div:nth-child(2) > div > div:nth-child(1) > div.css-x9b7oa > span.difficulty-ac-count__jhZm").innerText
let medium = document.querySelector("#profile-root > div.content-wrapper__2N7X > div > div.profile-content__3PmZ > div.cards-container__310X > div:nth-child(2) > div > div:nth-child(2) > div > div:nth-child(2) > div.css-x9b7oa > span.difficulty-ac-count__jhZm").innerText
let hard = document.querySelector("#profile-root > div.content-wrapper__2N7X > div > div.profile-content__3PmZ > div.cards-container__310X > div:nth-child(2) > div > div:nth-child(2) > div > div:nth-child(3) > div.css-x9b7oa > span.difficulty-ac-count__jhZm").innerText
let yearlySubmissions = document.querySelector("#profile-root > div.content-wrapper__2N7X > div > div.profile-content__3PmZ > div:nth-child(2) > div > div.ant-card-head > div > div").innerText
let acceptancePercentage = document.querySelector("#profile-root > div.content-wrapper__2N7X > div > div.profile-content__3PmZ > div.cards-container__310X > div:nth-child(2) > div > div.stats-visual-wrapper__2jzx > div.css-160uff4-PercentContainer.e5i1odf0 > div.css-139q828-PercentContent.e5i1odf6 > div > div.css-1b3bb7o-PercentNumber.e5i1odf1 > span:nth-child(1)").innerText
let data = {
  "attended": attended,
  "easy": easy,
  "medium": medium,
  "hard": hard,
  "yearlySubmissions": yearlySubmissions,
  "acceptancePercentage": acceptancePercentage

}

data
