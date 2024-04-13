import { WEEKDAYS, Weekday, getWeekNumber } from '../../utilities/getWeekDay'
import { SubjectSelect } from '../Timetable/SubjectSelect'
import { useConfigStore } from '../../stores/configs'
import styles from './TimetableSettings.module.scss'

export const TimetableSettings = () => {
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
