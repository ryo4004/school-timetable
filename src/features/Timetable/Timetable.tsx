import { useMemo } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useTimetableStore } from '../../stores/timetable'
import { DateTime } from 'luxon'
import styles from './Timetable.module.scss'
import { getWeekDay } from '../../utilities/getWeekDay'
import { TimetableDate } from '../../types'
import { useConfigStore } from '../../stores/configs'
import { TimetableEdit } from './TimetableEdit'

export const Timetable = () => {
  const { key } = useParams<{ key: string }>()
  const { timetables } = useTimetableStore()
  const { config } = useConfigStore()

  const startDate = DateTime.fromFormat(key!, 'yyyyMMdd').toFormat('yyyy-MM-dd')

  const weekTimetable =
    useMemo(() => {
      return timetables.find((week) => week.firstDate === startDate)
    }, [timetables, startDate]) ?? null

  const weekIndex = useMemo(() => {
    return timetables.findIndex((week) => week.firstDate === startDate)
  }, [timetables, startDate])

  if (!weekTimetable) {
    return <Navigate to="/" />
  }

  return (
    <div>
      <h2>
        週案{weekIndex + 1}: {weekTimetable.note}
      </h2>
      <div className={styles.timetable}>
        <div>
          <div></div>
          {weekTimetable.list.map((timetable) => {
            const dateTime = DateTime.fromISO(timetable.date)
            return (
              <div key={timetable.date}>
                {dateTime.toFormat('M/d')} {getWeekDay(dateTime)}
              </div>
            )
          })}
        </div>
        <div>
          {config.classes.map((classItem) => {
            return (
              <div key={classItem.id}>
                <div>{classItem.name}</div>
                {weekTimetable.list.map((date) => {
                  return (
                    <ClassItem
                      key={date.date}
                      timetableDate={date}
                      classId={classItem.id}
                    />
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
      {<TimetableEdit weekTimetable={weekTimetable} weekIndex={weekIndex} />}
    </div>
  )
}

const ClassItem = ({
  timetableDate,
  classId,
}: {
  timetableDate: TimetableDate
  classId: string
}) => {
  const classItem = timetableDate.classes[classId]

  return (
    <div>
      <div>
        {classItem.subject.length === 0 && '-'}
        {classItem.subject.length !== 0 && classItem.subject.join(', ')}
      </div>
      <div>{classItem.note}</div>
    </div>
  )
}
