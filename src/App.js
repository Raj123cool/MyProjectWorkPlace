import React from 'react'
import Details from './component/Details/Details'
import {Grid} from '@material-ui/core'
import {PushToTalkButtonContainer,PushToTalkButton, ErrorPanel} from '@speechly/react-ui'
import useStyle from './style'
import Main from './component/Main/Main'

const App = () => {
  const classes = useStyle()
  return (
    <React.Fragment>
      <Grid className={classes.grid} container spacing={0} alignItems="center" justify="center" style={{height:"100vh"}}>
        <Grid item xs={12} sm={4}>
          <Details title="Income" />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Main />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Details title="Expense" />
        </Grid>
      </Grid>
      <PushToTalkButtonContainer>
        <PushToTalkButton />
        <ErrorPanel />
      </PushToTalkButtonContainer>
    </React.Fragment>
  )
}

export default App;
