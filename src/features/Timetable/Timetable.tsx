import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useTimetableStore } from '../../stores/timetable'
import { DateTime } from 'luxon'
import styles from './Timetable.module.scss'
import { getWeekDay } from '../../utilities/getWeekDay'
import { TimetableDate } from '../../types'
import { useConfigStore } from '../../stores/configs'
import { SubjectSelect } from './SubjectSelect'
import { TimetableEdit } from './TimetableEdit'

export const Timetable = () => {
  const { key } = useParams<{ key: string }>()
  const { timetables } = useTimetableStore()
  const { config } = useConfigStore()

  const date = DateTime.fromFormat(key!, 'yyyyMMdd').toFormat('yyyy-MM-dd')

  const weekTimetable = useMemo(() => {
    return timetables.find((week) => week.firstDate === date)
  }, [timetables, date])

  const weekIndex = useMemo(() => {
    return timetables.findIndex((week) => week.firstDate === date)
  }, [timetables, date])

  return (
    <div>
      <h2>
        週案{weekIndex + 1}: {weekTimetable?.note}
      </h2>
      <div className={styles.timetable}>
        <div>
          <div></div>
          {weekTimetable?.list.map((date) => {
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
                {weekTimetable?.list.map((date) => {
                  return (
                    <ClassItem
                      key={date.date}
                      weekIndex={weekIndex}
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
      <TimetableEdit />
    </div>
  )
}

const ClassItem = ({
  weekIndex,
  timetableDate,
  classId,
}: {
  weekIndex: number
  timetableDate: TimetableDate
  classId: string
}) => {
  const { timetables, updateTimetables } = useTimetableStore()

  const classItem = timetableDate.classes[classId]

  const onUpdate = (selectedSubject: string) => {
    const newTimetableDate = {
      ...timetableDate,
      classes: {
        ...timetableDate.classes,
        [classId]: {
          ...classItem,
          subject: [selectedSubject],
        },
      },
    }

    const newTimetables = timetables.map((timetable, index) => {
      if (index === weekIndex) {
        return {
          ...timetable,
          list: timetable.list.map((week) => {
            if (week.date === timetableDate.date) {
              return newTimetableDate
            }

            return week
          }),
        }
      }
      return timetable
    })

    updateTimetables(newTimetables)
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
