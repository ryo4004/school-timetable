import { useTimetableStore } from '../../stores/timetable'

export const Settings = () => {
  const {
    timetable: { config },
    createTimetable,
  } = useTimetableStore()

  return (
    <>
      <h2>settings</h2>
      {config.classes.map((classItem, index) => (
        <div key={classItem.id}>
          {index}: {classItem.name}
        </div>
      ))}
      <button onClick={() => createTimetable(2024)}>作成</button>
    </>
  )
}
