import { makeStyles, TextField } from '@material-ui/core'
import { DateRange, DesktopDateRangePicker } from '@material-ui/pickers'
import React from 'react'

const useStyles = makeStyles(() => ({
  divLabel: {
    boxSizing: 'border-box',
    padding: 10
  },
  separator: {
    margin: '4px',
  },
}))

export const DateRangePicker = () => {
  const classes = useStyles({})
  const [selectedDate, setSelectedDate] = React.useState<DateRange>([null, null])

  const handleDateChange = (dateRange: DateRange) => {
    if (dateRange[0] && dateRange[1]) {
      setSelectedDate(dateRange)
      const filterDate = `${dateRange[0].toLocaleString()} - ${dateRange[1].toLocaleString()}`
      console.log(`filterDate = ${JSON.stringify(filterDate, null, 2)}`)
    }
  }

  return (
    <div className={classes.divLabel}>
      <DesktopDateRangePicker
        startText={'Start'}
        endText={'End'}
        value={selectedDate}
        onChange={(date) => handleDateChange(date)}
        renderInput={(startProps, endProps) => {
          return (
            <>
              <TextField {...startProps} variant="standard" />
              <label className={classes.separator} />
              <TextField {...endProps} variant="standard" />
            </>
          )
        }}
      />
    </div>
  )
}
