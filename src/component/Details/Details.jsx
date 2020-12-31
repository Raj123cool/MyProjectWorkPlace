import React from 'react';
import {Card,CardHeader,CardContent,Typography} from '@material-ui/core';
import {Doughnut} from 'react-chartjs-2'
import useTransaction from '../../useTransaction'

import useStyles from './style'

const Details = (props) => {
    const classes = useStyles();
    const {total,chartData} = useTransaction(props.title);
    return (
        <Card className={props.title === 'Income' ? classes.income : classes.expense}>
            <CardHeader title={props.title} />
            <CardContent>
                <Typography variant="h5">${total}</Typography>
                <Doughnut data={chartData} />
            </CardContent>
        </Card>
    )
}

export default Details;
