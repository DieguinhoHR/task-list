import React from 'react'
import styled from 'styled-components'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography
} from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import { Link } from 'react-router-dom'

const LogoContainer = styled.div`
  flex-grow: 1;
`

function Header () {
  return (
    <>
      <AppBar>
        <Toolbar>
          <Link to='/' style={{ color: '#FFF', textDecoration: 'none' }}>
            <LogoContainer>
              TaskLista - Supero Tecnologia
            </LogoContainer>
          </Link>

          <Typography variant='h6' color='inherit' style={{ flexGrow: 20 }}>
            <Link to='/tasks' style={{ paddingLeft: '15px', color: '#FFF', textDecoration: 'none' }}>Tarefas</Link>
          </Typography>

          <Typography color='inherit'>Olá joão =)</Typography>
          <IconButton color='inherit'>
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header
