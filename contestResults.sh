#!/usr/bin/env bash

for i in $(seq 1 579)
do
    curl "https://leetcode.com/contest/api/ranking/weekly-contest-244/?pagination=$i&region=global" \
      -H 'sec-ch-ua: " Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"' \
      -H 'sec-fetch-mode: cors' \
      -H 'accept-language: en-US,en;q=0.9' \
      -H 'sec-fetch-dest: empty' \
      -H 'x-requested-with: XMLHttpRequest' \
      -H $'cookie: <get_from_chrome_dev_console>' \
      -H 'x-newrelic-id: UAQDVFVRGwEAXVlbBAg=' \
      -H 'sec-ch-ua-mobile: ?0' \
      -H 'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36' \
      -H 'content-type: application/json' \
      -H 'accept: application/json, text/javascript, */*; q=0.01' \
      -H 'referer: https://leetcode.com/contest/weekly-contest-244/ranking/579/' \
      -H 'authority: leetcode.com' \
      -H 'sec-fetch-site: same-origin' \
      --compressed >> data.txt

      echo "," >> data.txt


      sleep $((1+$RANDOM%10))
done

# manually data.txt -> data.json

jq '.[] | .total_rank | .[] | {user_slug, score, data_region}' data.json > userScoreRegion.txt

# manually userScoreRegion.txt -> userScoreRegion.json
