// to make functions to fetch some data

import axios from 'axios';
// axios is used to make API requests

const url = 'https://covid19.mathdro.id/api'
// to import url of API

export const fetchData = async (country) => {
    let changeableURL = url;
    // fetchDate just receive 1 parameter ( 1 country)
    if (country) {
        changeableURL = `${url}/countries/${country}`;
    }
    try {
        const { data: { confirmed, recovered, deaths, lastUpdate}} = await axios.get(changeableURL);
        // only fetch data of confirmed, recovered, deaths, lastUpdate from API 
        return { confirmed, recovered, deaths, lastUpdate };        
    }
    catch(error){
    console.log(error); 
    }
};
// create an arrow function called fetchData and export it from API
// inside of the above function, needs to have an asynchronous function (the most modern way to deal with asynchronous data)
// async await == promises + catch (but with that way to read & write easily)
// have a try & catch block
// "try" will be executed if the fetch is successful
// if not, get to the catch block to return error
// inside try scope, create a variable to get data and assign it to await axios.get(url)

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);
        // need to make a template string as above to get the second part of the URL

        const modifiedData = data.map((dailyData) => ({
            // data in this case is an array => need to loop over it
            // dailyData is a props that we declared
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }));
        return modifiedData;
    }   
    catch (error) {
    console.log(error);
    }
}
// every try block needs to have a response

export const fetchCountries = async () => {
    try {
        const { data: { countries }} = await axios.get(`${url}/countries`);
        // to get the data of each country
        return countries.map((country) => country.name);
        // to go for "countries" in data and get full name with "name" from data
        // note: "country" is a props that we declared
    }   
    catch (error) {
    console.log(error);
    }
}