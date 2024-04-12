import { useParams } from 'react-router-dom'
import { useTimetableStore } from '../../stores/timetable'
import { DateTime } from 'luxon'
import styles from './Timetable.module.scss'

export const Timetable = () => {
  const { key } = useParams<{ key: string }>()
  const { timetable } = useTimetableStore()

  const date = DateTime.fromFormat(key!, 'yyyyMMdd').toFormat('yyyy-MM-dd')

  const week = timetable.timetables.weeks.find(
    (week) => week.firstDate === date,
  )
  const weekCount =
    timetable.timetables.weeks.findIndex((week) => week.firstDate === date) + 1

  const weekDays = timetable.timetables.list.filter((timetable) => {
    const firstDate = DateTime.fromISO(week?.firstDate ?? '')
    const lastDate = firstDate.plus({ day: 6 })
    const targetDate = DateTime.fromISO(timetable.date)

    return firstDate <= targetDate && lastDate >= targetDate
  })

  return (
    <div>
      <h2>
        週案{weekCount}: {week?.note}
      </h2>
      <div className={styles.timetable}>
        <div>
          <div></div>
          {weekDays.map((date) => {
            const dateTime = DateTime.fromISO(date.date)
            return (
              <div key={date.date}>
                {dateTime.toFormat('M/d')} {getWeekDay(dateTime)}
              </div>
            )
          })}
        </div>
        <div>
          {timetable.config.classes.map((classItem) => {
            return (
              <div key={classItem.id}>
                <div>{classItem.name}</div>
                {weekDays.map((date) => {
                  const item = date.classes[classItem.id]
                  return (
                    <div key={date.date}>
                      <div>{item.subject}</div>
                      <div>{item.note}</div>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const getWeekDay = (dateTime: DateTime) => {
  return ['月', '火', '水', '木', '金', '土', '日'][
    Number(dateTime.toFormat('c')) - 1
  ]
}
