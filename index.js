#!/usr/bin/env node

const { getCode } = require('country-list');
const axios = require('axios');
var myArgs = process.argv.slice(2);
let currentYear = new Date().getFullYear();
let holidays = [];

if (myArgs.length == 1) {
  myArgs[1] = myArgs[0];
  myArgs[0] = currentYear;
}

async function getHolidays(year, country) {
  countryCode = getCode(country);
  if(!countryCode){throw new Error('invalid country name!')}
  try {
    const response = await axios.get(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`);
    let holidates = await response.data;
    
    console.log(holidates)

    for (i=0;i<holidates.length;i++) {
      let holiday = {};
      holiday.date = holidates[i].date;
      holiday.name = holidates[i].name;
      holiday.localname = holidates[i].localName;
      holidays.push(holiday)
    }
    JSON.stringify(holidays)
    return console.log(holidays)

  } catch (error) {
    console.error(error);
  }
}
getHolidays(myArgs[0], myArgs[1]);
