import React, {useContext} from 'react';
import {List as MUIList, ListItem, ListItemText, ListItemAvatar, Avatar, ListItemSecondaryAction, Slide, IconButton} from '@material-ui/core'

import {Delete, MoneyOff} from '@material-ui/icons'
import {ExpenseTrackerContext} from '../../../context/context'
import useStyle from './style'

const List = () => {
    const classes = useStyle();
    const {deleteTransaction, transactions} = useContext(ExpenseTrackerContext);
    return (
        <MUIList dense={false} className={classes.list} >
            {
                transactions.map((_tran) => (
                    <Slide key={_tran.id} direction="down" in mountOnEnter unmountOnExit  >
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar className={_tran.type==="Income" ? classes.avatarIncome : classes.avatarExpense} >
                                    <MoneyOff />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={_tran.category} secondary={`$${_tran.amount} - ${_tran.date}`} />
                            <ListItemSecondaryAction onClick={()=>deleteTransaction(_tran.id)}>
                                <IconButton edge="end" aria-label="delete" >
                                    <Delete />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </Slide>
                ))
            }
        </MUIList>
    )
}

export default List;
