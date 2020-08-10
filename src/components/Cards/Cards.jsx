import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
// install @material-ui/core to use available designs 
// import only the things which are used to this component
import styles from './Cards.module.css';
import CountUp from 'react-countup';
// to have CountUp animation
import cx from 'classnames';
// to add multiple classes to a ReactJS component

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate }}) => {
    if (!confirmed) {
        return 'Loading...';
    }
    // add if statement to load value of props (to have a normal return)
    return (
        <div className={styles.container}>
        {/* if writing with the original way: className="container" 
        =>it doesn't work with module.css */}
            <Grid container spacing={3} justify="center">
            {/* container: to declare this grid to wrap children grids */}
            {/* spacing of material ui is set that 1 unit is 8px, => spacing={3} : 24px; */}
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)}>
                {/* item: to declare this grid is a child grid */}
                {/* syntax: className={cx(style.test1, style.test2)} to add multiple classes, 
                meanwhile test1/test2 is name of class which is declared in its css file  */}
                {/* xs: extra small, it's used for smart phone
                Like bootstrap, width of screen is divided to 12,
                so xs={12} means we want it having full width of screen */}
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Infected</Typography>
                        {/* gutterBottom: to provide a nice padding on the bottom */}
                        <Typography variant="h5">
                            <CountUp
                                start={0}
                                end={confirmed.value}
                                duration={2.5}
                                separator={","}
                            />
                        </Typography>
                        {/* there are 13 variants for Typography, assign h5 to represent h5 for the text */}
                        <Typography color="textSecondary">{new Date (lastUpdate).toDateString()}</Typography>
                        {/* add "new Date (object).toDateString" to get a date format to be readable easily */}
                        <Typography variant="body2">Number of active cases of COVID-19</Typography>
                    </CardContent>
                </Grid>

                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recovered)}>
                {/* item: to declare this grid is a child grid */}
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                        {/* gutterBottom: to provide a nice padding on the bottom */}
                        <Typography variant="h5">
                            <CountUp
                                start={0}
                                end={recovered.value}
                                duration={2.5}
                                separator={","}
                            />
                        </Typography>
                        {/* there are 13 variants for Typography, assign h5 to represent h5 for the text */}
                        <Typography color="textSecondary">{new Date (lastUpdate).toDateString()}</Typography>
                        <Typography variant="body2">Number of recoveries from COVID-19</Typography>
                    </CardContent>
                </Grid>

                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)}>
                {/* item: to declare this grid is a child grid */}
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Deaths</Typography>
                        {/* gutterBottom: to provide a nice padding on the bottom */}
                        <Typography variant="h5">
                            <CountUp
                                start={0}
                                end={deaths.value}
                                duration={2.5}
                                separator={","}
                            />
                        </Typography>
                        {/* there are 13 variants for Typography, assign h5 to represent h5 for the text */}
                        <Typography color="textSecondary">{new Date (lastUpdate).toDateString()}</Typography>
                        <Typography variant="body2">Number of deaths caused by COVID-19</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}

export default Cards;

//working this function component with hooks 
// => to have great benefits: useEffect