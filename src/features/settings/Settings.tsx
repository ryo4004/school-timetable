import { useTimetableStore } from '../../stores/timetable'

export const Settings = () => {
  const { config } = useTimetableStore()

  return (
    <>
      <h2>settings</h2>
      {config.classes.map((classItem) => (
        <div key={classItem.id}>{classItem.name}</div>
      ))}
    </>
  )
}
