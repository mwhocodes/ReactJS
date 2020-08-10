import React, { Component } from 'react';
import { Cards, Chart, CountryPicker } from './components';
// a neat little trick to shorten the code lines in file App.js
import styles from './App.module.css';
import { fetchData } from './api';
// import to transmit data to components
import coronaVirus from './Image/image.png';

class App extends Component {
    // no need to declare constructor here, 
    //because the state below is declared, 
    //so the constructor is going to be immediately constructor in the backend 
    state = {
        d: {},
        country: '',
        // d is a props that we create, so it is named whatever we want
        // at first, setting d is empty,
        // when componentDidMount is executed, 
        // => reset data by using "this.setState()"
    }
    async componentDidMount () {
        const fetchedData = await fetchData();

        this.setState({d: fetchedData});
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);
        //fetch the data
        this.setState({d: fetchedData, country: country });
        //set the state
        
    }
    render() {
        const { d, country } = this.state;
        // instead of "this.state.d" or "this.state.country"
        // "this.state" means the current state
        // writing in this way aims to shorten code
        return (
            <div className={styles.container}>
             {/* if writing with the original way: className="container" 
                =>it doesn't work with module.css */}
                <img className={styles.image} alt="Corona Virus" src={coronaVirus}/>
                <Cards data={ d }/>
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data={ d } country={ country }/>
            </div>
        );
    }
}

export default App;

//this function component is going to be class-based
// => don't need to use useEffect,...

// create an componentDidMount, inside of it, make the request to fetch data
// inside componentDidMount scope, create a constant & assign it to await fetchData to deal with asynchronous function which is declared before
// await needs to wrapped in a function that is asynchronous => usually just put "async" in front of the function, but componentDidMount is special => put "async" in front of it