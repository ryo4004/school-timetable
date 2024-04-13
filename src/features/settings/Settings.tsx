import { useState } from 'react'
import { useTimetableStore } from '../../stores/timetable'
import { useConfigStore } from '../../stores/configs'
import styles from './Settings.module.scss'
import { WEEKDAYS, Weekday, getWeekNumber } from '../../utilities/getWeekDay'
import { SubjectSelect } from '../Timetable/SubjectSelect'

export const Settings = () => {
  const [subjectInput, setSubjectInput] = useState('')

  const { createTimetable } = useTimetableStore()
  const { config, updateSubjects } = useConfigStore()

  return (
    <>
      <h2>settings</h2>
      <TimetableSettings />
      <button onClick={() => createTimetable(2024, config.classes)}>
        作成
      </button>
      <div>
        <input
          value={subjectInput}
          onChange={(e) => setSubjectInput(e.target.value)}
        />
        <button
          onClick={() => {
            if (subjectInput) {
              updateSubjects(
                Array.from(new Set([...config.subjects, subjectInput])),
              )
              setSubjectInput('')
            }
          }}
        >
          追加
        </button>
        <div>
          {config.subjects.map((subject) => (
            <div key={subject}>
              {subject}:
              <button
                onClick={() => {
                  updateSubjects(config.subjects.filter((s) => s !== subject))
                }}
              >
                削除
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

const TimetableSettings = () => {
  const { config } = useConfigStore()

  return (
    <>
      <h3>時間割の設定</h3>
      <div className={styles.timetable}>
        <div>
          <div></div>
          {WEEKDAYS.map((weekday) => (
            <div key={weekday}>{weekday}</div>
          ))}
        </div>
        <div>
          {config.classes.map((classItem, index) => (
            <div key={classItem.id}>
              <div key={classItem.id}>
                {index}: {classItem.name}
              </div>
              {WEEKDAYS.map((weekday) => {
                return (
                  <ClassItem
                    key={weekday}
                    weekday={weekday}
                    classId={classItem.id}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

const ClassItem = ({
  weekday,
  classId,
}: {
  weekday: Weekday
  classId: string
}) => {
  const { config, updateSchedule } = useConfigStore()

  const weekNumber = getWeekNumber(weekday)

  const scheduledSubject = config.schedule[weekNumber][classId]

  const onUpdate = (selectedSubject: string) => {
    const newScheduleTable = {
      ...config.schedule[weekNumber],
      [classId]: selectedSubject,
    }

    updateSchedule(weekNumber, newScheduleTable)
  }

  return (
    <div>
      <SubjectSelect
        value={scheduledSubject}
        onChange={(e) => onUpdate(e.target.value)}
      />
    </div>
  )
}
