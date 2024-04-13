import { useTimetableStore } from '../../stores/timetable'
import { useConfigStore } from '../../stores/configs'
import { SubjectSettings } from './SubjectSettings'
import { TimetableSettings } from './TimetableSettings'

export const Settings = () => {
  const { createTimetable } = useTimetableStore()
  const { config } = useConfigStore()

  return (
    <>
      <h2>settings</h2>
      <button onClick={() => createTimetable(2024, config.classes)}>
        作成
      </button>
      <TimetableSettings />
      <SubjectSettings />
    </>
  )
}
