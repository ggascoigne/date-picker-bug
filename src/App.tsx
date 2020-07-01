import {
  Button,
  ClickAwayListener,
  createStyles,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Popover,
  Popper,
  Select,
  Theme
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { LocalizationProvider } from '@material-ui/pickers'
import LuxonUtils from '@material-ui/pickers/adapter/luxon'
import React, { useCallback, useState } from 'react'
import { DateRangePicker } from './DateRangePicker'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
)

const TestForm: React.FC<{ title: string }> = ({title}) => {
  const classes = useStyles()
  return <>
    <h1>{title}</h1>
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">Name</InputLabel>
      <Select
        labelId="demo-simple-select-disabled-label"
        id="demo-simple-select-disabled"
        value={10}
        // onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
    <DateRangePicker />
  </>
}

const PopoverTestComponent: React.FC<{
  anchorEl?: Element
  onClose: () => void
  show: boolean
}> = ({anchorEl, show, onClose}) => {

  return <Popover
    anchorEl={anchorEl}
    id="popover"
    onClose={onClose}
    open={show}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
  >
    <TestForm title={'Popover version'} />
  </Popover>

}

const PopperTestComponent: React.FC<{
  anchorEl?: Element
  onClose: () => void
  show: boolean
}> = ({anchorEl, show, onClose}) => {

  return <Popper
    anchorEl={anchorEl}
    id="popover"
    open={show}
  >
    <ClickAwayListener onClickAway={onClose}>
      <Paper>
        <TestForm title={'Popper version'} />
      </Paper>
    </ClickAwayListener>
  </Popper>
}

function App() {
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [popperOpen, setPopperOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<Element | undefined>(undefined)

  const popoverHandler = useCallback(
    (event: React.MouseEvent) => {
      setAnchorEl(event.currentTarget)
      setPopoverOpen((old => !old))
    },
    [setAnchorEl, setPopoverOpen]
  )

  const popperHandler = useCallback(
    (event: React.MouseEvent) => {
      setAnchorEl(event.currentTarget)
      setPopperOpen((old => !old))
    },
    [setAnchorEl, setPopperOpen]
  )

  return (
    <LocalizationProvider dateAdapter={LuxonUtils}>
      <PopoverTestComponent show={popoverOpen} anchorEl={anchorEl} onClose={() => setPopoverOpen(false)} />
      <PopperTestComponent show={popperOpen} anchorEl={anchorEl} onClose={() => setPopperOpen(false)} />
      <div>
        <Button variant={'contained'} onClick={popoverHandler}>Open Popover</Button>
        <Button variant={'contained'} onClick={popperHandler}>Open Popper</Button>
      </div>
    </LocalizationProvider>
  )
}

export default App
