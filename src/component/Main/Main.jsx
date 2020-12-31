import React, { useContext } from 'react';
import {Card, CardHeader, CardContent,Typography, Grid, Divider } from '@material-ui/core'
import {ExpenseTrackerContext} from '../../context/context'
import useStyle from './style'
import Form from './Form/Form';
import List from './List/List';

const Main = () => {
    const classes = useStyle();
    const {balance} = useContext(ExpenseTrackerContext)
    return (
        <Card className={classes.root}>
            <CardHeader title="Expense Tracker" />
            <CardContent>
                <Typography align="center" variant="h5">Total Balance is ${balance}</Typography>
                <Typography align="center" variant="subtitle1" style={{lineHeight:"1.5em",marginTop:"20px"}} >
                    Try saying : <br /> Add amount $20 for category salary
                </Typography>
                <br />
                <Divider />
                <Form />
            </CardContent>
            <CardContent className={classes.cartContent}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <List />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}


export default Main
