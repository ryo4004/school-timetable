import { DateTime } from 'luxon'
import { ClassConfig, Timetable, TimetableDate } from '../../types'
import { getWeekDay } from '../../utilities/getWeekDay'
import { useConfigStore } from '../../stores/configs'
import { useTimetableStore } from '../../stores/timetable'
import { SubjectSelect } from './SubjectSelect'
import { useState } from 'react'
import { truthy } from '../../utilities/truthy'

export const TimetableEdit = ({
  weekTimetable,
  weekIndex,
}: {
  weekTimetable: Timetable
  weekIndex: number
}) => {
  const { config } = useConfigStore()

  return (
    <>
      <div>
        {weekTimetable.list.map((timetable) => {
          const dateTime = DateTime.fromISO(timetable.date)
          return (
            <div key={timetable.date}>
              <div key={timetable.date}>
                {dateTime.toFormat('M/d')} {getWeekDay(dateTime)}
              </div>
              {config.classes.map((classConfig) => {
                return (
                  <ClassItem
                    key={classConfig.id}
                    weekIndex={weekIndex}
                    timetableDate={timetable}
                    classConfig={classConfig}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    </>
  )
}

const ClassItem = ({
  weekIndex,
  timetableDate,
  classConfig,
}: {
  weekIndex: number
  timetableDate: TimetableDate
  classConfig: ClassConfig
}) => {
  const { timetables, updateTimetables } = useTimetableStore()

  const classItem = timetableDate.classes[classConfig.id]

  const [isDivide, setIsDivide] = useState(classItem.subject.length > 1)

  const onUpdate = (selectedSubjects: string[]) => {
    const newTimetableDate = {
      ...timetableDate,
      classes: {
        ...timetableDate.classes,
        [classConfig.id]: {
          ...classItem,
          subject: selectedSubjects,
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
      <div>{classConfig.name}</div>
      <div>
        <SubjectSelect
          value={classItem.subject[0] ?? ''}
          onChange={(e) => {
            onUpdate(
              [
                e.target.value,
                classItem.subject[1],
                classItem.subject[2],
              ].filter(truthy),
            )
          }}
        />
        {isDivide && (
          <>
            <SubjectSelect
              value={classItem.subject[1] ?? ''}
              onChange={(e) => {
                onUpdate(
                  [
                    classItem.subject[0],
                    e.target.value,
                    classItem.subject[2],
                  ].filter(truthy),
                )
              }}
            />
            <SubjectSelect
              value={classItem.subject[2] ?? ''}
              onChange={(e) => {
                onUpdate(
                  [
                    classItem.subject[0],
                    classItem.subject[1],
                    e.target.value,
                  ].filter(truthy),
                )
              }}
            />
          </>
        )}
        <input
          type="checkbox"
          checked={isDivide}
          onChange={(e) => setIsDivide(e.target.checked)}
        />
        <label>分割</label>
      </div>
      <div>{classItem.note}</div>
    </div>
  )
}