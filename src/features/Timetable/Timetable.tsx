import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useTimetableStore } from '../../stores/timetable'
import { DateTime } from 'luxon'
import styles from './Timetable.module.scss'
import { getWeekDay } from '../../utilities/getWeekDay'
import { TimetableDate } from '../../types'
import { useConfigStore } from '../../stores/configs'
import { SubjectSelect } from './SubjectSelect'

export const Timetable = () => {
  const { key } = useParams<{ key: string }>()
  const { timetable } = useTimetableStore()
  const { config } = useConfigStore()

  const date = DateTime.fromFormat(key!, 'yyyyMMdd').toFormat('yyyy-MM-dd')

  const week = useMemo(() => {
    return timetable.weeks.find((week) => week.firstDate === date)
  }, [timetable.weeks, date])

  const weekCount = useMemo(() => {
    return timetable.weeks.findIndex((week) => week.firstDate === date) + 1
  }, [timetable.weeks, date])

  const weekDays = useMemo(() => {
    return timetable.list.filter((timetable) => {
      const firstDate = DateTime.fromISO(week?.firstDate ?? '')
      const lastDate = firstDate.plus({ day: 6 })
      const targetDate = DateTime.fromISO(timetable.date)

      return firstDate <= targetDate && lastDate >= targetDate
    })
  }, [timetable.list, week])

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
          {config.classes.map((classItem) => {
            return (
              <div key={classItem.id}>
                <div>{classItem.name}</div>
                {weekDays.map((date) => {
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
  const { updateTimetableDate } = useTimetableStore()

  const classItem = timetableDate.classes[classId]

  const onUpdate = (selectedSubject: string) => {
    const newClassItem = {
      ...classItem,
      subject: [selectedSubject],
    }

    const newTimetableDate = {
      ...timetableDate,
      classes: {
        ...timetableDate.classes,
        [classId]: newClassItem,
      },
    }

    updateTimetableDate(newTimetableDate)
  }

  return (
    <div>
      <div>
        <SubjectSelect
          value={classItem.subject[0] ?? ''}
          onChange={(e) => onUpdate(e.target.value)}
        />
        {classItem.subject.join(', ')}
      </div>
      <div>{classItem.note}</div>
    </div>
  )
}
