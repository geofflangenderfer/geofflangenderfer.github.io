fetch("https://leetcode-cn.com/graphql/", {
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
    "x-definition-name": "userProfilePublicProfile",
    "x-operation-name": "userPublicProfile",
    "x-timezone": "America/Cancun",
    "cookie": <get_from_chrome_dev_console>
  },
  "referrer": "https://leetcode-cn.com/u/Heltion/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "{\"operationName\":\"userPublicProfile\",\"variables\":{\"userSlug\":\"Heltion\"},\"query\":\"query userPublicProfile($userSlug: String!) {\\n  userProfilePublicProfile(userSlug: $userSlug) {\\n    username\\n    haveFollowed\\n    siteRanking\\n    profile {\\n      userSlug\\n      realName\\n      aboutMe\\n      userAvatar\\n      location\\n      gender\\n      websites\\n      skillTags\\n      contestCount\\n      asciiCode\\n      medals {\\n        name\\n        year\\n        month\\n        category\\n        __typename\\n      }\\n      ranking {\\n        rating\\n        ranking\\n        currentLocalRanking\\n        currentGlobalRanking\\n        currentRating\\n        ratingProgress\\n        totalLocalUsers\\n        totalGlobalUsers\\n        __typename\\n      }\\n      skillSet {\\n        langLevels {\\n          langName\\n          langVerboseName\\n          level\\n          __typename\\n        }\\n        topics {\\n          slug\\n          name\\n          translatedName\\n          __typename\\n        }\\n        topicAreaScores {\\n          score\\n          topicArea {\\n            name\\n            slug\\n            __typename\\n          }\\n          __typename\\n        }\\n        __typename\\n      }\\n      socialAccounts {\\n        provider\\n        profileUrl\\n        __typename\\n      }\\n      __typename\\n    }\\n    educationRecordList {\\n      unverifiedOrganizationName\\n      __typename\\n    }\\n    occupationRecordList {\\n      unverifiedOrganizationName\\n      jobTitle\\n      __typename\\n    }\\n    submissionProgress {\\n      totalSubmissions\\n      waSubmissions\\n      acSubmissions\\n      reSubmissions\\n      otherSubmissions\\n      acTotal\\n      questionTotal\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}",
  "method": "POST",
  "mode": "cors"
});
