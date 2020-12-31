import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

import useStyle from './style'

const CustomizedSnackbar = ({open,setOpen}) => {
    const classes = useStyle();

    const handleClose = (event,reason) => {
        console.log("event",event,reason)
        if(reason === 'clickaway') return;
        setOpen(false)
    }

    return (
        <div className={classes.root}>
            <Snackbar 
                anchorOrigin={{horizontal:"center", vertical:"top"}} 
                autoHideDuration={3000}
                open={open}
                onClose={handleClose}
            >
                <MuiAlert 
                    onClose={handleClose}
                    severity="success"
                    elevation={6}
                    variant="filled"
                >
                    Transaction created Successfully.
                </MuiAlert>
            </Snackbar>
        </div>
    )
}

export default CustomizedSnackbar

