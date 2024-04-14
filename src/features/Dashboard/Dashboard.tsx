import { useState } from 'react'
import { useTimetableStore } from '../../stores/timetable'
import { LoadButton } from './LoadButton'
import { SaveButton } from './SaveButton'
import { Link } from 'react-router-dom'
import { useConfigStore } from '../../stores/configs'
import { ClassCount } from './ClassCount'

export const Dashboard = () => {
  const [startDate, setStartDate] = useState('')
  const { timetables, createTimetable } = useTimetableStore()
  const { config } = useConfigStore()

  const onCreate = () => {
    if (!startDate) {
      return
    }
    if (timetables.find((timetable) => timetable.firstDate === startDate)) {
      return alert('すでに存在します')
    }
    createTimetable(startDate, config.classes)
  }

  return (
    <>
      <h2>Timetable</h2>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <button onClick={onCreate} disabled={!startDate}>
        作成
      </button>
      <WeekTable />
      <ClassCount />
      <SaveButton />
    </>
  )
}

const WeekTable = () => {
  const { timetables } = useTimetableStore()

  if (timetables.length === 0) {
    return (
      <>
        時間割の作成が必要です
        <LoadButton />
      </>
    )
  }

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
