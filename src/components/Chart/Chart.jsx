import React, { useState, useEffect } from 'react';
// instead of using state, setState or lifecycle function in a class-based component 
import { fetchDailyData } from '../../api';
// to transmit data to this component
import { Line, Bar } from 'react-chartjs-2';
// to create a chart
import styles from './Chart.module.css';


const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
    // need 2 props to create the chart
    const [ dailyData, setDailyData ] = useState([]);
    //a state setter method using hooks, here we set initialState empty

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
            // = const setDailyData = await fetchDailyData(); in a class-based component
            // = a promise
        }
        fetchAPI();
    },[]);

    const barChart = (
        confirmed
        ? (
            <Bar
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [
                        {
                        label: 'People',
                        backgroundColor: ['rgba(0, 255, 0, 0.5)','rgba(0, 0, 255, 0.5)','rgba(255, 0, 0, 0.5)'],
                        data: [confirmed.value, recovered.value, deaths.value],
                    },
                ],
                }}
                options={{
                    legend: { display: false },
                    //legend is one of the props of Bar tag
                    // let legend: {display: false} => do not display it
                    title: { display: true, text:`Current state in ${country}`},
                }}
            />) : null
    );

    console.log(confirmed, recovered, deaths);


    const lineChart = (
        dailyData.length
        // meaning that dailyData.length is not 0, 
        // => represent this chart below
        ? (
            <Line
                data={{
                    labels: dailyData.map(({ date }) => date ),
                    datasets: [{
                    data: dailyData.map(({ confirmed }) => confirmed ),
                    label: 'Infected',
                    borderColor: 'rgba(0, 255, 0, 0.5)',
                    fill: true,
                    // to fill the space below the chart
                },{
                    data: dailyData.map(({ deaths }) => deaths ),
                    label: 'Deaths',
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    fill: true,
                }],
                }}
            />) : null
    );

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    );
};

export default Chart;

//working this function component with hooks 
// => to have great benefits: useEffect