import { useState } from 'react'
import { DateTime } from 'luxon'
import { useTimetableStore } from '../../stores/timetable'
import { LoadButton } from './LoadButton'
import { SaveButton } from './SaveButton'

export const Timetable = () => {
  const [startDate, setStartDate] = useState('')

  const { timetable } = useTimetableStore()

  if (timetable.timetables.list.length === 0) {
    return (
      <>
        時間割の初期化が必要です
        <LoadButton />
      </>
    )
  }

  return (
    <>
      <h2>Timetable</h2>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <WeekTable />
      <Table startDate={startDate} />
      <SaveButton />
    </>
  )
}

const WeekTable = () => {
  const { timetable } = useTimetableStore()

  return (
    <>
      <details>
        <summary>週一覧</summary>
        {timetable.timetables.weeks.map((week) => {
          return <div key={week.firstDate}>{week.firstDate}</div>
        })}
      </details>
    </>
  )
}

const Table = ({ startDate }: { startDate: string }) => {
  const startDateTime = startDate
    ? DateTime.fromFormat(startDate, 'yyyy-MM-dd')
    : DateTime.fromJSDate(new Date()).startOf('day')
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
