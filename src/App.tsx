import { Button, Popover } from '@material-ui/core'
import { LocalizationProvider } from '@material-ui/pickers'
import LuxonUtils from '@material-ui/pickers/adapter/luxon'
import React, { useCallback, useState } from 'react'
import { DateRangePicker } from './DateRangePicker'

const PopupTestComponent: React.FC<{
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
    <DateRangePicker />
  </Popover>

}

function App() {
  const [popupOpen, setPopupOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<Element | undefined>(undefined)

  const buttonClickHandler = useCallback(
    (event: React.MouseEvent) => {
      setAnchorEl(event.currentTarget)
      setPopupOpen((old => !old))
    },
    [setAnchorEl, setPopupOpen]
  )

  return (
    <LocalizationProvider dateAdapter={LuxonUtils}>
      <PopupTestComponent show={popupOpen} anchorEl={anchorEl} onClose={() => setPopupOpen(false)} />
      <div>
        {/*<DateRangePicker />*/}
        <Button variant={'contained'} onClick={buttonClickHandler}>Open Popup</Button>
      </div>
    </LocalizationProvider>
  )
}

export default App
