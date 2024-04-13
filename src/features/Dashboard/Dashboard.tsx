import { useState } from 'react'
import { useTimetableStore } from '../../stores/timetable'
import { LoadButton } from './LoadButton'
import { SaveButton } from './SaveButton'
import { Link } from 'react-router-dom'

export const Dashboard = () => {
  const [startDate, setStartDate] = useState('')

  const { timetables } = useTimetableStore()

  if (timetables.length === 0) {
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
  const { timetables } = useTimetableStore()

  return (
    <>
      <details>
        <summary>週一覧</summary>
        {timetables.map((weekTimetable) => {
          return (
            <div key={weekTimetable.firstDate}>
              <Link to={`/${weekTimetable.firstDate.replace(/-/g, '')}`}>
                {weekTimetable.firstDate}
              </Link>
            </div>
          )
        })}
      </details>
    </>
  )
}
