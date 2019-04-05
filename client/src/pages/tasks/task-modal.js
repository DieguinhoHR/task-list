import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'

import TextField from '@material-ui/core/TextField'

import api from 'services/api'
import Swal from 'sweetalert2'
import PropTypes from 'prop-types'

/* eslint-disable */
const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500]
  }
}))(props => {
  const { children, classes, onClose } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton aria-label='Close' className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
})

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2
  }
}))(MuiDialogContent)

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit
  }
}))(MuiDialogActions)

const currencies = [
  {
    value: 'true',
    label: 'Concluido'
  },
  {
    value: 'false',
    label: 'Não concluido'
  }
]

class TaskModal extends React.Component {
  state = {
    open: false,
    task: {
      title: '',
      status: true,
      description: ''
    },
    showErrorMessage: '',
    isShowError: false
  }

  handleClickOpen = () => {
    this.setState({
      open: true
    })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  componentDidMount() {
    const task = { ...this.state.task }
    const { title, status, description } = this.props

    task.title = title
    task.status = status
    task.description = description

    this.setState({
      task
    })
  }

  async handleSave (e) {
    e.preventDefault()

    try {
      const task = this.state.task
      const method = task.id ? 'put' : 'post'
      const url = task.id ? `tasks/${task.id}` : '/tasks'

      const response = await api[method](url, task)

      Swal.fire({
        type: 'success',
        title: `${response.data.title} cadastrado com sucesso!`,
        showConfirmButton: false,
        timer: 2500
      })

      this.handleClose()
    } catch (error) {
      error.response.data.errors.map(error => {
        this.setState({ isShowError: true, showErrorMessage: error.defaultMessage })
      })
    }
  }

  handleChange = (event) => {
    const task = { ...this.state.task }

    task[event.target.name] = event.target.value

    this.setState({
      task
    })
  }

  render () {
    const { classes, color, arialLabel } = this.props
    const {
      isShowError, showErrorMessage, task } = this.state

    return (
      <div>
        <div style={{ paddingLeft: '20px' }}>
          <Fab color={color} aria-label={arialLabel} className={classes.fab} onClick={this.handleClickOpen}>
            { arialLabel === 'Add' && <AddIcon /> }
            { arialLabel === 'Edit' && <EditIcon /> }
          </Fab>
        </div>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby='customized-dialog-title'
          open={this.state.open}
        >
          <DialogTitle id='customized-dialog-title' onClose={this.handleClose}>
            { arialLabel === 'Add' ? 'Cadastrar tarefa' : 'Atualizar tarefa' }
          </DialogTitle>
          <DialogContent>
            <form className={classes.container} noValidate autoComplete='off'>
              <TextField
                id='standard-name'
                name='title'
                label='Titulo'
                placeholder='Digite um titulo'
                className={classes.textField}
                value={task.title}
                onChange={(e) => this.handleChange(e)}
                margin='normal'
              />
              { isShowError &&
                <div style={{ color: 'red' }}>{ showErrorMessage}</div>
              }
              &nbsp;&nbsp;&nbsp;&nbsp;

              <TextField
                id='standard-select-currency-native'
                name='status'
                select
                label='Status'
                className={classes.textField}
                value={task.status}
                onChange={(e) => this.handleChange(e)}
                SelectProps={{
                  native: true,
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                helperText='Por favor selecione um status'
                margin='normal'
              >
                {currencies.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>

              <TextField
                id='standard-full-width'
                name='description'
                value={task.description}
                label='Descrição'
                style={{ margin: 8 }}
                placeholder='Digite uma descrição'
                fullWidth
                margin='normal'
                onChange={(e) => this.handleChange(e)}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={e => this.handleSave(e)} color='primary'>
              { arialLabel === 'Add' ? 'Salvar' : 'Atualizar' }
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

TaskModal.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
  arialLabel: PropTypes.string.isRequired
}

export default withStyles(styles)(TaskModal)
