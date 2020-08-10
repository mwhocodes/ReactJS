import React, { useEffect, useState } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import styles from './CountryPicker.module.css';
import { fetchCountries } from '../../api';
// to transmit data to this component

const CountryPicker = ( { handleCountryChange }) => {
    const [ fetchedCountries, setFetchedCountries ] = useState ([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setFetchedCountries(await fetchCountries());
        }

        fetchAPI();
    },[setFetchedCountries]);
    // if there is no "[setFetchedCountries]", it will run endlessly 
    // "[setFetchedCountries]" in here => to pick different countries 
    console.log(setFetchedCountries);
    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
                <option value="">Global</option>
                {/* let the value of global is empty string
                because in index.js of api, it is declared that if it is not 'country', it will return false value: dailyData */}
                {fetchedCountries.map((country, i) => <option key={i} value={country}>{country}</option>)}
            </NativeSelect>  
        </FormControl>
        )
}

export default CountryPicker;

//working this function component with hooks 
// => to have great benefits: useEffect