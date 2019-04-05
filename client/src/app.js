import React from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { MainPage } from 'pages/main'
import { CssBaseline } from '@material-ui/core'

function App () {
  return (
    <>
      <CssBaseline>
        <BrowserRouter>
          <Switch>
            <Route path='/' component={MainPage} exact />
          </Switch>
        </BrowserRouter>
      </CssBaseline>
    </>
  )
}

export default hot(module)(App)
