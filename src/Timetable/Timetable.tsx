import { useState } from 'react'
import { DateTime } from 'luxon'

export const Timetable = () => {
  const [startDate, setStartDate] = useState('')

  return (
    <>
      <h2>Timetable</h2>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      {startDate && (
        <Table startDateTime={DateTime.fromFormat(startDate, 'yyyy-MM-dd')} />
      )}
    </>
  )
}

const Table = ({ startDateTime }: { startDateTime: DateTime }) => {
  const weekDaysList = [...Array(7)].map((_, add) => {
    return startDateTime.plus({ day: add })
  })

  return (
    <>
      {weekDaysList.map((date) => (
        <div key={date.toISO()}>{date.toISODate()}</div>
      ))}
    </>
  )
}
