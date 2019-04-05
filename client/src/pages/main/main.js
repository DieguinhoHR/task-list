import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  withStyles
} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Header from '../header'

import Fab from '@material-ui/core/Fab'
import DeleteIcon from '@material-ui/icons/Delete'

import api from 'services/api'
import TaskModal from 'pages/tasks/task-modal'
import Swal from 'sweetalert2'

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontSize: 20
  },
  body: {
    fontSize: 15
  }
}))(TableCell)

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
    flexGrow: 1
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 12,
    overflowX: 'auto'
  },
  table: {
    minWidth: 600
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  }
})

class Main extends React.Component {
  state = {
    tasks: []
  }

  async componentDidMount () {
    const response = await api.get('tasks')

    this.setState({ tasks: response.data })
  }

  handleClickOpen = () => {
    this.setState({
      open: true
    })
  }

  async handleRemove (task) {
    await api.delete(`tasks/${task.id}`)

    Swal.fire({
      type: 'success',
      title: 'Registro excluido com sucesso',
      showConfirmButton: false,
      timer: 2500
    })
  }

  render () {
    const { classes } = this.props
    const { tasks } = this.state

    return (
      <Fragment>
        <Header />
        <Paper className={classes.root}>
          <TaskModal color='primary' arialLabel='Add' />

          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell>Titulo</CustomTableCell>
                <CustomTableCell>Status</CustomTableCell>
                <CustomTableCell>Descrição</CustomTableCell>
                <CustomTableCell >Ações</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map(row => (
                <TableRow className={classes.row} key={row.id}>
                  <CustomTableCell component='th' scope='row'>
                    {row.title}
                  </CustomTableCell>
                  <CustomTableCell>{row.status === true ? 'Concluido' : 'Não concluido' }</CustomTableCell>
                  <CustomTableCell>{row.description ? row.description : 'Não existe registro'}</CustomTableCell>
                  <CustomTableCell>
                    <div style={{ float: 'left' }}>
                      <TaskModal color='default' arialLabel='Edit' title={row.title} status={row.status} description={row.description} />
                    </div>
                    <Fab color='secondary' aria-label='Delete' className={classes.fab} onClick={() => this.handleRemove(row)}>
                      <DeleteIcon />
                    </Fab>
                  </CustomTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          { tasks.length === 0 && <div style={{ textAlign: 'center', fontSize: '40px', color: 'black' }}>Nenhum registro cadastrado</div>}
        </Paper>
      </Fragment>
    )
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Main)
