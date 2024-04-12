import { useState } from 'react'
import { useTimetableStore } from '../../stores/timetable'
import { LoadButton } from './LoadButton'
import { SaveButton } from './SaveButton'
import { Link } from 'react-router-dom'

export const Dashboard = () => {
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
          return (
            <div key={week.firstDate}>
              <Link to={`/${week.firstDate.replace(/-/g, '')}`}>
                {week.firstDate}
              </Link>
            </div>
          )
        })}
      </details>
    </>
  )
}
